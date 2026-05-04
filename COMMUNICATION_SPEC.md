# 模块间通信规范

## 1. 概述

本文档定义了高考志愿查询系统中各模块之间的通信规范，包括主进程与渲染进程之间的通信、渲染进程内部模块之间的通信以及存储模块与其他模块之间的通信。

## 2. 主进程与渲染进程通信

### 2.1 IPC 通信方式

使用 Electron 的 IPC（进程间通信）机制进行主进程与渲染进程之间的通信。

#### 2.1.1 主进程向渲染进程发送消息

```javascript
// 主进程中
browserWindow.webContents.send('message', data);

// 渲染进程中
ipcRenderer.on('message', (event, data) => {
  // 处理消息
});
```

#### 2.1.2 渲染进程向主进程发送消息

```javascript
// 渲染进程中
const result = await ipcRenderer.invoke('action', data);

// 主进程中
ipcMain.handle('action', (event, data) => {
  // 处理请求并返回结果
  return result;
});
```

### 2.2 预加载脚本

使用预加载脚本（preload.js）安全地暴露 API 到渲染进程。

```javascript
// preload.js
const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electronAPI', {
  // 暴露的 API
  saveData: (data) => ipcRenderer.invoke('save-data', data),
  loadData: () => ipcRenderer.invoke('load-data')
});
```

## 3. 渲染进程内部模块通信

### 3.1 模块导入与导出

使用 ES6 模块系统进行模块间的通信。

```javascript
// 导出模块
export function setupQueryForm() {
  // 功能实现
}

// 导入模块
import { setupQueryForm } from './pages/query/index.js';
```

### 3.2 事件系统

对于复杂的组件间通信，可以使用自定义事件系统。

```javascript
// 触发事件
document.dispatchEvent(new CustomEvent('data-updated', { detail: data }));

// 监听事件
document.addEventListener('data-updated', (event) => {
  const data = event.detail;
  // 处理数据更新
});
```

## 4. 存储模块通信

### 4.1 渲染进程存储 API

渲染进程通过 `window.storage` API 与存储模块通信。

```javascript
// 保存数据
const result = window.storage.save('key', data);

// 读取数据
const data = window.storage.load('key');

// 删除数据
window.storage.remove('key');

// 清空所有数据
window.storage.clear();

// 切换存储类型
window.storage.setStorageType('file'); // 或 'local'
```

### 4.2 主进程存储 API

主进程通过存储模块的 API 进行文件系统存储操作。

```javascript
// 保存数据
storage.save('key', data);

// 读取数据
const data = storage.load('key');

// 删除数据
storage.remove('key');

// 清空所有数据
storage.clear();
```

## 5. 数据结构规范

### 5.1 存储数据结构

```javascript
// 院校数据结构
const university = {
  id: 'string',           // 院校ID
  name: 'string',         // 院校名称
  location: 'string',     // 所在地
  type: 'string',         // 院校类型（如：985/211）
  score: number,          // 录取分数
  rank: number,           // 录取位次
  tags: ['string'],       // 标签
  majors: [               // 专业列表
    {
      id: 'string',       // 专业ID
      name: 'string',     // 专业名称
      score: number,      // 录取分数
      rank: number        // 录取位次
    }
  ]
};

// 设置数据结构
const settings = {
  dataSource: 'string',       // 数据来源（local/file）
  dataBackup: boolean,        // 是否自动备份
  backupInterval: 'string',   // 备份间隔
  theme: 'string',            // 主题
  language: 'string',         // 语言
  notifications: boolean,     // 是否启用通知
  matchThreshold: 'string',   // 匹配阈值
  resultLimit: 'string',      // 结果数量限制
  autoSave: boolean           // 是否自动保存
};
```

## 6. 错误处理规范

### 6.1 主进程错误处理

```javascript
// 主进程中
try {
  // 可能出错的操作
} catch (error) {
  console.error('Error:', error);
  // 向渲染进程发送错误消息
  browserWindow.webContents.send('error', { message: error.message });
}
```

### 6.2 渲染进程错误处理

```javascript
// 渲染进程中
try {
  // 可能出错的操作
} catch (error) {
  console.error('Error:', error);
  // 显示错误提示
  showToast('error', `操作失败: ${error.message}`);
}
```

## 7. 最佳实践

1. **使用类型检查**：确保传递的数据类型正确
2. **错误处理**：对所有可能的错误进行捕获和处理
3. **性能优化**：避免频繁的 IPC 通信，尽量批量处理数据
4. **安全性**：不要在 IPC 通信中传递敏感信息
5. **文档化**：为所有公共 API 添加文档注释
6. **一致性**：保持通信接口的一致性和稳定性

## 8. 示例

### 8.1 渲染进程向主进程请求数据

```javascript
// 渲染进程中
async function loadUniversities() {
  try {
    showLoading('加载院校数据...');
    const universities = await window.electronAPI.loadUniversities();
    hideLoading();
    return universities;
  } catch (error) {
    hideLoading();
    showToast('error', `加载失败: ${error.message}`);
    return [];
  }
}

// 主进程中
ipcMain.handle('load-universities', async (event) => {
  try {
    return await storage.load('universities');
  } catch (error) {
    throw new Error('加载院校数据失败');
  }
});
```

### 8.2 渲染进程内部模块通信

```javascript
// services/ui.js
export function showToast(type, message) {
  // 实现 toast 功能
}

// pages/query/index.js
import { showToast } from '../../services/ui.js';

function handleQueryError(error) {
  showToast('error', `查询失败: ${error.message}`);
}
```
/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "electron"
/*!***************************!*\
  !*** external "electron" ***!
  \***************************/
(module) {

"use strict";
module.exports = require("electron");

/***/ },

/***/ "./src/preload/preload.js"
/*!********************************!*\
  !*** ./src/preload/preload.js ***!
  \********************************/
(__unused_webpack_module, __unused_webpack_exports, __webpack_require__) {

eval("{function _typeof(o) { \"@babel/helpers - typeof\"; return _typeof = \"function\" == typeof Symbol && \"symbol\" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && \"function\" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? \"symbol\" : typeof o; }, _typeof(o); }\nfunction _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }\nfunction _toPropertyKey(t) { var i = _toPrimitive(t, \"string\"); return \"symbol\" == _typeof(i) ? i : i + \"\"; }\nfunction _toPrimitive(t, r) { if (\"object\" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || \"default\"); if (\"object\" != _typeof(i)) return i; throw new TypeError(\"@@toPrimitive must return a primitive value.\"); } return (\"string\" === r ? String : Number)(t); }\nvar _require = __webpack_require__(/*! electron */ \"electron\"),\n  contextBridge = _require.contextBridge,\n  ipcRenderer = _require.ipcRenderer;\n\n// 安全地暴露API到渲染进程\ncontextBridge.exposeInMainWorld('electronAPI', _defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty({\n  // 存储相关API\n  saveToFile: function saveToFile(key, data) {\n    return ipcRenderer.invoke('save-to-file', key, data);\n  },\n  loadFromFile: function loadFromFile(key) {\n    return ipcRenderer.invoke('load-from-file', key);\n  },\n  removeFromFile: function removeFromFile(key) {\n    return ipcRenderer.invoke('remove-from-file', key);\n  },\n  clearFiles: function clearFiles() {\n    return ipcRenderer.invoke('clear-files');\n  },\n  createBackup: function createBackup() {\n    return ipcRenderer.invoke('create-backup');\n  },\n  restoreBackup: function restoreBackup(backupFile) {\n    return ipcRenderer.invoke('restore-backup', backupFile);\n  },\n  getBackups: function getBackups() {\n    return ipcRenderer.invoke('get-backups');\n  },\n  deleteBackup: function deleteBackup(backupFile) {\n    return ipcRenderer.invoke('delete-backup', backupFile);\n  },\n  // 数据库文件操作API\n  saveDatabaseFile: function saveDatabaseFile() {\n    return ipcRenderer.invoke('save-database-file');\n  },\n  loadDatabaseFile: function loadDatabaseFile() {\n    return ipcRenderer.invoke('load-database-file');\n  },\n  // 存储路径操作API\n  setStoragePath: function setStoragePath(path) {\n    return ipcRenderer.invoke('set-storage-path', path);\n  },\n  getStoragePath: function getStoragePath() {\n    return ipcRenderer.invoke('get-storage-path');\n  },\n  selectStorageFolder: function selectStorageFolder() {\n    return ipcRenderer.invoke('set-storage-path', null);\n  },\n  // 数据库文件列表API\n  getDatabaseFiles: function getDatabaseFiles() {\n    return ipcRenderer.invoke('get-database-files');\n  }\n}, \"saveToFile\", function saveToFile(key, data) {\n  return ipcRenderer.invoke('save-to-file', key, data);\n}), \"loadFromFile\", function loadFromFile(key) {\n  return ipcRenderer.invoke('load-from-file', key);\n}), \"removeFromFile\", function removeFromFile(key) {\n  return ipcRenderer.invoke('remove-from-file', key);\n}), \"sendMessage\", function sendMessage(message) {\n  return ipcRenderer.send('message', message);\n}), \"onMessage\", function onMessage(callback) {\n  return ipcRenderer.on('message', function (event, message) {\n    return callback(message);\n  });\n}));\n\n//# sourceURL=webpack://2/./src/preload/preload.js?\n}");

/***/ }

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		if (!(moduleId in __webpack_modules__)) {
/******/ 			delete __webpack_module_cache__[moduleId];
/******/ 			var e = new Error("Cannot find module '" + moduleId + "'");
/******/ 			e.code = 'MODULE_NOT_FOUND';
/******/ 			throw e;
/******/ 		}
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./src/preload/preload.js");
/******/ 	
/******/ })()
;
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

/***/ "./client/src/index.js":
/*!*****************************!*\
  !*** ./client/src/index.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _modules_command_prompt_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./modules/command-prompt.js */ \"./client/src/modules/command-prompt.js\");\n/* harmony import */ var _modules_command_prompt_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_modules_command_prompt_js__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _config__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./config */ \"./client/src/config.json\");\n// entry file for the main page\n\n\n// conditionally import styles for layouts/themes\nswitch (_config__WEBPACK_IMPORTED_MODULE_1__.layout){\n  case 'terminal':\n    __webpack_require__.e(/*! import() */ \"client_src_styles_layouts_terminal_index_css\").then(__webpack_require__.t.bind(__webpack_require__, /*! ./styles/layouts/terminal/index.css */ \"./client/src/styles/layouts/terminal/index.css\", 23)).catch((err) => {console.error(err)});\n    break;\n  default:\n    break;\n}\n\n_modules_command_prompt_js__WEBPACK_IMPORTED_MODULE_0__.setFocus(document.getElementById(\"inpt\"));\n_modules_command_prompt_js__WEBPACK_IMPORTED_MODULE_0__.setCommand(\"config\", function conf() {\n  window.location.replace(\"http://localhost:30000/config\");\n});\n_modules_command_prompt_js__WEBPACK_IMPORTED_MODULE_0__.listen(document.getElementById(\"inpt\"));\n\n\n//# sourceURL=webpack://browser-start-page/./client/src/index.js?");

/***/ }),

/***/ "./client/src/modules/command-prompt.js":
/*!**********************************************!*\
  !*** ./client/src/modules/command-prompt.js ***!
  \**********************************************/
/***/ ((module) => {

eval("/*\n   ________  _______     __    _          \n  / ____/  |/  / __ \\   / /   (_)___  ___ \n / /   / /|_/ / / / /  / /   / / __ \\/ _ \\\n/ /___/ /  / / /_/ /  / /___/ / / / /  __/\n\\____/_/  /_/_____/  /_____/_/_/ /_/\\___/ \nmodule for simulating a cmd line interface\n*/\n\n// create functions to customize based on theme, main function with switch to set theme components and export\n\nconst CMD = {'commands': {}};\n\n// force focus\nfunction setFocus(e){\n  window.addEventListener('load', () => {\n    inpt.focus();\n  });\n  setInterval(() => {\n    inpt.focus();\n  }, 1000);\n}\n\nfunction setCommand(cmd, action){\n  // cmd is a string of the command\n  // action is the callback for the command\n  CMD['commands'][cmd] = action;\n}\n\n// listen for inputs, call callback\nfunction listen(e){\n  e.addEventListener(\"keydown\", (k) => {\n    if (k.keyCode == 13){\n      k.preventDefault();\n      if (Object.keys(CMD[\"commands\"]).includes(e.textContent)){\n        CMD[\"commands\"][e.textContent]();  // call the callback\n      } else {\n        // \n        let url = \"https://www.google.com/search?key=AIzaSyD2mogAW8iAuKjHin_mKT2HuN6wnO45HZU&q=\" + e.textContent;\n        window.open(url, \"_self\");\n      }\n      inpt.textContent = \"\";  // clear the text area\n    }\n  });\n}\n\n// renders the last entered command\nfunction appendHistory(){\n  let search = document.getElementsByClassName(\"search\")[0];\n  let hist = document.createElement(\"p\");\n  let prmpt = document.createElement(\"span\");\n  let cmd = document.createElement(\"span\");\n  prmpt.textContent = document.querySelector(\"p span\").textContent;\n  cmd.textContent = \" \" + inpt.textContent;\n  hist.appendChild(prmpt);\n  hist.appendChild(cmd);\n  document.querySelector(\"body\").insertBefore(hist, search);\n}\n\n// renders nested json-esque style config list\nfunction block(name, obj){\n  let ent = document.createElement(\"div\");\n  ent.style.marginLeft = \"2%\";\n  for (var key in obj){\n    if (typeof obj[key] == \"object\"){\n      ent.appendChild(block(key, obj[key]));\n    } else {\n      let line = document.createElement(\"div\");\n      line.textContent = key + \": \" + obj[key];\n      ent.appendChild(line);\n    }\n  }\n  let out = document.createElement(\"div\");\n  out.textContent = name + \": \";\n  out.appendChild(ent)\n  return out\n}\n\n// handles entered commands\nfunction parseCmd(cmd){\n  let out = document.createElement(\"div\");\n  let search = document.getElementsByClassName(\"search\")[0];\n  if (cmd == \"ls\"){\n    for (var entry in CONFIG){\n      let ent = document.createElement(\"div\");\n      ent.textContent = entry + \": \";\n      if(typeof CONFIG[entry] == \"object\"){\n        ent = block(entry, CONFIG[entry]);\n      } else {\n        ent.textContent += CONFIG[entry];\n        out.appendChild(ent);\n      }\n      out.appendChild(ent);\n    }\n    document.querySelector(\"body\").insertBefore(out, search);\n  } else if (cmd.substring(0,3) == \"set\"){\n    let property = cmd.substring(4).split(\" \")[0];\n    let value = cmd.substring(4).split(\" \")[2].trim();\n    parseCmd(\"ls\");\n    fetch(\"http://localhost:30000/api/configs?key=\"+property+\"&value=\"+value);\n    fetch(\"http://localhost:30000/api/client-configs\")\n      .then((res) => res.json()\n      .then((data) => {\n        localStorage.setItem(\"CONFIG\", JSON.stringify(data));\n        window.CONFIG = data;\n    }));\n  } else if (cmd == \"help\"){\n    location.reload();\n  }\n}\n\n// inpt.addEventListener(\"keydown\", (e) => {\n//   if (e.keyCode == 13){\n//     e.preventDefault();\n//     let url = window.location.href + \"?cmd=\" + inpt.textContent;\n//     appendHistory();\n//     parseCmd(inpt.textContent);\n//     inpt.textContent = \"\";\n//     while (document.getElementsByClassName(\"search\")[0].getBoundingClientRect().bottom > 868.5){\n//       let child = document.querySelector(\"body\").firstChild;\n//       document.querySelector(\"body\").removeChild(child);\n//     }\n//   }\n// });\n\nCMD.setFocus = setFocus;\nCMD.listen = listen;\nCMD.setCommand = setCommand;\n\nmodule.exports = CMD;\n\n\n//# sourceURL=webpack://browser-start-page/./client/src/modules/command-prompt.js?");

/***/ }),

/***/ "./client/src/config.json":
/*!********************************!*\
  !*** ./client/src/config.json ***!
  \********************************/
/***/ ((module) => {

"use strict";
eval("module.exports = JSON.parse('{\"name\":\"Jack\",\"openInNewTab\":true,\"twentyFourHourTime\":false,\"greetings\":{\"morning\":\"Good morning, \",\"afternoon\":\"Good afternoon, \",\"evening\":\"Good evening, \",\"night\":\"Go to bed!\"},\"layout\":\"terminal\",\"theme\":\"nord\"}');\n\n//# sourceURL=webpack://browser-start-page/./client/src/config.json?");

/***/ })

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
/******/ 			id: moduleId,
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = __webpack_modules__;
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/create fake namespace object */
/******/ 	(() => {
/******/ 		var getProto = Object.getPrototypeOf ? (obj) => (Object.getPrototypeOf(obj)) : (obj) => (obj.__proto__);
/******/ 		var leafPrototypes;
/******/ 		// create a fake namespace object
/******/ 		// mode & 1: value is a module id, require it
/******/ 		// mode & 2: merge all properties of value into the ns
/******/ 		// mode & 4: return value when already ns object
/******/ 		// mode & 16: return value when it's Promise-like
/******/ 		// mode & 8|1: behave like require
/******/ 		__webpack_require__.t = function(value, mode) {
/******/ 			if(mode & 1) value = this(value);
/******/ 			if(mode & 8) return value;
/******/ 			if(typeof value === 'object' && value) {
/******/ 				if((mode & 4) && value.__esModule) return value;
/******/ 				if((mode & 16) && typeof value.then === 'function') return value;
/******/ 			}
/******/ 			var ns = Object.create(null);
/******/ 			__webpack_require__.r(ns);
/******/ 			var def = {};
/******/ 			leafPrototypes = leafPrototypes || [null, getProto({}), getProto([]), getProto(getProto)];
/******/ 			for(var current = mode & 2 && value; typeof current == 'object' && !~leafPrototypes.indexOf(current); current = getProto(current)) {
/******/ 				Object.getOwnPropertyNames(current).forEach((key) => (def[key] = () => (value[key])));
/******/ 			}
/******/ 			def['default'] = () => (value);
/******/ 			__webpack_require__.d(ns, def);
/******/ 			return ns;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/ensure chunk */
/******/ 	(() => {
/******/ 		__webpack_require__.f = {};
/******/ 		// This file contains only the entry chunk.
/******/ 		// The chunk loading function for additional chunks
/******/ 		__webpack_require__.e = (chunkId) => {
/******/ 			return Promise.all(Object.keys(__webpack_require__.f).reduce((promises, key) => {
/******/ 				__webpack_require__.f[key](chunkId, promises);
/******/ 				return promises;
/******/ 			}, []));
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/get javascript chunk filename */
/******/ 	(() => {
/******/ 		// This function allow to reference async chunks
/******/ 		__webpack_require__.u = (chunkId) => {
/******/ 			// return url for filenames based on template
/******/ 			return "" + chunkId + ".js";
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/load script */
/******/ 	(() => {
/******/ 		var inProgress = {};
/******/ 		var dataWebpackPrefix = "browser-start-page:";
/******/ 		// loadScript function to load a script via script tag
/******/ 		__webpack_require__.l = (url, done, key, chunkId) => {
/******/ 			if(inProgress[url]) { inProgress[url].push(done); return; }
/******/ 			var script, needAttach;
/******/ 			if(key !== undefined) {
/******/ 				var scripts = document.getElementsByTagName("script");
/******/ 				for(var i = 0; i < scripts.length; i++) {
/******/ 					var s = scripts[i];
/******/ 					if(s.getAttribute("src") == url || s.getAttribute("data-webpack") == dataWebpackPrefix + key) { script = s; break; }
/******/ 				}
/******/ 			}
/******/ 			if(!script) {
/******/ 				needAttach = true;
/******/ 				script = document.createElement('script');
/******/ 		
/******/ 				script.charset = 'utf-8';
/******/ 				script.timeout = 120;
/******/ 				if (__webpack_require__.nc) {
/******/ 					script.setAttribute("nonce", __webpack_require__.nc);
/******/ 				}
/******/ 				script.setAttribute("data-webpack", dataWebpackPrefix + key);
/******/ 				script.src = url;
/******/ 			}
/******/ 			inProgress[url] = [done];
/******/ 			var onScriptComplete = (prev, event) => {
/******/ 				// avoid mem leaks in IE.
/******/ 				script.onerror = script.onload = null;
/******/ 				clearTimeout(timeout);
/******/ 				var doneFns = inProgress[url];
/******/ 				delete inProgress[url];
/******/ 				script.parentNode && script.parentNode.removeChild(script);
/******/ 				doneFns && doneFns.forEach((fn) => (fn(event)));
/******/ 				if(prev) return prev(event);
/******/ 			};
/******/ 			var timeout = setTimeout(onScriptComplete.bind(null, undefined, { type: 'timeout', target: script }), 120000);
/******/ 			script.onerror = onScriptComplete.bind(null, script.onerror);
/******/ 			script.onload = onScriptComplete.bind(null, script.onload);
/******/ 			needAttach && document.head.appendChild(script);
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/publicPath */
/******/ 	(() => {
/******/ 		__webpack_require__.p = "/build/";
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/jsonp chunk loading */
/******/ 	(() => {
/******/ 		// no baseURI
/******/ 		
/******/ 		// object to store loaded and loading chunks
/******/ 		// undefined = chunk not loaded, null = chunk preloaded/prefetched
/******/ 		// [resolve, reject, Promise] = chunk loading, 0 = chunk loaded
/******/ 		var installedChunks = {
/******/ 			"index": 0
/******/ 		};
/******/ 		
/******/ 		__webpack_require__.f.j = (chunkId, promises) => {
/******/ 				// JSONP chunk loading for javascript
/******/ 				var installedChunkData = __webpack_require__.o(installedChunks, chunkId) ? installedChunks[chunkId] : undefined;
/******/ 				if(installedChunkData !== 0) { // 0 means "already installed".
/******/ 		
/******/ 					// a Promise means "currently loading".
/******/ 					if(installedChunkData) {
/******/ 						promises.push(installedChunkData[2]);
/******/ 					} else {
/******/ 						if(true) { // all chunks have JS
/******/ 							// setup Promise in chunk cache
/******/ 							var promise = new Promise((resolve, reject) => (installedChunkData = installedChunks[chunkId] = [resolve, reject]));
/******/ 							promises.push(installedChunkData[2] = promise);
/******/ 		
/******/ 							// start chunk loading
/******/ 							var url = __webpack_require__.p + __webpack_require__.u(chunkId);
/******/ 							// create error before stack unwound to get useful stacktrace later
/******/ 							var error = new Error();
/******/ 							var loadingEnded = (event) => {
/******/ 								if(__webpack_require__.o(installedChunks, chunkId)) {
/******/ 									installedChunkData = installedChunks[chunkId];
/******/ 									if(installedChunkData !== 0) installedChunks[chunkId] = undefined;
/******/ 									if(installedChunkData) {
/******/ 										var errorType = event && (event.type === 'load' ? 'missing' : event.type);
/******/ 										var realSrc = event && event.target && event.target.src;
/******/ 										error.message = 'Loading chunk ' + chunkId + ' failed.\n(' + errorType + ': ' + realSrc + ')';
/******/ 										error.name = 'ChunkLoadError';
/******/ 										error.type = errorType;
/******/ 										error.request = realSrc;
/******/ 										installedChunkData[1](error);
/******/ 									}
/******/ 								}
/******/ 							};
/******/ 							__webpack_require__.l(url, loadingEnded, "chunk-" + chunkId, chunkId);
/******/ 						} else installedChunks[chunkId] = 0;
/******/ 					}
/******/ 				}
/******/ 		};
/******/ 		
/******/ 		// no prefetching
/******/ 		
/******/ 		// no preloaded
/******/ 		
/******/ 		// no HMR
/******/ 		
/******/ 		// no HMR manifest
/******/ 		
/******/ 		// no on chunks loaded
/******/ 		
/******/ 		// install a JSONP callback for chunk loading
/******/ 		var webpackJsonpCallback = (parentChunkLoadingFunction, data) => {
/******/ 			var [chunkIds, moreModules, runtime] = data;
/******/ 			// add "moreModules" to the modules object,
/******/ 			// then flag all "chunkIds" as loaded and fire callback
/******/ 			var moduleId, chunkId, i = 0;
/******/ 			if(chunkIds.some((id) => (installedChunks[id] !== 0))) {
/******/ 				for(moduleId in moreModules) {
/******/ 					if(__webpack_require__.o(moreModules, moduleId)) {
/******/ 						__webpack_require__.m[moduleId] = moreModules[moduleId];
/******/ 					}
/******/ 				}
/******/ 				if(runtime) var result = runtime(__webpack_require__);
/******/ 			}
/******/ 			if(parentChunkLoadingFunction) parentChunkLoadingFunction(data);
/******/ 			for(;i < chunkIds.length; i++) {
/******/ 				chunkId = chunkIds[i];
/******/ 				if(__webpack_require__.o(installedChunks, chunkId) && installedChunks[chunkId]) {
/******/ 					installedChunks[chunkId][0]();
/******/ 				}
/******/ 				installedChunks[chunkId] = 0;
/******/ 			}
/******/ 		
/******/ 		}
/******/ 		
/******/ 		var chunkLoadingGlobal = self["webpackChunkbrowser_start_page"] = self["webpackChunkbrowser_start_page"] || [];
/******/ 		chunkLoadingGlobal.forEach(webpackJsonpCallback.bind(null, 0));
/******/ 		chunkLoadingGlobal.push = webpackJsonpCallback.bind(null, chunkLoadingGlobal.push.bind(chunkLoadingGlobal));
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/nonce */
/******/ 	(() => {
/******/ 		__webpack_require__.nc = undefined;
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./client/src/index.js");
/******/ 	
/******/ })()
;
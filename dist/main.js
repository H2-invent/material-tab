/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./js/index.js":
/*!*********************!*\
  !*** ./js/index.js ***!
  \*********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _material_tab__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./material-tab */ \"./js/material-tab.js\");\n\r\n\r\n\r\ndocument.addEventListener(\"DOMContentLoaded\", function () {\r\n    (0,_material_tab__WEBPACK_IMPORTED_MODULE_0__.initTabs)('.nav-mat-tabs');\r\n});\r\n\r\n\n\n//# sourceURL=webpack://h2-invent-material-tabs/./js/index.js?");

/***/ }),

/***/ "./js/material-tab.js":
/*!****************************!*\
  !*** ./js/material-tab.js ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"initTabs\": () => (/* binding */ initTabs),\n/* harmony export */   \"initalSetUnderline\": () => (/* binding */ initalSetUnderline)\n/* harmony export */ });\nfunction initTabs(selectorTab) {\r\n\r\n    window.addEventListener('resize', initalSetUnderline('.underline'));\r\n\r\n\r\n    var anchors = document.querySelectorAll(selectorTab);\r\n    for (var i = 0; i < anchors.length; i++) {\r\n\r\n        anchors[i].insertAdjacentHTML('beforeend', '<span class=\"underline\"></span>');\r\n\r\n        var tabHandles = anchors[i].querySelectorAll('.nav-mat-item');\r\n        for (var k = 0; k < tabHandles.length; k++) {\r\n            var tabHand = tabHandles[k];\r\n            tabHand.onclick = function (e) {\r\n                e.preventDefault();\r\n                var ele = this;\r\n                var parent = ele.closest('.nav-mat-tabs');\r\n                var eleOld = parent.querySelector('.mat-active').closest('.nav-mat-item');\r\n                parent.querySelector('.mat-active').classList.remove('mat-active');\r\n                ele.classList.add('mat-active');\r\n                var parentwidth = parent.clientWidth;\r\n                var eleWidth = ele.clientWidth;\r\n                var oldRight = eleOld.offsetLeft + eleOld.clientWidth;\r\n                var oldLeft = eleOld.offsetLeft;\r\n                var newRight = ele.offsetLeft + ele.clientWidth;\r\n                var newLeft = ele.offsetLeft;\r\n                var oldWidth = ele.clientWidth;\r\n                var tmpWidth = oldRight - newLeft;\r\n                if (oldLeft < newLeft) {\r\n                    tmpWidth = newRight - oldLeft;\r\n                }\r\n                var direction = newLeft < oldLeft ? 1 : 0;\r\n\r\n                if (direction === 1) {//we move to the left\r\n                    parent.querySelector('.underline').style.transform = 'translateX(' + newLeft / parentwidth * 100 + '%) scaleX(' + tmpWidth / parentwidth + ')';\r\n                } else {\r\n                    parent.querySelector('.underline').style.transform = 'translateX(' + oldLeft / parentwidth * 100 + '%) scaleX(' + tmpWidth / parentwidth + ')';\r\n                }\r\n\r\n\r\n                var leftAtfter = newLeft / parentwidth * 100;\r\n                var widthAfter = eleWidth / parentwidth;\r\n                setTimeout(function () {\r\n                    parent.querySelector('.underline').style.transform = 'translateX(' + leftAtfter + '%) scaleX(' + widthAfter + ')';\r\n                }, 180);\r\n\r\n                changeTabContent(ele.querySelector('a').getAttribute('href'), direction);\r\n            }\r\n        }\r\n        try {\r\n            initSwipe(anchors[i].dataset.swipe);\r\n        }catch (e) {\r\n            console.log(e);\r\n            console.log('Swipe not activeted. Add data-swipe=\"#id\" to the tabCOntent and on the nav bar see Demo')\r\n        }\r\n    }\r\n    initalSetUnderline('.underline');\r\n    var dropdown = document.querySelectorAll('.dropdownTabToggle');\r\n\r\n    for (var i = 0; i < dropdown.length; i++) {\r\n        dropdown[i].onclick = function (e) {\r\n            e.preventDefault();\r\n            var ele = this;\r\n            var target = ele.getAttribute('href');\r\n            changeTabContent(document.querySelector(target).getAttribute('href'), 1);\r\n            var dropdownItems = ele.closest('.dropdown-menu').querySelectorAll('.dropdown-item');\r\n\r\n            for (var y = 0; y < dropdownItems.length; y++) {\r\n                dropdownItems[y].classList.remove('mat-active');\r\n            }\r\n            ele.classList.add('mat-active');\r\n            ele.closest('.tabDropdown').querySelector('button').textContent = ele.textContent;\r\n        }\r\n    }\r\n\r\n}\r\n\r\n\r\nfunction changeTabContent(href, direction = 1) {\r\n    var target = document.querySelector(href);\r\n    var oldEle = target.closest('.tab-content').querySelector('.mat-active')\r\n    if (target.classList.contains('mat-active')) {\r\n        return false;\r\n    }\r\n    target.classList.add('noAnimation');\r\n    if (direction === 1) {//we move to the left\r\n        target.style.transform = 'translateX(-110%)'\r\n        oldEle.querySelector('.tab-pane').style.transform = 'translateX(110%)';\r\n    } else {\r\n        oldEle.querySelector('.tab-pane').style.transform = 'translateX(-110%)';\r\n        target.style.transform = 'translateX(110%)';\r\n    }\r\n    setTimeout(function () {\r\n        target.classList.remove('noAnimation')\r\n        oldEle.classList.remove('mat-active');\r\n        oldEle.querySelector('.mat-active').classList.remove('mat-active');\r\n        target.closest('.tab-content-watch').classList.add('mat-active');\r\n        target.style.transform = 'translateX(0%)';\r\n        target.classList.add('mat-active');\r\n    }, 0);\r\n    return true;\r\n}\r\n\r\nfunction initalSetUnderline($input) {\r\n    var anchors = document.querySelectorAll($input);\r\n\r\n    for (var i = 0; i < anchors.length; i++) {\r\n        var ele = anchors[i].closest('.nav-mat-tabs').querySelector('.nav-mat-item.mat-active');\r\n        var newLeft = ele.offsetLeft;\r\n        var parent = ele.closest('.nav-mat-tabs');\r\n        var parentwidth = parent.clientWidth;\r\n\r\n        var leftAtfter = newLeft / parentwidth * 100;\r\n        var widthAfter = ele.clientWidth / parentwidth;\r\n        parent.querySelector('.underline').style.transform = 'translateX(' + leftAtfter + '%) scaleX(' + widthAfter + ')';\r\n        parent.querySelector('.underline').style.display = 'block';\r\n    }\r\n}\r\n\r\n\r\nvar startX\r\nvar startY\r\nvar endX\r\nvar endY\r\nvar treshold = 100; //this sets the minimum swipe distance, to avoid noise and to filter actual swipes from just moving fingers\r\n\r\n\r\nfunction initSwipe(trigger) {\r\n    document.querySelector(trigger).addEventListener('touchstart', function (event) {\r\n        //console.log(event);\r\n        startX = event.touches[0].clientX;\r\n        startY = event.touches[0].clientY;\r\n        //console.log(`the start is at X: ${startX}px and the Y is at ${startY}px`)\r\n\r\n    })\r\n\r\n    document.querySelector(trigger).addEventListener('touchend', function (event) {\r\n        //console.log(event);\r\n        endX = event.changedTouches[0].clientX;\r\n        endY = event.changedTouches[0].clientY;\r\n        //console.log(`the start is at X: ${endX}px and the Y is at ${endY}px`)\r\n\r\n        var xDist = endX - startX;\r\n        var yDist = endY - startY;\r\n        if (Math.abs(xDist) > treshold) {\r\n            if (xDist < 0) {\r\n                left(this.dataset.swipe)\r\n            } else {\r\n                right(this.dataset.swipe)\r\n            }\r\n        }\r\n    })\r\n\r\n\r\n    var left = (target) => {\r\n        var tabnav = document.querySelector(target);\r\n        var tabActive = tabnav.querySelector('.mat-active');\r\n        var nextTab = tabActive.nextElementSibling;\r\n        if (nextTab) {\r\n            nextTab.click();\r\n        }\r\n    }\r\n    var right = (target) => {\r\n        var tabnav = document.querySelector(target);\r\n        var tabActive = tabnav.querySelector('.mat-active');\r\n        var prevTab = tabActive.previousElementSibling;\r\n        if (prevTab) {\r\n            prevTab.click();\r\n        }\r\n\r\n    }\r\n}\r\n\r\n\r\n\r\n\n\n//# sourceURL=webpack://h2-invent-material-tabs/./js/material-tab.js?");

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
/******/ 			// no module.id needed
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
/************************************************************************/
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
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
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
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./js/index.js");
/******/ 	
/******/ })()
;
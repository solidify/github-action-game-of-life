(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["@monarchwadia/conways-game-engine"] = factory();
	else
		root["@monarchwadia/conways-game-engine"] = factory();
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/conways-game-engine.ts");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/constants.ts":
/*!**************************!*\
  !*** ./src/constants.ts ***!
  \**************************/
/*! exports provided: ON, OFF, INHERIT */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"ON\", function() { return ON; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"OFF\", function() { return OFF; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"INHERIT\", function() { return INHERIT; });\nvar ON = 1;\nvar OFF = 0;\nvar INHERIT = undefined;\n\n\n//# sourceURL=webpack://@monarchwadia/conways-game-engine/./src/constants.ts?");

/***/ }),

/***/ "./src/conways-game-engine.ts":
/*!************************************!*\
  !*** ./src/conways-game-engine.ts ***!
  \************************************/
/*! exports provided: ConwaysGameEngine, defaultRules, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"ConwaysGameEngine\", function() { return ConwaysGameEngine; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"defaultRules\", function() { return defaultRules; });\n/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./utils */ \"./src/utils.ts\");\n/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./constants */ \"./src/constants.ts\");\n\n\nvar ConwaysGameEngine = /** @class */ (function () {\n    function ConwaysGameEngine(config) {\n        this.config = {\n            rowSize: config && config.rowSize || 10,\n            colSize: config && config.colSize || 10,\n            rules: config && config.rules || defaultRules(),\n            allowMultipleRuleMatches: config && config.allowMultipleRuleMatches || false\n        };\n        this.world = Object(_utils__WEBPACK_IMPORTED_MODULE_0__[\"initWorld\"])(_constants__WEBPACK_IMPORTED_MODULE_1__[\"OFF\"], this.config.rowSize, this.config.colSize);\n    }\n    ConwaysGameEngine.prototype.getState = function (row, col) {\n        return this.world[row][col];\n    };\n    ConwaysGameEngine.prototype.step = function () {\n        this.world = Object(_utils__WEBPACK_IMPORTED_MODULE_0__[\"calculateNewWorldState\"])(this);\n        return this.world;\n    };\n    ConwaysGameEngine.prototype.draw = function (row, col) {\n        this.world[row][col] = _constants__WEBPACK_IMPORTED_MODULE_1__[\"ON\"];\n    };\n    ConwaysGameEngine.prototype.erase = function (row, col) {\n        this.world[row][col] = _constants__WEBPACK_IMPORTED_MODULE_1__[\"OFF\"];\n    };\n    return ConwaysGameEngine;\n}());\n\nvar defaultRules = function () { return [\n    // 1. Any live cell with fewer than two live neighbours dies, as if by underpopulation.\n    {\n        name: \"Loneliness\",\n        matcher: function (currState, numberOfNeighbours) { return currState === _constants__WEBPACK_IMPORTED_MODULE_1__[\"ON\"] && numberOfNeighbours < 2; },\n        result: _constants__WEBPACK_IMPORTED_MODULE_1__[\"OFF\"]\n    },\n    // 2. Any live cell with two or three live neighbours lives on to the next generation.\n    {\n        name: \"Survival\",\n        matcher: function (currState, numberOfNeighbours) { return currState === _constants__WEBPACK_IMPORTED_MODULE_1__[\"ON\"] && (numberOfNeighbours === 2 || numberOfNeighbours === 3); },\n        result: _constants__WEBPACK_IMPORTED_MODULE_1__[\"ON\"]\n    },\n    // 3. Any live cell with more than three live neighbours dies, as if by overpopulation.\n    {\n        name: \"Overpopulation\",\n        matcher: function (currState, numberOfNeighbours) { return currState === _constants__WEBPACK_IMPORTED_MODULE_1__[\"ON\"] && numberOfNeighbours > 3; },\n        result: _constants__WEBPACK_IMPORTED_MODULE_1__[\"OFF\"]\n    },\n    // 4. Any dead cell with exactly three live neighbours becomes a live cell, as if by reproduction.\n    {\n        name: \"Reproduction\",\n        matcher: function (currState, numberOfNeighbours) { return currState === _constants__WEBPACK_IMPORTED_MODULE_1__[\"OFF\"] && numberOfNeighbours === 3; },\n        result: _constants__WEBPACK_IMPORTED_MODULE_1__[\"ON\"]\n    }\n]; };\n/* harmony default export */ __webpack_exports__[\"default\"] = (ConwaysGameEngine);\n\n\n//# sourceURL=webpack://@monarchwadia/conways-game-engine/./src/conways-game-engine.ts?");

/***/ }),

/***/ "./src/utils.ts":
/*!**********************!*\
  !*** ./src/utils.ts ***!
  \**********************/
/*! exports provided: times, getNumberOfNeighbours, initWorld, draw, calculateNewWorldState */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"times\", function() { return times; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"getNumberOfNeighbours\", function() { return getNumberOfNeighbours; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"initWorld\", function() { return initWorld; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"draw\", function() { return draw; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"calculateNewWorldState\", function() { return calculateNewWorldState; });\n/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./constants */ \"./src/constants.ts\");\n\nfunction times(iterations, callback) {\n    for (var i = 0; i < iterations; i++) {\n        callback(i);\n    }\n}\nfunction getNumberOfNeighbours(engine, homeRow, homeCol) {\n    var world = engine.world;\n    var _a = engine.config, rowSize = _a.rowSize, colSize = _a.colSize;\n    // scan the neighbourhood\n    var startingRow = homeRow - 1;\n    var endingRow = homeRow + 1;\n    var startingCol = homeCol - 1;\n    var endingCol = homeCol + 1; // R.I.P. Bug, you were called cellRow once. goddammit.\n    var numberOfNeighbours = 0;\n    for (var currentRow = startingRow; currentRow <= endingRow; currentRow++) {\n        // EDGE CASE 1: don't work with out-of-bound rows\n        if (currentRow < 0 || currentRow > (rowSize - 1)) {\n            continue;\n        }\n        for (var currentCol = startingCol; currentCol <= endingCol; currentCol++) {\n            // EDGE CASE 2: don't work with out-of-bound cols\n            if (currentCol < 0 || currentCol > (colSize - 1)) {\n                continue;\n            }\n            // EDGE CASE 3: don't scan yourself!\n            if (currentRow === homeRow && currentCol === homeCol) {\n                continue;\n            }\n            // scanning the neighbour now\n            if (world[currentRow][currentCol] === _constants__WEBPACK_IMPORTED_MODULE_0__[\"ON\"]) {\n                numberOfNeighbours++;\n            }\n        }\n    }\n    return numberOfNeighbours;\n}\nfunction initWorld(valueToSet, rowSize, colSize) {\n    var world = [];\n    times(rowSize, function (row) {\n        world[row] = [];\n        times(colSize, function (col) {\n            world[row][col] = valueToSet;\n        });\n    });\n    return world;\n}\nfunction draw(world, row, col) {\n    world[row][col] = _constants__WEBPACK_IMPORTED_MODULE_0__[\"ON\"];\n}\nfunction calculateNewWorldState(engine) {\n    var oldWorld = engine.world, config = engine.config;\n    var rules = config.rules, rowSize = config.rowSize, colSize = config.colSize, allowMultipleRuleMatches = config.allowMultipleRuleMatches;\n    var newWorld = initWorld(_constants__WEBPACK_IMPORTED_MODULE_0__[\"INHERIT\"], rowSize, colSize);\n    // process the rules\n    times(engine.config.rowSize, function (row) {\n        times(engine.config.colSize, function (col) {\n            var currState = engine.getState(row, col);\n            var numberOfNeighbours = getNumberOfNeighbours(engine, row, col);\n            var rulesAlreadyMatched = [];\n            rules.forEach(function (rule) {\n                var isMatch = rule.matcher(currState, numberOfNeighbours);\n                if (isMatch) {\n                    rulesAlreadyMatched.push(rule.name);\n                    // error check\n                    if (!allowMultipleRuleMatches && rulesAlreadyMatched.length > 1) {\n                        console.error(\"RULES ALREADY MATCHED\", rulesAlreadyMatched);\n                        throw new Error('Multiple rulematches detected. This is an illegal state. Game will abort.');\n                    }\n                    newWorld[row][col] = rule.result;\n                }\n            });\n        });\n    });\n    // collapse the worlds\n    times(rowSize, function (row) {\n        times(colSize, function (col) {\n            if (newWorld[row][col] === _constants__WEBPACK_IMPORTED_MODULE_0__[\"INHERIT\"]) {\n                newWorld[row][col] = oldWorld[row][col];\n            }\n        });\n    });\n    return newWorld;\n}\n\n\n//# sourceURL=webpack://@monarchwadia/conways-game-engine/./src/utils.ts?");

/***/ })

/******/ });
});
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "app";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _KeywordsList = __webpack_require__(1);

	var _KeywordsList2 = _interopRequireDefault(_KeywordsList);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _react = __webpack_require__(2);

	var _react2 = _interopRequireDefault(_react);

	var _KeywordsItem = __webpack_require__(3);

	var _KeywordsItem2 = _interopRequireDefault(_KeywordsItem);

	var _KeywordsClient = __webpack_require__(4);

	var _KeywordsClient2 = _interopRequireDefault(_KeywordsClient);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var KeywordsList = function () {
	    function KeywordsList() {
	        _classCallCheck(this, KeywordsList);

	        this.keywordsClient = new _KeywordsClient2.default();
	    }

	    _createClass(KeywordsList, [{
	        key: 'loadTransformAndPublish',
	        value: function loadTransformAndPublish() {
	            this.keywordsClient.loadKeywords().then(this.transformIntoSlice).then(this.publish);
	        }
	    }, {
	        key: 'transformIntoSlice',
	        value: function transformIntoSlice(keywords) {
	            return {
	                name: 'keywords',
	                priority: 100,
	                fragments: keywords.map(function (keywords) {
	                    return {
	                        linkSharedId: keywords.linkSharedId,
	                        component: _react2.default.createElement(_KeywordsItem2.default, { key: 'keywords-' + keywords.linkSharedId, keywords: keywords.keywords })
	                    };
	                })
	            };
	        }
	    }, {
	        key: 'publish',
	        value: function publish(slice) {
	            PubSub.publish('uiEvent.linksList.sliceWasLoaded', slice);
	        }
	    }]);

	    return KeywordsList;
	}();

	exports.default = KeywordsList;


	var keywordsList = new KeywordsList();
	keywordsList.loadTransformAndPublish();

/***/ },
/* 2 */
/***/ function(module, exports) {

	module.exports = React;

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _react = __webpack_require__(2);

	var _react2 = _interopRequireDefault(_react);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var KeywordsItem = function (_React$Component) {
	    _inherits(KeywordsItem, _React$Component);

	    function KeywordsItem() {
	        _classCallCheck(this, KeywordsItem);

	        return _possibleConstructorReturn(this, (KeywordsItem.__proto__ || Object.getPrototypeOf(KeywordsItem)).apply(this, arguments));
	    }

	    _createClass(KeywordsItem, [{
	        key: 'render',
	        value: function render() {
	            return _react2.default.createElement(
	                'div',
	                null,
	                _react2.default.createElement(
	                    'b',
	                    null,
	                    'Keywords:'
	                ),
	                ' ',
	                this.props.keywords
	            );
	        }
	    }]);

	    return KeywordsItem;
	}(_react2.default.Component);

	exports.default = KeywordsItem;

/***/ },
/* 4 */
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var Client = function () {
	    function Client() {
	        _classCallCheck(this, Client);
	    }

	    _createClass(Client, [{
	        key: "loadKeywords",
	        value: function loadKeywords() {
	            var result = new Promise(function (resolve, reject) {
	                var request = new XMLHttpRequest();
	                request.open("GET", "http://localhost:8080/keywords/resources/keywords");
	                request.onreadystatechange = function () {
	                    if (request.readyState == 4 && request.status == 200) {
	                        resolve(JSON.parse(request.responseText));
	                    }
	                };
	                request.send();
	            });
	            return result;
	        }
	    }]);

	    return Client;
	}();

	exports.default = Client;

/***/ }
/******/ ]);
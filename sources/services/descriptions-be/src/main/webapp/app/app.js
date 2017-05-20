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

	var _LinksListSlicesEvents = __webpack_require__(1);

	var _LinksListSlicesEvents2 = _interopRequireDefault(_LinksListSlicesEvents);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var linksListSlicesEvents = new _LinksListSlicesEvents2.default();
	linksListSlicesEvents.subscribeToRequested();

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _DescriptionsList = __webpack_require__(2);

	var _DescriptionsList2 = _interopRequireDefault(_DescriptionsList);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var LinksListSlicesEvents = function () {
	    function LinksListSlicesEvents() {
	        _classCallCheck(this, LinksListSlicesEvents);

	        this.descriptionsList = new _DescriptionsList2.default();
	    }

	    _createClass(LinksListSlicesEvents, [{
	        key: 'subscribeToRequested',
	        value: function subscribeToRequested() {
	            var _this = this;

	            this.linksListSlicesRequestedSubscriptionToken = PubSub.subscribe('uiEvent.linksListSlices.requested', function (msg) {
	                _this.descriptionsList.loadTransformAndPublish();
	            });
	        }
	    }]);

	    return LinksListSlicesEvents;
	}();

	exports.default = LinksListSlicesEvents;

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _react = __webpack_require__(3);

	var _react2 = _interopRequireDefault(_react);

	var _DescriptionItem = __webpack_require__(4);

	var _DescriptionItem2 = _interopRequireDefault(_DescriptionItem);

	var _DescriptionsClient = __webpack_require__(5);

	var _DescriptionsClient2 = _interopRequireDefault(_DescriptionsClient);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var DescriptionsList = function () {
	    function DescriptionsList() {
	        _classCallCheck(this, DescriptionsList);

	        this.descriptionsClient = new _DescriptionsClient2.default();
	    }

	    _createClass(DescriptionsList, [{
	        key: 'loadTransformAndPublish',
	        value: function loadTransformAndPublish() {
	            this.descriptionsClient.loadDescriptions().then(this.transformIntoSlice).then(this.publish);
	        }
	    }, {
	        key: 'transformIntoSlice',
	        value: function transformIntoSlice(descriptions) {
	            return {
	                name: 'description',
	                priority: 200,
	                fragments: descriptions.map(function (description) {
	                    return {
	                        linkSharedId: description.linkSharedId,
	                        component: _react2.default.createElement(_DescriptionItem2.default, { key: 'description-' + description.linkSharedId, description: description.description })
	                    };
	                })
	            };
	        }
	    }, {
	        key: 'publish',
	        value: function publish(slice) {
	            PubSub.publish('uiEvent.linksListSlice.available', slice);
	        }
	    }]);

	    return DescriptionsList;
	}();

	exports.default = DescriptionsList;

/***/ },
/* 3 */
/***/ function(module, exports) {

	module.exports = React;

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _react = __webpack_require__(3);

	var _react2 = _interopRequireDefault(_react);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var DescriptionItem = function (_React$Component) {
	    _inherits(DescriptionItem, _React$Component);

	    function DescriptionItem() {
	        _classCallCheck(this, DescriptionItem);

	        return _possibleConstructorReturn(this, (DescriptionItem.__proto__ || Object.getPrototypeOf(DescriptionItem)).apply(this, arguments));
	    }

	    _createClass(DescriptionItem, [{
	        key: "render",
	        value: function render() {
	            return _react2.default.createElement(
	                "p",
	                { className: "list-group-item-text top-buffer" },
	                this.props.description
	            );
	        }
	    }]);

	    return DescriptionItem;
	}(_react2.default.Component);

	exports.default = DescriptionItem;

/***/ },
/* 5 */
/***/ function(module, exports) {

	'use strict';

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
	        key: 'loadDescriptions',
	        value: function loadDescriptions() {
	            var result = new Promise(function (resolve, reject) {
	                var request = new XMLHttpRequest();
	                request.open("GET", services.get('descriptions') + '/resources/descriptions');
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
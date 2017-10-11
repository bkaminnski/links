/******/ (function(modules) { // webpackBootstrap
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
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
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
/******/ 	__webpack_require__.p = "app";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 3);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

module.exports = React;

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _MonitoringPage = __webpack_require__(4);

var _MonitoringPage2 = _interopRequireDefault(_MonitoringPage);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var ContentEvents = function () {
    function ContentEvents() {
        _classCallCheck(this, ContentEvents);
    }

    _createClass(ContentEvents, [{
        key: 'subscribeToRequested',
        value: function subscribeToRequested() {
            var _this = this;

            this.menuItemRequestedSubscriptionToken = PubSub.subscribe('uiEvent.content.requested.monitoring', function (msg) {
                _this.publishAvailable();
            });
        }
    }, {
        key: 'publishAvailable',
        value: function publishAvailable() {
            PubSub.publish('uiEvent.content.available', React.createElement(_MonitoringPage2.default, null));
        }
    }]);

    return ContentEvents;
}();

exports.default = ContentEvents;

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var MenuItemsEvents = function () {
    function MenuItemsEvents() {
        _classCallCheck(this, MenuItemsEvents);
    }

    _createClass(MenuItemsEvents, [{
        key: 'subscribeToRequested',
        value: function subscribeToRequested() {
            var _this = this;

            this.menuItemRequestedSubscriptionToken = PubSub.subscribe('uiEvent.menuItems.requested', function (msg) {
                _this.publishAvailable();
            });
        }
    }, {
        key: 'publishAvailable',
        value: function publishAvailable() {
            PubSub.publish('uiEvent.menuItem.available', {
                code: 'monitoring',
                label: 'Monitoring',
                priority: 5000
            });
        }
    }]);

    return MenuItemsEvents;
}();

exports.default = MenuItemsEvents;

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _MenuItemsEvents = __webpack_require__(2);

var _MenuItemsEvents2 = _interopRequireDefault(_MenuItemsEvents);

var _ContentEvents = __webpack_require__(1);

var _ContentEvents2 = _interopRequireDefault(_ContentEvents);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var contentEvents = new _ContentEvents2.default();
contentEvents.subscribeToRequested();

var menuItemsEvents = new _MenuItemsEvents2.default();
menuItemsEvents.subscribeToRequested();
menuItemsEvents.publishAvailable();

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _TopicMessagesList = __webpack_require__(6);

var _TopicMessagesList2 = _interopRequireDefault(_TopicMessagesList);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var MonitoringPage = function (_React$Component) {
    _inherits(MonitoringPage, _React$Component);

    function MonitoringPage() {
        _classCallCheck(this, MonitoringPage);

        return _possibleConstructorReturn(this, (MonitoringPage.__proto__ || Object.getPrototypeOf(MonitoringPage)).apply(this, arguments));
    }

    _createClass(MonitoringPage, [{
        key: 'render',
        value: function render() {
            return _react2.default.createElement(
                'div',
                null,
                _react2.default.createElement(_TopicMessagesList2.default, null)
            );
        }
    }]);

    return MonitoringPage;
}(_react2.default.Component);

exports.default = MonitoringPage;

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var TopicMessageRow = function (_React$Component) {
    _inherits(TopicMessageRow, _React$Component);

    function TopicMessageRow() {
        _classCallCheck(this, TopicMessageRow);

        return _possibleConstructorReturn(this, (TopicMessageRow.__proto__ || Object.getPrototypeOf(TopicMessageRow)).apply(this, arguments));
    }

    _createClass(TopicMessageRow, [{
        key: 'render',
        value: function render() {
            return _react2.default.createElement(
                'tr',
                null,
                _react2.default.createElement(
                    'td',
                    null,
                    this.props.topicMessage.messageId
                ),
                _react2.default.createElement(
                    'td',
                    null,
                    this.props.topicMessage.eventName
                ),
                _react2.default.createElement(
                    'td',
                    null,
                    this.props.topicMessage.trackingId
                ),
                _react2.default.createElement(
                    'td',
                    null,
                    this.props.topicMessage.creatingServiceName
                ),
                _react2.default.createElement(
                    'td',
                    null,
                    this.props.topicMessage.creationTimestamp
                ),
                _react2.default.createElement(
                    'td',
                    null,
                    this.props.topicMessage.receptionTimestamp
                ),
                _react2.default.createElement(
                    'td',
                    null,
                    this.props.topicMessage.payload
                )
            );
        }
    }]);

    return TopicMessageRow;
}(_react2.default.Component);

exports.default = TopicMessageRow;

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _TopicMessagesListStore = __webpack_require__(7);

var _TopicMessagesListStore2 = _interopRequireDefault(_TopicMessagesListStore);

var _TopicMessageRow = __webpack_require__(5);

var _TopicMessageRow2 = _interopRequireDefault(_TopicMessageRow);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var TopicMessagesList = function (_React$Component) {
    _inherits(TopicMessagesList, _React$Component);

    function TopicMessagesList() {
        _classCallCheck(this, TopicMessagesList);

        var _this = _possibleConstructorReturn(this, (TopicMessagesList.__proto__ || Object.getPrototypeOf(TopicMessagesList)).call(this));

        _this.topicMessagesListStore = new _TopicMessagesListStore2.default(_this);
        return _this;
    }

    _createClass(TopicMessagesList, [{
        key: 'componentDidMount',
        value: function componentDidMount() {
            this.topicMessagesListStore.subscribeToEvents();
        }
    }, {
        key: 'componentWillUnmount',
        value: function componentWillUnmount() {
            this.topicMessagesListStore.unsubscribeFromEvents();
        }
    }, {
        key: 'render',
        value: function render() {
            return _react2.default.createElement(
                'div',
                { className: 'panel panel-default' },
                _react2.default.createElement(
                    'div',
                    { className: 'panel-heading' },
                    'Backend topic messages - live preview'
                ),
                _react2.default.createElement(
                    'table',
                    { className: 'table table-striped' },
                    _react2.default.createElement(
                        'thead',
                        null,
                        _react2.default.createElement(
                            'tr',
                            null,
                            _react2.default.createElement(
                                'th',
                                null,
                                'Message ID'
                            ),
                            _react2.default.createElement(
                                'th',
                                null,
                                'Event name'
                            ),
                            _react2.default.createElement(
                                'th',
                                null,
                                'Tracking ID'
                            ),
                            _react2.default.createElement(
                                'th',
                                null,
                                'Creating service name'
                            ),
                            _react2.default.createElement(
                                'th',
                                null,
                                'Creation timestamp'
                            ),
                            _react2.default.createElement(
                                'th',
                                null,
                                'Reception timestamp'
                            ),
                            _react2.default.createElement(
                                'th',
                                null,
                                'Payload'
                            )
                        )
                    ),
                    _react2.default.createElement(
                        'tbody',
                        null,
                        this.state.topicMessages.map(function (topicMessage) {
                            return _react2.default.createElement(_TopicMessageRow2.default, {
                                key: topicMessage.messageId,
                                topicMessage: topicMessage
                            });
                        })
                    )
                )
            );
        }
    }]);

    return TopicMessagesList;
}(_react2.default.Component);

exports.default = TopicMessagesList;

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var TopicMessagesListStore = function () {
    function TopicMessagesListStore(topicMessagesList) {
        _classCallCheck(this, TopicMessagesListStore);

        this.component = topicMessagesList;
        this.component.state = { topicMessages: [] };
        this.topicMessages = [];
        this.bufferTimeout = null;
    }

    _createClass(TopicMessagesListStore, [{
        key: 'subscribeToEvents',
        value: function subscribeToEvents() {
            var _this = this;

            this.topicMessageAvailableSubscriptionToken = PubSub.subscribe('uiEvent.topicMessage.available', function (msg, topicMessage) {
                _this.addTopicMessage(topicMessage);
            });
        }
    }, {
        key: 'addTopicMessage',
        value: function addTopicMessage(topicMessage) {
            this.topicMessages.unshift(topicMessage);
            this.component.setState({ topicMessages: this.topicMessages });
        }
    }, {
        key: 'unsubscribeFromEvents',
        value: function unsubscribeFromEvents() {
            PubSub.unsubscribe(this.topicMessageAvailableSubscriptionToken);
        }
    }]);

    return TopicMessagesListStore;
}();

exports.default = TopicMessagesListStore;

/***/ })
/******/ ]);
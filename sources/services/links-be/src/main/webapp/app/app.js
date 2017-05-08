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
/******/ 	return __webpack_require__(__webpack_require__.s = 5);
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

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Client = function () {
    function Client() {
        _classCallCheck(this, Client);
    }

    _createClass(Client, [{
        key: "createLink",
        value: function createLink(url) {
            var result = new Promise(function (resolve, reject) {
                var request = new XMLHttpRequest();
                request.open("POST", "http://localhost:8080/links/resources/links");
                request.setRequestHeader("Content-type", "application/json");
                request.setRequestHeader("Accept", "*/*");
                request.onreadystatechange = function () {
                    if (request.readyState == 4 && request.status == 204) {
                        resolve(request.status);
                    }
                };
                request.send(JSON.stringify({
                    sharedId: 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
                        var r = Math.random() * 16 | 0,
                            v = c == 'x' ? r : r & 0x3 | 0x8;return v.toString(16);
                    }),
                    url: url
                }));
            });
            return result;
        }
    }, {
        key: "loadLinks",
        value: function loadLinks() {
            var result = new Promise(function (resolve, reject) {
                var request = new XMLHttpRequest();
                request.open("GET", "http://localhost:8080/links/resources/links");
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

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _LinksPage = __webpack_require__(4);

var _LinksPage2 = _interopRequireDefault(_LinksPage);

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

            this.menuItemRequestedSubscriptionToken = PubSub.subscribe('uiEvent.content.requested.links', function (msg) {
                _this.publishAvailable();
            });
        }
    }, {
        key: 'publishAvailable',
        value: function publishAvailable() {
            PubSub.publish('uiEvent.content.isAvailable', React.createElement(_LinksPage2.default, null));
        }
    }]);

    return ContentEvents;
}();

exports.default = ContentEvents;

/***/ }),
/* 3 */,
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _LinkCreation = __webpack_require__(6);

var _LinkCreation2 = _interopRequireDefault(_LinkCreation);

var _LinksList = __webpack_require__(8);

var _LinksList2 = _interopRequireDefault(_LinksList);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var LinksPage = function (_React$Component) {
    _inherits(LinksPage, _React$Component);

    function LinksPage() {
        _classCallCheck(this, LinksPage);

        return _possibleConstructorReturn(this, (LinksPage.__proto__ || Object.getPrototypeOf(LinksPage)).apply(this, arguments));
    }

    _createClass(LinksPage, [{
        key: 'render',
        value: function render() {
            return _react2.default.createElement(
                'div',
                null,
                _react2.default.createElement(_LinkCreation2.default, null),
                _react2.default.createElement(_LinksList2.default, null)
            );
        }
    }]);

    return LinksPage;
}(_react2.default.Component);

exports.default = LinksPage;

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _MenuItemsEvents = __webpack_require__(11);

var _MenuItemsEvents2 = _interopRequireDefault(_MenuItemsEvents);

var _ContentEvents = __webpack_require__(2);

var _ContentEvents2 = _interopRequireDefault(_ContentEvents);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var contentEvents = new _ContentEvents2.default();
contentEvents.subscribeToRequested();

var menuItemsEvents = new _MenuItemsEvents2.default();
menuItemsEvents.subscribeToRequested();
menuItemsEvents.publishAvailable();

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

var _LinksClient = __webpack_require__(1);

var _LinksClient2 = _interopRequireDefault(_LinksClient);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var LinkCreation = function (_React$Component) {
    _inherits(LinkCreation, _React$Component);

    function LinkCreation() {
        _classCallCheck(this, LinkCreation);

        var _this = _possibleConstructorReturn(this, (LinkCreation.__proto__ || Object.getPrototypeOf(LinkCreation)).call(this));

        _this.linksClient = new _LinksClient2.default();
        _this.submitItem = _this.submitItem.bind(_this);
        return _this;
    }

    _createClass(LinkCreation, [{
        key: 'render',
        value: function render() {
            return _react2.default.createElement(
                'div',
                null,
                _react2.default.createElement(
                    'form',
                    { onSubmit: this.submitItem },
                    _react2.default.createElement('input', { type: 'text', ref: 'item' }),
                    _react2.default.createElement('input', { type: 'submit', value: 'Add to list' })
                )
            );
        }
    }, {
        key: 'submitItem',
        value: function submitItem(e) {
            e.preventDefault();
            var url = this.refs.item.value;
            this.linksClient.createLink(url).then(function (responseStatus) {
                PubSub.publish('uiEvent.linkCreation.linkWasCreated');
            });
        }
    }]);

    return LinkCreation;
}(_react2.default.Component);

exports.default = LinkCreation;

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _Url = __webpack_require__(10);

var _Url2 = _interopRequireDefault(_Url);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var LinkItem = function (_React$Component) {
    _inherits(LinkItem, _React$Component);

    function LinkItem() {
        _classCallCheck(this, LinkItem);

        return _possibleConstructorReturn(this, (LinkItem.__proto__ || Object.getPrototypeOf(LinkItem)).apply(this, arguments));
    }

    _createClass(LinkItem, [{
        key: 'render',
        value: function render() {
            return _react2.default.createElement(
                'div',
                null,
                _react2.default.createElement(_Url2.default, { url: this.props.link.url }),
                this.props.link.components,
                _react2.default.createElement('hr', null)
            );
        }
    }]);

    return LinkItem;
}(_react2.default.Component);

exports.default = LinkItem;

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _LinksListStateBuilder = __webpack_require__(9);

var _LinksListStateBuilder2 = _interopRequireDefault(_LinksListStateBuilder);

var _LinkItem = __webpack_require__(7);

var _LinkItem2 = _interopRequireDefault(_LinkItem);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var LinksList = function (_React$Component) {
    _inherits(LinksList, _React$Component);

    function LinksList() {
        _classCallCheck(this, LinksList);

        var _this = _possibleConstructorReturn(this, (LinksList.__proto__ || Object.getPrototypeOf(LinksList)).call(this));

        _this.linksListStateBuilder = new _LinksListStateBuilder2.default(_this);
        _this.state = { links: [] };
        return _this;
    }

    _createClass(LinksList, [{
        key: 'componentDidMount',
        value: function componentDidMount() {
            this.linksListStateBuilder.subscribeToEvents();
            this.linksListStateBuilder.loadLinks();
        }
    }, {
        key: 'componentWillUnmount',
        value: function componentWillUnmount() {
            this.linksListStateBuilder.unsubscribeFromEvents();
        }
    }, {
        key: 'render',
        value: function render() {
            return _react2.default.createElement(
                'div',
                null,
                this.state.links.map(function (link) {
                    return _react2.default.createElement(_LinkItem2.default, { key: link.sharedId, link: link });
                })
            );
        }
    }]);

    return LinksList;
}(_react2.default.Component);

exports.default = LinksList;

/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _LinksClient = __webpack_require__(1);

var _LinksClient2 = _interopRequireDefault(_LinksClient);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var LinksListStateBuilder = function () {
    function LinksListStateBuilder(linksListComponent) {
        _classCallCheck(this, LinksListStateBuilder);

        this.linksListComponent = linksListComponent;
        this.linksClient = new _LinksClient2.default();
        this.links = [];
        this.slices = [];
    }

    _createClass(LinksListStateBuilder, [{
        key: 'rebuildState',
        value: function rebuildState() {
            var linksMap = {};
            this.links.forEach(function (link) {
                link.components = [];
                linksMap[link.sharedId] = link;
            });
            this.slices.sort(function (s1, s2) {
                return s1.priority - s2.priority;
            }).forEach(function (slice) {
                return slice.fragments.forEach(function (fragment) {
                    return linksMap[fragment.linkSharedId].components.push(fragment.component);
                });
            });
            this.linksListComponent.setState({ links: this.links });
        }
    }, {
        key: 'loadLinks',
        value: function loadLinks() {
            var _this = this;

            this.linksClient.loadLinks().then(function (links) {
                _this.links = links;
                _this.rebuildState();
            });
        }
    }, {
        key: 'subscribeToEvents',
        value: function subscribeToEvents() {
            var _this2 = this;

            this.sliceWasLoadedSubscriptionToken = PubSub.subscribe('uiEvent.linksList.sliceWasLoaded', function (msg, slice) {
                _this2.slices.push(slice);
                _this2.rebuildState();
            });
            this.linkWasCreatedSubscriptionToken = PubSub.subscribe('uiEvent.linkCreation.linkWasCreated', function (msg) {
                _this2.loadLinks();
            });
        }
    }, {
        key: 'unsubscribeFromEvents',
        value: function unsubscribeFromEvents() {
            PubSub.unsubscribe(this.sliceWasLoadedSubscriptionToken);
            PubSub.unsubscribe(this.linkWasCreatedSubscriptionToken);
        }
    }]);

    return LinksListStateBuilder;
}();

exports.default = LinksListStateBuilder;

/***/ }),
/* 10 */
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

var Url = function (_React$Component) {
    _inherits(Url, _React$Component);

    function Url() {
        _classCallCheck(this, Url);

        return _possibleConstructorReturn(this, (Url.__proto__ || Object.getPrototypeOf(Url)).apply(this, arguments));
    }

    _createClass(Url, [{
        key: 'render',
        value: function render() {
            return _react2.default.createElement(
                'div',
                null,
                _react2.default.createElement(
                    'b',
                    null,
                    'Url:'
                ),
                ' ',
                _react2.default.createElement(
                    'a',
                    { href: this.props.url },
                    this.props.url
                )
            );
        }
    }]);

    return Url;
}(_react2.default.Component);

exports.default = Url;

/***/ }),
/* 11 */
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
            PubSub.publish('uiEvent.menuItem.isAvailable', {
                code: 'links',
                label: 'Links',
                priority: 100
            });
        }
    }]);

    return MenuItemsEvents;
}();

exports.default = MenuItemsEvents;

/***/ })
/******/ ]);
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
/******/ 	return __webpack_require__(__webpack_require__.s = 2);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

module.exports = React;

/***/ }),
/* 1 */,
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _ApplicationLayoutEvents = __webpack_require__(8);

var _ApplicationLayoutEvents2 = _interopRequireDefault(_ApplicationLayoutEvents);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var applicationLayoutEvents = new _ApplicationLayoutEvents2.default();
applicationLayoutEvents.publishAvailable();

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _ContentContainerStore = __webpack_require__(4);

var _ContentContainerStore2 = _interopRequireDefault(_ContentContainerStore);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ContentContainer = function (_React$Component) {
    _inherits(ContentContainer, _React$Component);

    function ContentContainer() {
        _classCallCheck(this, ContentContainer);

        var _this = _possibleConstructorReturn(this, (ContentContainer.__proto__ || Object.getPrototypeOf(ContentContainer)).call(this));

        _this.contentContainerStore = new _ContentContainerStore2.default(_this);
        _this.state = { contentComponent: null };
        return _this;
    }

    _createClass(ContentContainer, [{
        key: 'componentDidMount',
        value: function componentDidMount() {
            this.contentContainerStore.subscribeToEvents();
        }
    }, {
        key: 'componentWillUnmount',
        value: function componentWillUnmount() {
            this.contentContainerStore.unsubscribeFromEvents();
        }
    }, {
        key: 'render',
        value: function render() {
            return _react2.default.createElement(
                'div',
                { className: 'container' },
                this.state.contentComponent
            );
        }
    }]);

    return ContentContainer;
}(_react2.default.Component);

exports.default = ContentContainer;

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var ContentContainerStore = function () {
    function ContentContainerStore(contentContainerComponent) {
        _classCallCheck(this, ContentContainerStore);

        this.contentContainerComponent = contentContainerComponent;
    }

    _createClass(ContentContainerStore, [{
        key: 'subscribeToEvents',
        value: function subscribeToEvents() {
            var _this = this;

            this.contentIsAvailableSubscriptionToken = PubSub.subscribe('uiEvent.content.available', function (msg, contentComponent) {
                _this.contentContainerComponent.setState({ contentComponent: contentComponent });
            });
        }
    }, {
        key: 'unsubscribeFromEvents',
        value: function unsubscribeFromEvents() {
            PubSub.unsubscribe(this.contentIsAvailableSubscriptionToken);
        }
    }]);

    return ContentContainerStore;
}();

exports.default = ContentContainerStore;

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

var _MenuStore = __webpack_require__(7);

var _MenuStore2 = _interopRequireDefault(_MenuStore);

var _MenuItem = __webpack_require__(6);

var _MenuItem2 = _interopRequireDefault(_MenuItem);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Menu = function (_React$Component) {
    _inherits(Menu, _React$Component);

    function Menu() {
        _classCallCheck(this, Menu);

        var _this = _possibleConstructorReturn(this, (Menu.__proto__ || Object.getPrototypeOf(Menu)).call(this));

        _this.menuStore = new _MenuStore2.default(_this);
        _this.state = { menuItems: [] };
        _this.menuItemSeletedCallback = _this.menuItemSeletedCallback.bind(_this);
        return _this;
    }

    _createClass(Menu, [{
        key: 'componentDidMount',
        value: function componentDidMount() {
            this.menuStore.subscribeToEvents();
        }
    }, {
        key: 'componentWillUnmount',
        value: function componentWillUnmount() {
            this.menuStore.unsubscribeFromEvents();
        }
    }, {
        key: 'menuItemSeletedCallback',
        value: function menuItemSeletedCallback(menuItem) {
            this.menuStore.select(menuItem);
        }
    }, {
        key: 'render',
        value: function render() {
            var _this2 = this;

            return _react2.default.createElement(
                'nav',
                { className: 'navbar navbar-default' },
                _react2.default.createElement(
                    'div',
                    { className: 'container' },
                    _react2.default.createElement(
                        'div',
                        { className: 'navbar-header' },
                        _react2.default.createElement(
                            'button',
                            { type: 'button', className: 'navbar-toggle collapsed', 'data-toggle': 'collapse', 'data-target': '#navbar', 'aria-expanded': 'false', 'aria-controls': 'navbar' },
                            _react2.default.createElement(
                                'span',
                                { className: 'sr-only' },
                                'Toggle navigation'
                            ),
                            _react2.default.createElement('span', { className: 'icon-bar' }),
                            _react2.default.createElement('span', { className: 'icon-bar' }),
                            _react2.default.createElement('span', { className: 'icon-bar' })
                        ),
                        _react2.default.createElement(
                            'a',
                            { className: 'navbar-brand', href: '#' },
                            'A Place For Logo'
                        )
                    ),
                    _react2.default.createElement(
                        'div',
                        { id: 'navbar', className: 'collapse navbar-collapse' },
                        _react2.default.createElement(
                            'ul',
                            { className: 'nav navbar-nav' },
                            this.state.menuItems.map(function (menuItem) {
                                return _react2.default.createElement(_MenuItem2.default, { key: 'menuItem' + menuItem.code, menuItem: menuItem, menuItemSeletedCallback: _this2.menuItemSeletedCallback });
                            })
                        )
                    )
                )
            );
        }
    }]);

    return Menu;
}(_react2.default.Component);

exports.default = Menu;

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

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var MenuItem = function (_React$Component) {
    _inherits(MenuItem, _React$Component);

    function MenuItem(props) {
        _classCallCheck(this, MenuItem);

        var _this = _possibleConstructorReturn(this, (MenuItem.__proto__ || Object.getPrototypeOf(MenuItem)).call(this, props));

        _this.onClick = _this.onClick.bind(_this);
        return _this;
    }

    _createClass(MenuItem, [{
        key: "onClick",
        value: function onClick(e) {
            e.preventDefault();
            this.props.menuItemSeletedCallback(this.props.menuItem);
        }
    }, {
        key: "render",
        value: function render() {
            return _react2.default.createElement(
                "li",
                null,
                _react2.default.createElement(
                    "a",
                    { href: "#", onClick: this.onClick },
                    this.props.menuItem.label
                )
            );
        }
    }]);

    return MenuItem;
}(_react2.default.Component);

exports.default = MenuItem;

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var MenuStore = function () {
    function MenuStore(menuComponent) {
        _classCallCheck(this, MenuStore);

        this.menuComponent = menuComponent;
        this.menuItemsMap = new Map();
        this.selectedMenuItem = null;
    }

    _createClass(MenuStore, [{
        key: 'subscribeToEvents',
        value: function subscribeToEvents() {
            var _this = this;

            this.menuItemIsAvailableSubscriptionToken = PubSub.subscribe('uiEvent.menuItem.available', function (msg, menuItem) {
                _this.menuItemsMap.set(menuItem.code, menuItem);
                _this.rebuildState();
            });
            PubSub.publish('uiEvent.menuItems.requested');
        }
    }, {
        key: 'unsubscribeFromEvents',
        value: function unsubscribeFromEvents() {
            PubSub.unsubscribe(this.menuItemIsAvailableSubscriptionToken);
        }
    }, {
        key: 'rebuildState',
        value: function rebuildState() {
            var menuItems = [];
            this.menuItemsMap.forEach(function (value) {
                return menuItems.push(value);
            });
            menuItems.sort(function (mi1, mi2) {
                return mi1.priority - mi2.priority;
            });
            if (menuItems.length > 0) {
                this.select(menuItems[0]);
            }
            this.menuComponent.setState({ menuItems: menuItems, selectedMenuItem: this.selectedMenuItem });
        }
    }, {
        key: 'select',
        value: function select(menuItem) {
            this.selectedMenuItem = menuItem;
            PubSub.publish('uiEvent.content.requested.' + this.selectedMenuItem.code);
        }
    }]);

    return MenuStore;
}();

exports.default = MenuStore;

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _MenuAndContent = __webpack_require__(9);

var _MenuAndContent2 = _interopRequireDefault(_MenuAndContent);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var ApplicationLayoutEvents = function () {
    function ApplicationLayoutEvents() {
        _classCallCheck(this, ApplicationLayoutEvents);
    }

    _createClass(ApplicationLayoutEvents, [{
        key: 'publishAvailable',
        value: function publishAvailable() {
            PubSub.publish('uiEvent.applicationLayout.available', React.createElement(_MenuAndContent2.default, null));
        }
    }]);

    return ApplicationLayoutEvents;
}();

exports.default = ApplicationLayoutEvents;

/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _Menu = __webpack_require__(5);

var _Menu2 = _interopRequireDefault(_Menu);

var _ContentContainer = __webpack_require__(3);

var _ContentContainer2 = _interopRequireDefault(_ContentContainer);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var MenuAndContent = function (_React$Component) {
    _inherits(MenuAndContent, _React$Component);

    function MenuAndContent() {
        _classCallCheck(this, MenuAndContent);

        return _possibleConstructorReturn(this, (MenuAndContent.__proto__ || Object.getPrototypeOf(MenuAndContent)).apply(this, arguments));
    }

    _createClass(MenuAndContent, [{
        key: 'render',
        value: function render() {
            return _react2.default.createElement(
                'div',
                null,
                _react2.default.createElement(_Menu2.default, null),
                _react2.default.createElement(_ContentContainer2.default, null)
            );
        }
    }]);

    return MenuAndContent;
}(_react2.default.Component);

exports.default = MenuAndContent;

/***/ })
/******/ ]);
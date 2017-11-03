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

var _LinksPage = __webpack_require__(13);

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

            this.contentRequestedSubscriptionToken = PubSub.subscribe('uiEvent.menu-and-content.content.requested.links', function (msg) {
                _this.publishAvailable();
            });
        }
    }, {
        key: 'publishAvailable',
        value: function publishAvailable() {
            PubSub.publish('uiEvent.menu-and-content.content.available', React.createElement(_LinksPage2.default, null));
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

            this.menuItemRequestedSubscriptionToken = PubSub.subscribe('uiEvent.menu-and-content.menuItems.requested', function (msg) {
                _this.publishAvailable();
            });
        }
    }, {
        key: 'publishAvailable',
        value: function publishAvailable() {
            PubSub.publish('uiEvent.menu-and-content.menuItem.available', {
                code: 'links',
                label: 'Links',
                priority: 100
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
/* 4 */,
/* 5 */,
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _LinkCreationFormStore = __webpack_require__(7);

var _LinkCreationFormStore2 = _interopRequireDefault(_LinkCreationFormStore);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var LinkCreationForm = function (_React$Component) {
    _inherits(LinkCreationForm, _React$Component);

    function LinkCreationForm() {
        _classCallCheck(this, LinkCreationForm);

        var _this = _possibleConstructorReturn(this, (LinkCreationForm.__proto__ || Object.getPrototypeOf(LinkCreationForm)).call(this));

        _this.store = new _LinkCreationFormStore2.default(_this);
        _this.onSubmit = _this.onSubmit.bind(_this);
        return _this;
    }

    _createClass(LinkCreationForm, [{
        key: 'componentDidMount',
        value: function componentDidMount() {
            this.store.subscribeToEvents();
        }
    }, {
        key: 'componentWillUnmount',
        value: function componentWillUnmount() {
            this.store.unsubscribeFromEvents();
        }
    }, {
        key: 'render',
        value: function render() {
            return _react2.default.createElement(
                'div',
                { className: 'bottom-buffer-double' },
                _react2.default.createElement(
                    'form',
                    { onSubmit: this.onSubmit },
                    this.state.components,
                    _react2.default.createElement(
                        'div',
                        { className: 'text-right', role: 'group', 'aria-label': 'Add' },
                        _react2.default.createElement(
                            'button',
                            { type: 'submit', className: 'btn btn-default' },
                            'Add'
                        )
                    )
                )
            );
        }
    }, {
        key: 'onSubmit',
        value: function onSubmit(e) {
            e.preventDefault();
            this.store.onSubmit();
        }
    }]);

    return LinkCreationForm;
}(_react2.default.Component);

exports.default = LinkCreationForm;

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var LinkCreationFormStore = function () {
    function LinkCreationFormStore(component) {
        _classCallCheck(this, LinkCreationFormStore);

        this.component = component;
        this.component.state = { slices: [] };
        this.slices = {};
    }

    _createClass(LinkCreationFormStore, [{
        key: 'subscribeToEvents',
        value: function subscribeToEvents() {
            var _this = this;

            this.linkCreationSliceAvailableSubscriptionToken = PubSub.subscribe('uiEvent.links.linkCreationSlice.available', function (msg, slice) {
                _this.slices[slice.name] = slice;
                _this.rebuildState();
            });
            PubSub.publish('uiEvent.links.linkCreationSlices.requested');
        }
    }, {
        key: 'rebuildState',
        value: function rebuildState() {
            var _this2 = this;

            var slices = Object.keys(this.slices).map(function (k) {
                return _this2.slices[k];
            }).sort(function (s1, s2) {
                return s1.priority - s2.priority;
            });
            this.component.setState({ slices: slices });
        }
    }, {
        key: 'unsubscribeFromEvents',
        value: function unsubscribeFromEvents() {
            PubSub.unsubscribe(this.linkCreationSliceAvailableSubscriptionToken);
        }
    }, {
        key: 'onSubmit',
        value: function onSubmit() {}
    }]);

    return LinkCreationFormStore;
}();

exports.default = LinkCreationFormStore;

/***/ }),
/* 8 */,
/* 9 */,
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

var LinkItem = function (_React$Component) {
    _inherits(LinkItem, _React$Component);

    function LinkItem() {
        _classCallCheck(this, LinkItem);

        return _possibleConstructorReturn(this, (LinkItem.__proto__ || Object.getPrototypeOf(LinkItem)).apply(this, arguments));
    }

    _createClass(LinkItem, [{
        key: "render",
        value: function render() {
            return _react2.default.createElement(
                "div",
                { className: "list-group" },
                _react2.default.createElement(
                    "div",
                    { className: "list-group-item", target: "_blank" },
                    this.props.link.itemSlices.map(function (itemSlice) {
                        return itemSlice.component;
                    })
                )
            );
        }
    }]);

    return LinkItem;
}(_react2.default.Component);

exports.default = LinkItem;

/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _LinksListStore = __webpack_require__(12);

var _LinksListStore2 = _interopRequireDefault(_LinksListStore);

var _LinkItem = __webpack_require__(10);

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

        _this.store = new _LinksListStore2.default(_this);
        return _this;
    }

    _createClass(LinksList, [{
        key: 'componentDidMount',
        value: function componentDidMount() {
            this.store.subscribeToEvents();
        }
    }, {
        key: 'componentWillUnmount',
        value: function componentWillUnmount() {
            this.store.unsubscribeFromEvents();
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
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var LinksListStore = function () {
    function LinksListStore(linksListComponent) {
        _classCallCheck(this, LinksListStore);

        this.component = linksListComponent;
        this.component.state = { links: [] };
        this.listSlices = {};
    }

    _createClass(LinksListStore, [{
        key: 'subscribeToEvents',
        value: function subscribeToEvents() {
            var _this = this;

            this.linksListSliceAvailableSubscriptionToken = PubSub.subscribe('uiEvent.links.linksListSlice.available', function (msg, listSlice) {
                _this.listSlices[listSlice.name] = listSlice;
                _this.rebuildState();
            });
            PubSub.publish('uiEvent.links.linksListSlices.requested');
        }
    }, {
        key: 'rebuildState',
        value: function rebuildState() {
            var _this2 = this;

            var linksMap = {};
            var links = [];
            Object.keys(this.listSlices).map(function (k) {
                return _this2.listSlices[k];
            }).forEach(function (listSlice) {
                return listSlice.items.forEach(function (item) {
                    if (linksMap[item.linkSharedId] == null) {
                        var link = {
                            sharedId: item.linkSharedId,
                            itemSlices: []
                        };
                        links.push(link);
                        linksMap[item.linkSharedId] = link;
                    }
                });
            });
            Object.keys(this.listSlices).map(function (k) {
                return _this2.listSlices[k];
            }).sort(function (s1, s2) {
                return s1.priority - s2.priority;
            }).forEach(function (listSlice) {
                return listSlice.items.forEach(function (item) {
                    var itemSlice = {
                        name: listSlice.name,
                        component: item.component
                    };
                    linksMap[item.linkSharedId].itemSlices.push(itemSlice);
                });
            });
            this.component.setState({ links: links });
        }
    }, {
        key: 'unsubscribeFromEvents',
        value: function unsubscribeFromEvents() {
            PubSub.unsubscribe(this.linksListSliceAvailableSubscriptionToken);
        }
    }]);

    return LinksListStore;
}();

exports.default = LinksListStore;

/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _LinkCreationForm = __webpack_require__(6);

var _LinkCreationForm2 = _interopRequireDefault(_LinkCreationForm);

var _LinksList = __webpack_require__(11);

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
                _react2.default.createElement(_LinksList2.default, null)
            );
        }
    }]);

    return LinksPage;
}(_react2.default.Component);

exports.default = LinksPage;

/***/ })
/******/ ]);
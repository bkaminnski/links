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
/******/ 	return __webpack_require__(__webpack_require__.s = 4);
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

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var InputGroup = function (_React$Component) {
    _inherits(InputGroup, _React$Component);

    function InputGroup() {
        _classCallCheck(this, InputGroup);

        var _this = _possibleConstructorReturn(this, (InputGroup.__proto__ || Object.getPrototypeOf(InputGroup)).call(this));

        _this.onChange = _this.onChange.bind(_this);
        _this.shouldShowError = _this.shouldShowError.bind(_this);
        _this.state = {
            value: null,
            valid: false,
            touched: false
        };
        return _this;
    }

    _createClass(InputGroup, [{
        key: 'focus',
        value: function focus() {
            this.input.focus();
        }
    }, {
        key: 'showErrorAndFocus',
        value: function showErrorAndFocus() {
            var _this2 = this;

            this.setState({ touched: true }, function () {
                _this2.input.focus();
            });
        }
    }, {
        key: 'render',
        value: function render() {
            var _this3 = this;

            var inputGroupErrorClassName = this.shouldShowError() ? ' has-feedback has-error' : '';
            var ariaDescribedBy = this.props.id + this.shouldShowError() ? '-invalid-description' : '-label';
            var errorIcon = this.shouldShowError() ? _react2.default.createElement('span', { className: 'glyphicon glyphicon-remove form-control-feedback', 'aria-hidden': 'true' }) : null;
            var errorDescription = this.shouldShowError() ? _react2.default.createElement(
                'span',
                { id: this.props.id + '-invalid-description', className: 'sr-only' },
                'Invalid ',
                this.props.label
            ) : null;

            return _react2.default.createElement(
                'div',
                { className: 'input-group bottom-buffer' + inputGroupErrorClassName },
                _react2.default.createElement(
                    'span',
                    { className: 'input-group-addon' + (this.props.glyphicon != '' ? ' glyphicon ' + this.props.glyphicon : ''), id: this.props.id + '-label' },
                    this.props.label
                ),
                _react2.default.createElement('input', {
                    type: 'text',
                    ref: function ref(input) {
                        _this3.input = input;
                    },
                    onChange: this.onChange,
                    value: this.state.value == null ? this.props.initialValue : this.state.value,
                    className: 'form-control',
                    placeholder: this.props.placeholder,
                    'aria-describedby': ariaDescribedBy
                }),
                errorIcon,
                errorDescription
            );
        }
    }, {
        key: 'shouldShowError',
        value: function shouldShowError() {
            return !this.state.valid && this.state.touched;
        }
    }, {
        key: 'onChange',
        value: function onChange(e) {
            var _this4 = this;

            this.setState({ value: e.target.value, valid: this.props.validate(e), touched: true }, function () {
                _this4.props.onChange(_this4.props.attributeName, _this4.state.value, _this4.state.valid);
            });
        }
    }]);

    return InputGroup;
}(_react2.default.Component);

exports.default = InputGroup;

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _LoginPage = __webpack_require__(8);

var _LoginPage2 = _interopRequireDefault(_LoginPage);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var AuthenticationEvents = function () {
    function AuthenticationEvents() {
        _classCallCheck(this, AuthenticationEvents);
    }

    _createClass(AuthenticationEvents, [{
        key: 'subscribeToRequested',
        value: function subscribeToRequested() {
            var _this = this;

            this.authenticationRequestedSubscriptionToken = PubSub.subscribe('uiEvent.authentication.requested', function (msg) {
                _this.publishAvailable();
            });
        }
    }, {
        key: 'publishAvailable',
        value: function publishAvailable() {
            PubSub.publish('uiEvent.applicationLayout.available', React.createElement(_LoginPage2.default, null));
        }
    }]);

    return AuthenticationEvents;
}();

exports.default = AuthenticationEvents;

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var UsersClient = function () {
    function UsersClient() {
        _classCallCheck(this, UsersClient);
    }

    _createClass(UsersClient, [{
        key: "login",
        value: function login(username, password) {
            var result = new Promise(function (resolve, reject) {
                var request = new XMLHttpRequest();
                request.open("POST", '/users/resources/sessions');
                request.setRequestHeader("Content-type", "application/json");
                request.setRequestHeader("Accept", "*/*");
                request.withCredentials = true;
                request.onreadystatechange = function () {
                    if (request.readyState == 4 && (request.status == 204 || request.status == 401)) {
                        resolve(request);
                    }
                };
                request.send(JSON.stringify({
                    username: username,
                    password: password
                }));
            });
            return result;
        }
    }]);

    return UsersClient;
}();

exports.default = UsersClient;

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _AuthenticationEvents = __webpack_require__(2);

var _AuthenticationEvents2 = _interopRequireDefault(_AuthenticationEvents);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var authenticationEvents = new _AuthenticationEvents2.default();
authenticationEvents.subscribeToRequested();

// TODO: remove
authenticationEvents.publishAvailable();

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var AttributesStore = function () {
    function AttributesStore(formComponent) {
        _classCallCheck(this, AttributesStore);

        this.formComponent = formComponent;
        this.attributesComponents = {};
        this.keyPrefix = 0;
    }

    _createClass(AttributesStore, [{
        key: "initialState",
        value: function initialState() {
            this.keyPrefix++;
            return {
                attributes: {},
                allValid: false,
                keyPrefix: this.keyPrefix
            };
        }
    }, {
        key: "onChange",
        value: function onChange(attributeName, attributeValue, attributeValid) {
            var attributes = this.formComponent.state.attributes;
            attributes[attributeName].value = attributeValue;
            attributes[attributeName].valid = attributeValid;
            this.formComponent.setState({
                attributes: attributes,
                allValid: this.allAttributesAreValid()
            });
        }
    }, {
        key: "allAttributesAreValid",
        value: function allAttributesAreValid() {
            return !Object.values(this.formComponent.state.attributes).some(function (a) {
                return !a.valid;
            });
        }
    }, {
        key: "focusOnFirstInvalidAttributeComponent",
        value: function focusOnFirstInvalidAttributeComponent() {
            var _this = this;

            var attributes = this.formComponent.state.attributes;
            Object.keys(attributes).filter(function (a) {
                return !attributes[a].valid;
            }).map(function (a) {
                return _this.attributesComponents[a];
            }).some(function (ac) {
                ac.showErrorAndFocus();
                return true;
            });
        }
    }, {
        key: "addAttributeComponent",
        value: function addAttributeComponent(attributeName, attributeComponent) {
            this.attributesComponents[attributeName] = attributeComponent;
        }
    }]);

    return AttributesStore;
}();

exports.default = AttributesStore;

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

var _Username = __webpack_require__(10);

var _Username2 = _interopRequireDefault(_Username);

var _Password = __webpack_require__(9);

var _Password2 = _interopRequireDefault(_Password);

var _LoginFormStore = __webpack_require__(7);

var _LoginFormStore2 = _interopRequireDefault(_LoginFormStore);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var LoginForm = function (_React$Component) {
    _inherits(LoginForm, _React$Component);

    function LoginForm() {
        _classCallCheck(this, LoginForm);

        var _this = _possibleConstructorReturn(this, (LoginForm.__proto__ || Object.getPrototypeOf(LoginForm)).call(this));

        _this.store = new _LoginFormStore2.default(_this);
        _this.onChange = _this.onChange.bind(_this);
        _this.onSubmit = _this.onSubmit.bind(_this);
        return _this;
    }

    _createClass(LoginForm, [{
        key: 'render',
        value: function render() {
            var _this2 = this;

            return _react2.default.createElement(
                'div',
                { className: 'vertically-aligned with-shadow' },
                _react2.default.createElement(
                    'div',
                    { className: 'container', style: { maxWidth: '300px' } },
                    _react2.default.createElement(
                        'div',
                        { className: 'well well-lg' },
                        _react2.default.createElement(
                            'form',
                            { onSubmit: this.onSubmit },
                            _react2.default.createElement(_Username2.default, {
                                id: this.state.keyPrefix + '-username',
                                key: this.state.keyPrefix + '-username',
                                ref: function ref(login) {
                                    _this2.store.addAttributeComponent('username', login);
                                },
                                attributeName: 'username',
                                initialValue: '',
                                onChange: this.onChange
                            }),
                            _react2.default.createElement(_Password2.default, {
                                id: this.state.keyPrefix + '-password',
                                key: this.state.keyPrefix + '-password',
                                ref: function ref(login) {
                                    _this2.store.addAttributeComponent('password', login);
                                },
                                attributeName: 'password',
                                initialValue: '',
                                onChange: this.onChange
                            }),
                            _react2.default.createElement(
                                'div',
                                { className: 'text-right', role: 'group', 'aria-label': 'Add' },
                                _react2.default.createElement(
                                    'button',
                                    { type: 'submit', className: 'btn btn-default' },
                                    'Log In'
                                )
                            )
                        )
                    )
                )
            );
        }
    }, {
        key: 'onChange',
        value: function onChange(attributeName, attributeValue, attributeValid) {
            this.store.onChange(attributeName, attributeValue, attributeValid);
        }
    }, {
        key: 'onSubmit',
        value: function onSubmit(e) {
            e.preventDefault();
            if (this.store.allAttributesAreValid()) {
                this.store.login();
            } else {
                this.store.focusOnFirstInvalidAttributeComponent();
            }
        }
    }]);

    return LoginForm;
}(_react2.default.Component);

exports.default = LoginForm;

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _AttributesStore = __webpack_require__(5);

var _AttributesStore2 = _interopRequireDefault(_AttributesStore);

var _UsersClient = __webpack_require__(3);

var _UsersClient2 = _interopRequireDefault(_UsersClient);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var LoginFormStore = function () {
    function LoginFormStore(formComponent) {
        _classCallCheck(this, LoginFormStore);

        this.usersClient = new _UsersClient2.default();
        this.attributesStore = new _AttributesStore2.default(formComponent);
        this.formComponent = formComponent;
        this.formComponent.state = this.initialState();
    }

    _createClass(LoginFormStore, [{
        key: 'initialState',
        value: function initialState() {
            var initialState = this.attributesStore.initialState();
            initialState.attributes = {
                username: {
                    value: '',
                    valid: false
                },
                password: {
                    value: '',
                    valid: false
                }
            };
            return initialState;
        }
    }, {
        key: 'login',
        value: function login() {
            var _this = this;

            this.usersClient.login(this.formComponent.state.attributes.username.value, this.formComponent.state.attributes.password.value).then(function (response) {
                return _this.handleLoginResponse(response);
            });
        }
    }, {
        key: 'handleLoginResponse',
        value: function handleLoginResponse(response) {
            if (response.status == 204) {
                PubSub.publish('uiEvent.applicationLayout.requested');
            } else {
                PubSub.publish('uiEvent.authentication.requested');
            }
        }
    }, {
        key: 'onChange',
        value: function onChange(attributeName, attributeValue, attributeValid) {
            this.attributesStore.onChange(attributeName, attributeValue, attributeValid);
        }
    }, {
        key: 'addAttributeComponent',
        value: function addAttributeComponent(attributeName, attributeComponent) {
            this.attributesStore.addAttributeComponent(attributeName, attributeComponent);
        }
    }, {
        key: 'allAttributesAreValid',
        value: function allAttributesAreValid() {
            return this.attributesStore.allAttributesAreValid();
        }
    }, {
        key: 'focusOnFirstInvalidAttributeComponent',
        value: function focusOnFirstInvalidAttributeComponent() {
            this.attributesStore.focusOnFirstInvalidAttributeComponent();
        }
    }]);

    return LoginFormStore;
}();

exports.default = LoginFormStore;

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

var _LoginForm = __webpack_require__(6);

var _LoginForm2 = _interopRequireDefault(_LoginForm);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var LoginPage = function (_React$Component) {
    _inherits(LoginPage, _React$Component);

    function LoginPage() {
        _classCallCheck(this, LoginPage);

        return _possibleConstructorReturn(this, (LoginPage.__proto__ || Object.getPrototypeOf(LoginPage)).apply(this, arguments));
    }

    _createClass(LoginPage, [{
        key: 'render',
        value: function render() {
            return _react2.default.createElement(_LoginForm2.default, null);
        }
    }]);

    return LoginPage;
}(_react2.default.Component);

exports.default = LoginPage;

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

var _InputGroup = __webpack_require__(1);

var _InputGroup2 = _interopRequireDefault(_InputGroup);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Password = function (_React$Component) {
    _inherits(Password, _React$Component);

    function Password() {
        _classCallCheck(this, Password);

        var _this = _possibleConstructorReturn(this, (Password.__proto__ || Object.getPrototypeOf(Password)).call(this));

        _this.validate = _this.validate.bind(_this);
        return _this;
    }

    _createClass(Password, [{
        key: 'showErrorAndFocus',
        value: function showErrorAndFocus() {
            this.inputGroup.showErrorAndFocus();
        }
    }, {
        key: 'render',
        value: function render() {
            var _this2 = this;

            return _react2.default.createElement(_InputGroup2.default, {
                id: this.props.id,
                ref: function ref(inputGroup) {
                    _this2.inputGroup = inputGroup;
                },
                attributeName: this.props.attributeName,
                initialValue: this.props.initialValue,
                onChange: this.props.onChange,
                validate: this.validate,
                label: '',
                glyphicon: 'glyphicon-lock',
                placeholder: 'Password'
            });
        }
    }, {
        key: 'validate',
        value: function validate(e) {
            var password = e.target.value;
            return password != '';
        }
    }]);

    return Password;
}(_react2.default.Component);

exports.default = Password;

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

var _InputGroup = __webpack_require__(1);

var _InputGroup2 = _interopRequireDefault(_InputGroup);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Username = function (_React$Component) {
    _inherits(Username, _React$Component);

    function Username() {
        _classCallCheck(this, Username);

        var _this = _possibleConstructorReturn(this, (Username.__proto__ || Object.getPrototypeOf(Username)).call(this));

        _this.validate = _this.validate.bind(_this);
        return _this;
    }

    _createClass(Username, [{
        key: 'componentDidMount',
        value: function componentDidMount() {
            this.inputGroup.focus();
        }
    }, {
        key: 'showErrorAndFocus',
        value: function showErrorAndFocus() {
            this.inputGroup.showErrorAndFocus();
        }
    }, {
        key: 'render',
        value: function render() {
            var _this2 = this;

            return _react2.default.createElement(_InputGroup2.default, {
                id: this.props.id,
                ref: function ref(inputGroup) {
                    _this2.inputGroup = inputGroup;
                },
                attributeName: this.props.attributeName,
                initialValue: this.props.initialValue,
                onChange: this.props.onChange,
                validate: this.validate,
                label: '',
                glyphicon: 'glyphicon-user',
                placeholder: 'Username'
            });
        }
    }, {
        key: 'validate',
        value: function validate(e) {
            var username = e.target.value;
            return username != '';
        }
    }]);

    return Username;
}(_react2.default.Component);

exports.default = Username;

/***/ })
/******/ ]);
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.IconButton = exports.Button = void 0;

var _react = _interopRequireWildcard(require("react"));

var _reactFontawesome = require("@fortawesome/react-fontawesome");

var _tooltip = require("./tooltip.js");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

// styles from global.css on het.io
// button component
var Button =
/*#__PURE__*/
function (_Component) {
  _inherits(Button, _Component);

  // initialize component
  function Button() {
    var _this;

    _classCallCheck(this, Button);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(Button).call(this));
    _this.onClick = _this.onClick.bind(_assertThisInitialized(_this));
    _this.onMouseDown = _this.onMouseDown.bind(_assertThisInitialized(_this));
    _this.onMouseMove = _this.onMouseMove.bind(_assertThisInitialized(_this));
    _this.onMouseUp = _this.onMouseUp.bind(_assertThisInitialized(_this));
    return _this;
  } // when user clicks button


  _createClass(Button, [{
    key: "onClick",
    value: function onClick(event) {
      if (event.ctrlKey) {
        if (this.props.onCtrlClick) this.props.onCtrlClick();
      } else if (event.shiftKey) {
        if (this.props.onShiftClick) this.props.onShiftClick();
      } else if (this.props.onClick) this.props.onClick();
    } // when user presses down on button

  }, {
    key: "onMouseDown",
    value: function onMouseDown(event) {
      if (event.button === 0 && this.props.onMouseDown) this.props.onMouseDown(event);
    } // when user moves mouse across button

  }, {
    key: "onMouseMove",
    value: function onMouseMove(event) {
      if (this.props.onMouseMove) this.props.onMouseMove(event);
    } // when user releases button

  }, {
    key: "onMouseUp",
    value: function onMouseUp(event) {
      if (event.button === 0 && this.props.onMouseUp) this.props.onMouseUp(event);
    } // display component

  }, {
    key: "render",
    value: function render() {
      return _react.default.createElement(_tooltip.Tooltip, {
        text: this.props.tooltipText
      }, _react.default.createElement("button", {
        className: this.props.className || '',
        onClick: this.onClick,
        onMouseDown: this.onMouseDown,
        onMouseMove: this.onMouseMove,
        onMouseUp: this.onMouseUp,
        "data-disabled": this.props.disabled
      }, this.props.children));
    }
  }]);

  return Button;
}(_react.Component); // icon button component
// link colored button with text and icon to right
// icon gets the attribute data-checked to allow desired CSS styling


exports.Button = Button;

var IconButton =
/*#__PURE__*/
function (_Component2) {
  _inherits(IconButton, _Component2);

  function IconButton() {
    _classCallCheck(this, IconButton);

    return _possibleConstructorReturn(this, _getPrototypeOf(IconButton).apply(this, arguments));
  }

  _createClass(IconButton, [{
    key: "render",
    // display component
    value: function render() {
      return _react.default.createElement(Button, {
        className: (this.props.className || '') + ' blue small',
        tooltipText: this.props.tooltipText,
        onClick: this.props.onClick,
        onCtrlClick: this.props.onCtrlClick
      }, this.props.text && _react.default.createElement("span", null, this.props.text), _react.default.createElement(_reactFontawesome.FontAwesomeIcon, {
        icon: this.props.icon,
        "data-checked": this.props.checked
      }));
    }
  }]);

  return IconButton;
}(_react.Component);

exports.IconButton = IconButton;
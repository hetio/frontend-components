"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DynamicField = void 0;

var _react = _interopRequireWildcard(require("react"));

require("./dynamic-field.css");

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

// expandable textbox-like component, similar to excel spreadsheet cell
// when focused, field expands and prop "fullValue" displayed,
// otherwise, prop "value" displayed (often "fullValue" rounded off)
var DynamicField =
/*#__PURE__*/
function (_Component) {
  _inherits(DynamicField, _Component);

  // initialize component
  function DynamicField() {
    var _this;

    _classCallCheck(this, DynamicField);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(DynamicField).call(this));
    _this.state = {};
    _this.state.focused = false;
    _this.field = _react.default.createRef();
    _this.onClick = _this.onClick.bind(_assertThisInitialized(_this));
    _this.onBlur = _this.onBlur.bind(_assertThisInitialized(_this));
    _this.onFocus = _this.onFocus.bind(_assertThisInitialized(_this));
    _this.deselectAll = _this.deselectAll.bind(_assertThisInitialized(_this));
    _this.selectAll = _this.selectAll.bind(_assertThisInitialized(_this));
    _this.timer = null;
    return _this;
  } // when field is clicked or touched


  _createClass(DynamicField, [{
    key: "onClick",
    value: function onClick(event) {
      // force click on link in field if link was target of click
      if (event && event.target && event.target.tagName.toLowerCase() === 'a') event.target.click(); // force focus on field

      this.field.current.focus();
    } // when field loses focus

  }, {
    key: "onBlur",
    value: function onBlur() {
      this.setState({
        focused: false
      }, this.deselectAll); // clear any timer already going to select children

      window.clearTimeout(this.timer);
    } // when field is focused (tabbed to, clicked, etc)

  }, {
    key: "onFocus",
    value: function onFocus() {
      this.setState({
        focused: true
      }, this.selectAll);
    } // deselect any selected text in window

  }, {
    key: "deselectAll",
    value: function deselectAll() {
      window.getSelection().empty();
    } // select contents of field

  }, {
    key: "selectAll",
    value: function selectAll() {
      var _this2 = this;

      // set delay for select to make sure component has rendered
      this.timer = window.setTimeout(function () {
        if (document.activeElement === _this2.field.current) {
          window.getSelection().empty();
          window.getSelection().selectAllChildren(document.activeElement);
        }
      }, 10);
    } // display component

  }, {
    key: "render",
    value: function render() {
      var displayValue; // show full value if focused, or short value if not

      if (this.state.focused) displayValue = this.props.fullValue || this.props.value;else displayValue = this.props.value; // if value just text, set "nowrap" to truncate with ellipsis

      if (typeof displayValue === 'string') displayValue = _react.default.createElement("span", {
        className: "nowrap"
      }, displayValue);
      return _react.default.createElement("div", {
        ref: this.field,
        tabIndex: "0",
        onClick: this.onClick,
        onFocus: this.onFocus,
        onBlur: this.onBlur,
        className: 'dynamic_field ' + (this.props.className || ''),
        "data-expanded": this.state.focused
      }, displayValue);
    }
  }]);

  return DynamicField;
}(_react.Component);

exports.DynamicField = DynamicField;
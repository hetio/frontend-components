"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Tooltip = void 0;

var _react = _interopRequireWildcard(require("react"));

var _reactDom = _interopRequireDefault(require("react-dom"));

require("./tooltip.css");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; if (obj != null) { var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

// open delay in ms
var delay = 500; // //////////////////////////////////////////////////
// INPUT PROPS
// //////////////////////////////////////////////////
// text - string
// text to display in the tooltip
// //////////////////////////////////////////////////
// COMPONENT
// //////////////////////////////////////////////////
// tooltip (helper text) popup component

var Tooltip =
/*#__PURE__*/
function (_Component) {
  _inherits(Tooltip, _Component);

  // initialize component
  function Tooltip() {
    var _this;

    _classCallCheck(this, Tooltip);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(Tooltip).call(this));
    _this.state = {};
    _this.state.open = false;
    _this.state.x = 0;
    _this.state.y = 0;
    _this.state.opacity = 0;
    _this.onMouseEnter = _this.onMouseEnter.bind(_assertThisInitialized(_this));
    _this.onMouseLeave = _this.onMouseLeave.bind(_assertThisInitialized(_this));
    _this.openTooltip = _this.openTooltip.bind(_assertThisInitialized(_this));
    _this.timer = null;
    return _this;
  } // when component unmounts


  _createClass(Tooltip, [{
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      // cancel timer if component has unmounted
      window.clearTimeout(this.timer);
    } // when mouse enters target

  }, {
    key: "onMouseEnter",
    value: function onMouseEnter(event) {
      var _this2 = this;

      var target = event.currentTarget; // delay opening tooltip

      this.timer = window.setTimeout(function () {
        return _this2.openTooltip(target);
      }, delay); // track hover state

      this.setState({
        hover: true
      });
    } // when mouse leaves target

  }, {
    key: "onMouseLeave",
    value: function onMouseLeave() {
      this.setState({
        hover: false,
        open: false
      });
    } // open tooltip

  }, {
    key: "openTooltip",
    value: function openTooltip(target) {
      // if target not being hovered anymore, cancel open
      // if target not specified, exit
      if (!this.state.hover || !target) {
        this.setState({
          open: false
        });
        return;
      } // get x/y position of target to pass to tooltip popup


      var left = target.getBoundingClientRect().left + window.scrollX;
      var top = target.getBoundingClientRect().top + window.scrollY; // open tooltip and update x/y position

      this.setState({
        open: true,
        x: left,
        y: top
      });
    } // display component

  }, {
    key: "render",
    value: function render() {
      // if no specified text, skip attaching events and render
      if (!this.props.text) return _react.default.createElement(_react.default.Fragment, null, this.props.children); // mouse handler props to attach to children

      var props = {
        onMouseEnter: this.onMouseEnter,
        onMouseLeave: this.onMouseLeave
      }; // attach handler props to children

      var children = _react.default.Children.map(this.props.children, function (element) {
        // if element is react element, create clone with attached props
        if (_react.default.isValidElement(element)) return _react.default.cloneElement(element, props); // if element is text node, wrap in span and attach props
        else if (typeof element === 'string') return _react.default.createElement("span", props, element); // otherwise, pass element through untouched
          else return element;
      });

      return _react.default.createElement(_react.default.Fragment, null, children, this.state.open && _react.default.createElement(Popup, {
        text: this.props.text,
        open: this.state.open,
        x: this.state.x,
        y: this.state.y
      }));
    }
  }]);

  return Tooltip;
}(_react.Component); // popup component to display tooltip and text
// make React "portal" to append tooltip to body instead of parent
// (allows tooltip to pop out of containing elements like tables)


exports.Tooltip = Tooltip;

var Popup =
/*#__PURE__*/
function (_Component2) {
  _inherits(Popup, _Component2);

  function Popup() {
    _classCallCheck(this, Popup);

    return _possibleConstructorReturn(this, _getPrototypeOf(Popup).apply(this, arguments));
  }

  _createClass(Popup, [{
    key: "render",
    value: function render() {
      return _reactDom.default.createPortal(_react.default.createElement("div", {
        className: "tooltip",
        style: {
          left: this.props.x + 'px',
          top: this.props.y + 'px'
        }
      }, this.props.text), document.body);
    }
  }]);

  return Popup;
}(_react.Component);
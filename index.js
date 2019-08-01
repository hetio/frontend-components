"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "Table", {
  enumerable: true,
  get: function get() {
    return _table.Table;
  }
});
Object.defineProperty(exports, "DynamicField", {
  enumerable: true,
  get: function get() {
    return _dynamicField.DynamicField;
  }
});
Object.defineProperty(exports, "Button", {
  enumerable: true,
  get: function get() {
    return _buttons.Button;
  }
});

var _react = _interopRequireDefault(require("react"));

var _reactDom = require("react-dom");

var _testBed = require("./test-bed.js");

var _table = require("./components/table.js");

var _dynamicField = require("./components/dynamic-field.js");

var _buttons = require("./components/buttons.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(0, _reactDom.render)(_react.default.createElement(_testBed.TestBed, null), document.getElementById('root'));
"use strict";

var _react = _interopRequireDefault(require("react"));

var _reactDom = require("react-dom");

var _testBed = require("./test-bed.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// for testing the components. do not include in distribution build
// for testing the components. do not include in distribution build
(0, _reactDom.render)(_react.default.createElement(_testBed.TestBed, null), document.getElementById('root'));
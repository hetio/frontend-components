"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.InfoTable = void 0;

var _react = _interopRequireWildcard(require("react"));

var _tooltip = require("./tooltip.js");

var _dynamicField = require("./dynamic-field.js");

require("./info-table.css");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

// info table component
var InfoTable =
/*#__PURE__*/
function (_Component) {
  _inherits(InfoTable, _Component);

  function InfoTable() {
    _classCallCheck(this, InfoTable);

    return _possibleConstructorReturn(this, _getPrototypeOf(InfoTable).apply(this, arguments));
  }

  _createClass(InfoTable, [{
    key: "render",
    value: function render() {
      var rows = this.props.bodyContents.map(function (row, index) {
        return _react.default.createElement(_react.default.Fragment, {
          key: index
        }, _react.default.createElement(_tooltip.Tooltip, {
          text: row[1]
        }, _react.default.createElement("div", {
          className: "info_table_key small left light"
        }, row[0])), _react.default.createElement("div", {
          className: "info_table_value small left"
        }, _react.default.createElement(_dynamicField.DynamicField, {
          value: row[2],
          fullValue: row[3] === undefined ? row[2] : row[3]
        })));
      });
      return _react.default.createElement("div", {
        className: 'info_table ' + (this.props.className || '')
      }, rows);
    }
  }]);

  return InfoTable;
}(_react.Component);

exports.InfoTable = InfoTable;
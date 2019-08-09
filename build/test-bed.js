"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TestBed = void 0;

var _react = _interopRequireWildcard(require("react"));

var _buttons = require("./components/buttons.js");

var _reactFontawesome = require("@fortawesome/react-fontawesome");

var _freeSolidSvgIcons = require("@fortawesome/free-solid-svg-icons");

var _tooltip = require("./components/tooltip.js");

var _dynamicField = require("./components/dynamic-field.js");

var _table = require("./components/table.js");

var _infoTable = require("./components/info-table.js");

var _format = require("./util/format.js");

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

var TestBed =
/*#__PURE__*/
function (_Component) {
  _inherits(TestBed, _Component);

  function TestBed() {
    var _this;

    _classCallCheck(this, TestBed);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(TestBed).call(this));
    _this.state = {};
    _this.state.data = []; // generate random dummy table data

    for (var n = 0; n < 321; n++) {
      _this.state.data.push({
        checked: Math.random() > 0.75,
        text: (Math.random() > 0.5 ? 'Red' : 'Green') + (Math.random() > 0.5 ? 'Apple' : 'Grape') + String(1 + Math.floor(Math.random() * 99)),
        smallNumber: Math.random() > 0.05 ? Math.pow(Math.random(), 10) : 0,
        bigNumber: Math.floor(Math.random() * 100000),
        fruit: (Math.random() > 0.5 ? '🍎' : '🍇') + (Math.random() > 0.5 ? '🍎' : '🍇') + (Math.random() > 0.5 ? '🍎' : '🍇') + (Math.random() > 0.5 ? '🍎' : '🍇') + (Math.random() > 0.5 ? '🍎' : '🍇') + (Math.random() > 0.5 ? '🍎' : '🍇'),
        aHiddenField: (Math.random() > 0.5 ? 'Red' : 'Green') + (Math.random() > 0.5 ? 'Cat' : 'Dog')
      });
    }

    return _this;
  }

  _createClass(TestBed, [{
    key: "render",
    value: function render() {
      var _this2 = this;

      return _react.default.createElement(_react.default.Fragment, null, _react.default.createElement(_buttons.Button, {
        onClick: function onClick() {
          return console.log('button click');
        },
        onCtrlClick: function onCtrlClick() {
          return console.log('button ctrl+click');
        },
        onShiftClick: function onShiftClick() {
          return console.log('button shift+click');
        },
        tooltipText: "Generic button tooltip text"
      }, "Generic Button"), _react.default.createElement("br", null), _react.default.createElement("br", null), _react.default.createElement(_buttons.IconButton, {
        icon: _freeSolidSvgIcons.faStar,
        text: "Icon Button",
        tooltipText: "Icon button tooltip text"
      }), _react.default.createElement("br", null), _react.default.createElement("br", null), _react.default.createElement(_tooltip.Tooltip, {
        text: "Generic element tooltip"
      }, _react.default.createElement("span", null, "Generic element tooltip")), _react.default.createElement("br", null), _react.default.createElement("br", null), _react.default.createElement("span", {
        style: {
          display: 'inline-block',
          width: '200px'
        }
      }, _react.default.createElement(_dynamicField.DynamicField, {
        value: "Dynamic field",
        fullValue: "full/long value"
      })), _react.default.createElement("br", null), _react.default.createElement("br", null), _react.default.createElement("b", null, "Table"), _react.default.createElement("br", null), _react.default.createElement("i", null, this.state.data.length, " entries"), _react.default.createElement("br", null), _react.default.createElement("i", null, this.state.data.filter(function (datum) {
        return datum.checked;
      }).length, " starred"), _react.default.createElement(_table.Table, {
        data: this.state.data,
        fields: ['checked', 'text', 'smallNumber', 'bigNumber', 'fruit'],
        checkboxes: [true],
        sortables: [false, true, true, true, true],
        searchAllFields: true,
        sortFunction: function sortFunction(field) {
          // sort by number of apples
          if (field === 'fruit') {
            return function (a, b, key) {
              a = a[key];
              b = b[key]; // first by number of apples

              var aApples = (a.match(/🍎/g) || []).length;
              var bApples = (b.match(/🍎/g) || []).length;
              if (aApples < bApples) return -1;else if (aApples > bApples) return 1;else {
                // then alphabetically
                if (a < b) return -1;else if (a > b) return 1;else return 0;
              }
            };
          }
        },
        onChange: function onChange(newData) {
          return _this2.setState({
            data: newData
          });
        },
        defaultSortField: "bigNumber",
        defaultSortUp: false,
        topContents: [null, null, 'numbers', null],
        topStyles: [{
          width: 25
        }, {
          width: 150
        }, {
          width: 100
        }, {
          width: 100
        }, {
          width: 100
        }],
        topClasses: ['small', 'small', 'small'],
        topColspans: [1, 1, 2, 1],
        headContents: [_react.default.createElement(_reactFontawesome.FontAwesomeIcon, {
          className: "fa-xs",
          icon: _freeSolidSvgIcons.faStar
        }), 'Text', _react.default.createElement(_react.default.Fragment, null, "Small", _react.default.createElement("br", null), "Number"), _react.default.createElement(_react.default.Fragment, null, "Big", _react.default.createElement("br", null), "Number"), 'Fruit'],
        headClasses: ['center', 'small left', 'small center', 'small center', 'small center'],
        headTooltips: ['Starred', 'Text field', 'Small number field', 'Big number field', 'Sort by number of apples'],
        bodyContents: [_react.default.createElement(_reactFontawesome.FontAwesomeIcon, {
          className: "fa-xs",
          icon: _freeSolidSvgIcons.faStar
        }), function (datum, field, value) {
          return _react.default.createElement(_dynamicField.DynamicField, {
            value: value
          });
        }, function (datum, field, value) {
          return _react.default.createElement(_dynamicField.DynamicField, {
            value: (0, _format.toExponential)(value),
            fullValue: value
          });
        }, function (datum, field, value) {
          return _react.default.createElement(_dynamicField.DynamicField, {
            value: (0, _format.toComma)(value),
            fullValue: value
          });
        }, function (datum, field, value) {
          return _react.default.createElement(_dynamicField.DynamicField, {
            value: value
          });
        }],
        bodyStyles: [null, null, function (datum, field, value) {
          return {
            background: (0, _format.toGradient)(Math.log10(value), [[-25, 'rgba(3, 169, 244, 0.5)'], [-15, 'rgba(156, 39, 176, 0.5)'], [-5, 'rgba(233, 30, 99, 0.5)'], [0, 'rgba(255, 255, 255, 0)']])
          };
        }],
        bodyClasses: ['center', 'left', 'center', 'center', 'center'],
        bodyTooltips: [null, function (datum, field, value) {
          return value + ' is my username';
        }]
      }), _react.default.createElement("br", null), _react.default.createElement("br", null), _react.default.createElement("b", null, "Info Table"), _react.default.createElement("br", null), _react.default.createElement("br", null), _react.default.createElement(_infoTable.InfoTable, {
        headContent: "Info Table",
        bodyContents: [['dog breed', 'Tooltip describing the dog breed field', 'Labrador Labrador Labrador Labrador Labrador Labrador Labrador', 'labrador labrador labrador labrador labrador labrador labrador'], ['vegetable', 'Tooltip describing the vegetable field', 'Broccoli', 'broccoli'], ['vehicle', 'Tooltip describing the vehicle field', 'Truck', 'truck'], ['clothing', 'Tooltip describing the clothing field', 'Gloves', 'gloves'], ['planet', 'Tooltip describing the planet field', 'Jupiter', 'jupiter']]
      }));
    }
  }]);

  return TestBed;
}(_react.Component);

exports.TestBed = TestBed;
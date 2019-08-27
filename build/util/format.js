"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.toExponential = toExponential;
exports.toFixed = toFixed;
exports.toComma = toComma;
exports.toGradient = toGradient;

var _react = _interopRequireDefault(require("react"));

var _color = _interopRequireDefault(require("color"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

// get html of number in exponential form
function toExponential(value) {
  if (!isDefined(value)) return '-';
  if (!isNumber(value)) return value;
  var number = parseFloat(value).toExponential(1);
  var mantissa = parseFloat(number.split('e')[0]).toFixed(1);
  var exponent = parseInt(number.split('e')[1]);
  if (Number.isNaN(mantissa) || Number.isNaN(exponent)) return '-';
  return _react.default.createElement("span", null, mantissa, " \xD7 10", _react.default.createElement("sup", null, exponent));
} // get html of number in regular form, rounded to 1 decimal digit


function toFixed(value, precision) {
  if (!isDefined(value)) return '-';
  if (!isNumber(value)) return value;
  return parseFloat(value).toFixed(precision || 1);
} // split many-digit number by comma (or other, depending on locale)


function toComma(value) {
  if (!isDefined(value)) return '-';
  if (!isNumber(value)) return value;
  return Number(value).toLocaleString();
} // map number to css color based on specified gradient
// gradient should be in format [ ... , [number, 'rgba()'], ... ]
// values between gradient steps are linearly interpolated


function toGradient(value, gradient) {
  if (!isNumber(value) || !Array.isArray(gradient) || !gradient.length) return 'rgba(255, 255, 255, 0)';
  var number = Number(value); // sort gradient by number

  gradient.sort(function (a, b) {
    return a[0] - b[0];
  }); // if provided number is outside range of gradient, return boundary color

  if (number < gradient[0][0]) return gradient[0][1];
  if (number > gradient[gradient.length - 1][0]) return gradient[gradient.length - 1][1]; // find gradient entry below and above provided number

  var lowerIndex = 0;
  var upperIndex = gradient.length - 1;

  for (var index = 0; index < gradient.length - 1; index++) {
    if (gradient[index][0] <= number && gradient[index + 1][0] > number) {
      lowerIndex = index;
      upperIndex = index + 1;
      break;
    }
  } // get number and color below and above provided number


  var lowerNumber = gradient[lowerIndex][0];
  var lowerColor = (0, _color.default)(gradient[lowerIndex][1]);
  var upperNumber = gradient[upperIndex][0];
  var upperColor = (0, _color.default)(gradient[upperIndex][1]); // interpolate between below and above colors

  var percent = (number - lowerNumber) / (upperNumber - lowerNumber);
  var color = lowerColor.mix(upperColor, percent); // return color

  return color || 'rgba(255, 255, 255, 0)';
} // determine if value is a number


function isNumber(value) {
  // if number type
  if (typeof value === 'number') {
    // if NaN primitive, no
    if (Number.isNaN(value)) return false; // else, if regular number primitive, yes
    else return true;
  } // if not string type (undefined, null, object), no


  if (typeof value !== 'string') return false; // if string type, but empty string, no

  if (value === '') return false; // if string type and can be parsed as string, yes

  if (!Number.isNaN(Number(value))) return true; // otherwise, no

  return false;
} // determine if value is defined


function isDefined(value) {
  return !(value === '' || value === undefined || _typeof(value) === 'object' || typeof value === 'number' && String(value) === 'NaN');
}
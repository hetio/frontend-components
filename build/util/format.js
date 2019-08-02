"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.toExponential = toExponential;
exports.toFixed = toFixed;
exports.toComma = toComma;
exports.toGradient = toGradient;

var _react = _interopRequireDefault(require("react"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// get html of number in exponential form
function toExponential(number) {
  if (typeof number !== 'number') return '-';
  number = parseFloat(number).toExponential(1);
  var mantissa = parseFloat(number.split('e')[0]).toFixed(1);
  var exponent = parseInt(number.split('e')[1]);
  if (isNaN(mantissa) || isNaN(exponent)) return '-';
  return _react.default.createElement("span", null, mantissa, " \xD7 10", _react.default.createElement("sup", null, exponent));
} // get html of number in regular form, rounded to 1 decimal digit


function toFixed(number) {
  if (typeof number !== 'number') return '-';
  return _react.default.createElement("span", null, parseFloat(number).toFixed(1));
} // split many-digit number by comma (or other, depending on locale)


function toComma(number) {
  if (typeof number !== 'number') return '-';
  return Number(number).toLocaleString();
} // map number to css color based on specified gradient


function toGradient(number) {
  if (typeof number !== 'number') return 'rgba(255, 255, 255, 0)'; // pretty gradient

  var gradient = ['rgba(233, 30, 99, 0)', 'rgba(233, 30, 99, 0.35)', 'rgba(233, 30, 99, 0.5)']; // split each gradient color into component rgba values

  gradient = gradient.map(function (color) {
    color = color.split(/[^0-9,.]/).join('');
    color = {
      r: parseInt(color.split(',')[0]),
      g: parseInt(color.split(',')[1]),
      b: parseInt(color.split(',')[2]),
      a: parseFloat(color.split(',')[3])
    };
    return color;
  }); // take log of number
  // (equivalent of getting exponent of number in exponential notation)

  number = Math.log10(number); // start/end cutoffs for exponent

  var rangeStart = 0;
  var rangeEnd = -100; // get percent that number is through range

  var percent = (number - rangeStart) / (rangeEnd - rangeStart);
  percent = Math.min(Math.max(0, percent), 1); // map percent to float gradient index

  var gradientIndex = (gradient.length - 1) * percent; // get integer indices below/above float index

  var lowerColor = gradient[Math.floor(gradientIndex)];
  var higherColor = gradient[Math.ceil(gradientIndex)]; // get percent that float index is between nearest integer indices

  var percentBetween = gradientIndex % 1; // interpolate color between gradient colors below/above float index

  var color = {
    r: lowerColor.r + (higherColor.r - lowerColor.r) * percentBetween,
    g: lowerColor.g + (higherColor.g - lowerColor.g) * percentBetween,
    b: lowerColor.b + (higherColor.b - lowerColor.b) * percentBetween,
    a: lowerColor.a + (higherColor.a - lowerColor.a) * percentBetween
  }; // clean rgba values

  color.r = Math.floor(color.r);
  color.g = Math.floor(color.g);
  color.b = Math.floor(color.b);
  color.a = color.a.toFixed(3); // convert color in rgba format to css color string

  color = 'rgba(' + color.r + ', ' + color.g + ', ' + color.b + ', ' + color.a + ')'; // return color

  return color || 'rgba(255, 255, 255, 0)';
}
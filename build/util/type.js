"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getType = getType;

// get the "type" of a value as defined below
// 2 = pure number, or string that can be parsed as number
// 1 = string that cannot be parsed as number, eg a word
// 0 = undefined, null, object, array, NaN
function getType(value) {
  var number = 2;
  var string = 1;
  var missing = 0; // if pure number and not NaN

  if (typeof value === 'number' && !Number.isNaN(value)) return number; // if string

  if (typeof value === 'string') {
    // note: strings of just whitespace are unexpectedly parsed as 0
    // if can be parsed as number (and not incorrectly as 0)
    if (!Number.isNaN(Number(value)) && value.trim() !== '') return number; // otherwise, is string
    else return string;
  } // otherwise, is missing


  return missing;
}
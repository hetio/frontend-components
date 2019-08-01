"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.copyObject = copyObject;

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function copyObject(object) {
  if (_typeof(object) === 'object') return JSON.parse(JSON.stringify(object));else return object;
}
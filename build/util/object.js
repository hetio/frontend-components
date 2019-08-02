"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.transferObjectProps = transferObjectProps;
exports.copyObject = copyObject;
exports.compareObjects = compareObjects;

var _array = require("./array.js");

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

// loop through new array of objects. for each object, find object in old
// array that matches all compare keys, and transfer specified keys from
// old object to new
function transferObjectProps(oldArray, newArray, compareKeys, transferKeys) {
  var _iteratorNormalCompletion = true;
  var _didIteratorError = false;
  var _iteratorError = undefined;

  try {
    for (var _iterator = newArray[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
      var newElement = _step.value;
      var _iteratorNormalCompletion2 = true;
      var _didIteratorError2 = false;
      var _iteratorError2 = undefined;

      try {
        for (var _iterator2 = oldArray[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
          var oldElement = _step2.value;
          var matches = true;
          var _iteratorNormalCompletion3 = true;
          var _didIteratorError3 = false;
          var _iteratorError3 = undefined;

          try {
            for (var _iterator3 = compareKeys[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
              var compareKey = _step3.value;

              if (!(0, _array.compareElements)(oldElement[compareKey], newElement[compareKey])) {
                matches = false;
                break;
              }
            }
          } catch (err) {
            _didIteratorError3 = true;
            _iteratorError3 = err;
          } finally {
            try {
              if (!_iteratorNormalCompletion3 && _iterator3.return != null) {
                _iterator3.return();
              }
            } finally {
              if (_didIteratorError3) {
                throw _iteratorError3;
              }
            }
          }

          if (matches) {
            var _iteratorNormalCompletion4 = true;
            var _didIteratorError4 = false;
            var _iteratorError4 = undefined;

            try {
              for (var _iterator4 = transferKeys[Symbol.iterator](), _step4; !(_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done); _iteratorNormalCompletion4 = true) {
                var transferKey = _step4.value;
                newElement[transferKey] = oldElement[transferKey];
              }
            } catch (err) {
              _didIteratorError4 = true;
              _iteratorError4 = err;
            } finally {
              try {
                if (!_iteratorNormalCompletion4 && _iterator4.return != null) {
                  _iterator4.return();
                }
              } finally {
                if (_didIteratorError4) {
                  throw _iteratorError4;
                }
              }
            }
          }
        }
      } catch (err) {
        _didIteratorError2 = true;
        _iteratorError2 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion2 && _iterator2.return != null) {
            _iterator2.return();
          }
        } finally {
          if (_didIteratorError2) {
            throw _iteratorError2;
          }
        }
      }
    }
  } catch (err) {
    _didIteratorError = true;
    _iteratorError = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion && _iterator.return != null) {
        _iterator.return();
      }
    } finally {
      if (_didIteratorError) {
        throw _iteratorError;
      }
    }
  }

  return newArray;
} // make deep copy of object. ensures everything is clone/copy, not reference.
// works for everything except circular refs, functions, and js Dates


function copyObject(object) {
  if (_typeof(object) === 'object') return JSON.parse(JSON.stringify(object));else return object;
} // compare objects with stringify
// works for everything except circular refs, functions, and js Dates


function compareObjects(object1, object2) {
  // add some quick checks to short-circuit and save some time in certain cases
  if (_typeof(object1) !== _typeof(object2)) return false;else if (Array.isArray(object1) && Array.isArray(object2)) {
    if (object1.length !== object2.length) return false;

    for (var index = 0; index < object1.length; index++) {
      if (JSON.stringify(object1[index]) !== JSON.stringify(object2[index])) return false;
    }

    return true;
  } else return JSON.stringify(object1) === JSON.stringify(object2); // "brute force"/thorough compare
}
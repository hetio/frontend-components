"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Table = void 0;

var _react = _interopRequireWildcard(require("react"));

var _reactFontawesome = require("@fortawesome/react-fontawesome");

var _freeSolidSvgIcons = require("@fortawesome/free-solid-svg-icons");

var _buttons = require("./buttons.js");

var _tooltip = require("./tooltip.js");

var _object = require("../util/object.js");

require("./table.css");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var rowIndexKey = '_rowIndex';
var cellHighlightKey = '_cellHighlight'; // //////////////////////////////////////////////////
// INPUT PROPS
// //////////////////////////////////////////////////
// data - [{}]
// the data structure that will populate the table in the format:
// [ ... {pet: 'cat', num: 42, ... } , {pet: 'dog', num: 3.14, ... } ... ]
// fields - [string]
// keys from 'data' that will represent and determine the order of the columns
// containerClass - string
// the className to be applied to the div surrounding the <table> element
// className - string
// the className to be applied to the <table> element
// onChange - function
// called when a checkbox or group of checkboxes change state
// called with the arguments (newData)
// sortFunction - function
// called when data is sorted. called with the arguments (field)
// should return a comparison method for the javascript sort() function
// if it doesn't return a function, a default comparison method is used
// sortables - [boolean]
// whether or not to allow each column to be sortable
// checkboxes - [boolean]
// whether or not to treat each column as a checkbox field
// defaultSortField - string
// field to sort table by by default
// defaultSortUp - boolean
// whether or not to sort default field up by default
// defaultPerPage - number|string
// amount of row entries to show by default
// when per page value is string, all rows are shown
// perPages - [number|string]
// the options to provide for the per page dropdown
// dontResort - boolean
// whether or not to "preserve" row order when the input data changed but the
// number of rows didn't
// searchAllFields - boolean
// whether or not to search all the fields in the data object
// if false or omitted, only the displayed fields/columns are searched
// //////////////////////////////////////////////////
// topContents - [jsx]
// the text or other content to be displayed in the row above the head row
// topStyles - [{}]
// the style object to apply to each column of topContents
// topClasses - [string]
// the className to apply to each column of topContents
// topColspans - [number]
// the html colSpan attribute to apply to each column of topContents
// headContents - [jsx]
// the text or other content to be displayed in the head row
// headStyles - [{}]
// the style object to apply to each column
// headClasses - [string]
// the className to apply to each column
// headTooltips- [string]
// the tooltip text to display when hovering over each head cell
// //////////////////////////////////////////////////
// NOTE: The body input props below all accept either a static value or a
// function will be called with the arguments (datum, field, value) that
// should return a static value of the appropriate type.
// bodyContents - [jsx|function]
// the text or other content to be displayed for each row of data
// bodyStyles - [{}|function]
// the style object to apply to each column
// bodyClasses - [string|function]
// the className to apply to each column
// bodyTooltips - [string|function]
// the tooltip text to display when hovering over each body cell
// //////////////////////////////////////////////////
// NOTES
// //////////////////////////////////////////////////
// Certain items get html data- attributes to allow CSS styling:
// sort arrows - data-disabled
// checkboxes - data-checked
// search highlighted cells - data-highlighted
// page arrow buttons - data-disabled
// //////////////////////////////////////////////////
// COMPONENT
// //////////////////////////////////////////////////
// generic table component

var Table =
/*#__PURE__*/
function (_Component) {
  _inherits(Table, _Component);

  // initialize component
  function Table(props) {
    var _this;

    _classCallCheck(this, Table);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(Table).call(this, props)); // ref to table container

    _defineProperty(_assertThisInitialized(_this), "setHovered", function (hovered) {
      _this.setState({
        hovered: hovered
      });
    });

    _defineProperty(_assertThisInitialized(_this), "onKeyDown", function (event) {
      if (!_this.ref.current) return;
      if (!_this.state.hovered) return; // if user is hovering over table, let arrow keys control pagination nav

      if (event.key === 'ArrowLeft') {
        if (event.ctrlKey) _this.setPage(1);else _this.setPage(_this.state.page - 1);
      }

      if (event.key === 'ArrowRight') {
        if (event.ctrlKey) _this.setPage(_this.state.pages);else _this.setPage(_this.state.page + 1);
      }
    });

    _defineProperty(_assertThisInitialized(_this), "onMouseMove", function (event) {
      _this.setState({
        mouseX: event.clientX,
        mouseY: event.clientY
      });
    });

    _defineProperty(_assertThisInitialized(_this), "onMouseUp", function (event) {
      _this.endDrag(event);
    });

    _defineProperty(_assertThisInitialized(_this), "setData", function (data) {
      if (!_this.props.onChange) return;
      data = (0, _object.copyObject)(data); // remove under-the-hood keys from data before passing it to user

      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _iterator = data[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          var datum = _step.value;
          delete datum[rowIndexKey];
          delete datum[cellHighlightKey];
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

      _this.props.onChange(data);
    });

    _defineProperty(_assertThisInitialized(_this), "indexData", function (data) {
      data = (0, _object.copyObject)(data);
      var index = 0;
      var _iteratorNormalCompletion2 = true;
      var _didIteratorError2 = false;
      var _iteratorError2 = undefined;

      try {
        for (var _iterator2 = data[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
          var datum = _step2.value;
          datum[rowIndexKey] = index;
          index++;
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

      return data;
    });

    _defineProperty(_assertThisInitialized(_this), "sortData", function (data) {
      data = (0, _object.copyObject)(data); // get sort function from props or standard/default sort

      var func;
      if (_this.props.sortFunction) func = _this.props.sortFunction(_this.state.sortField);
      if (typeof func !== 'function') func = _this.defaultSort; // sort

      data.sort(function (a, b) {
        return func(a, b, _this.state.sortField, _this.state.sortUp);
      }); // reverse sort direction

      if (_this.state.sortUp) data.reverse();
      return data;
    });

    _defineProperty(_assertThisInitialized(_this), "defaultSort", function (a, b, key, sortUp) {
      // if both are numbers, compare by values
      if ((typeof a[key] === 'number' || !Number.isNaN(Number(a[key]))) && (typeof b[key] === 'number' || !Number.isNaN(Number(b[key])))) {
        if (Number(a[key]) < Number(b[key])) return -1;else if (Number(a[key]) > Number(b[key])) return 1;else return 0;
      } // if one is undefined/object and the other is not, always put the
      // undefined/object vertically below


      if ((typeof a[key] === 'undefined' || _typeof(a[key]) === 'object') && !(typeof b[key] === 'undefined' || _typeof(b[key]) === 'object')) return sortUp ? -1 : 1;
      if (!(typeof a[key] === 'undefined' || _typeof(a[key]) === 'object') && (typeof b[key] === 'undefined' || _typeof(b[key]) === 'object')) return sortUp ? 1 : -1; // otherwise, compare alphabetically

      if (a[key] < b[key]) return -1;else if (a[key] > b[key]) return 1;else return 0;
    });

    _defineProperty(_assertThisInitialized(_this), "preserveSortData", function (oldData, newData) {
      oldData = (0, _object.copyObject)(oldData);
      newData = (0, _object.copyObject)(newData);
      var returnData = [];
      var _iteratorNormalCompletion3 = true;
      var _didIteratorError3 = false;
      var _iteratorError3 = undefined;

      try {
        var _loop = function _loop() {
          var oldDatum = _step3.value;
          var index = newData.findIndex(function (newDatum) {
            return oldDatum[rowIndexKey] === newDatum[rowIndexKey];
          });

          if (index !== -1) {
            returnData.push(newData[index]);
            newData.splice(index, 1);
          }
        };

        for (var _iterator3 = oldData[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
          _loop();
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

      returnData = [].concat(_toConsumableArray(returnData), _toConsumableArray(newData));
      return returnData;
    });

    _defineProperty(_assertThisInitialized(_this), "filterData", function (data) {
      data = (0, _object.copyObject)(data);
      if (!_this.state.searchString) return data;
      return data.filter(function (datum) {
        var searchFields = _this.props.searchAllFields ? _this.props.fields.concat(Object.keys(datum)) : _this.props.fields;
        var _iteratorNormalCompletion4 = true;
        var _didIteratorError4 = false;
        var _iteratorError4 = undefined;

        try {
          for (var _iterator4 = searchFields[Symbol.iterator](), _step4; !(_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done); _iteratorNormalCompletion4 = true) {
            var field = _step4.value;

            if (String(JSON.stringify(datum[field])).toLowerCase().includes(_this.state.searchString.toLowerCase())) {
              datum[cellHighlightKey] = field;
              return true;
            }
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

        return false;
      });
    });

    _defineProperty(_assertThisInitialized(_this), "paginateData", function (data) {
      data = (0, _object.copyObject)(data);
      var start = 0;
      var end = data.length;

      if (typeof _this.state.perPage === 'number') {
        start = (_this.state.page - 1) * _this.state.perPage;
        end = start + _this.state.perPage;
      }

      return data.slice(start, end);
    });

    _defineProperty(_assertThisInitialized(_this), "toggleChecked", function (rowIndex, field) {
      var newData = (0, _object.copyObject)(_this.state.indexedData);
      var _iteratorNormalCompletion5 = true;
      var _didIteratorError5 = false;
      var _iteratorError5 = undefined;

      try {
        for (var _iterator5 = newData[Symbol.iterator](), _step5; !(_iteratorNormalCompletion5 = (_step5 = _iterator5.next()).done); _iteratorNormalCompletion5 = true) {
          var row = _step5.value;
          if (row[rowIndexKey] === rowIndex) row[field] = !row[field];
        }
      } catch (err) {
        _didIteratorError5 = true;
        _iteratorError5 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion5 && _iterator5.return != null) {
            _iterator5.return();
          }
        } finally {
          if (_didIteratorError5) {
            throw _iteratorError5;
          }
        }
      }

      _this.setData(newData);
    });

    _defineProperty(_assertThisInitialized(_this), "soloChecked", function (rowIndex, field) {
      var newData = (0, _object.copyObject)(_this.state.indexedData);
      var allOthersUnchecked = true;
      var _iteratorNormalCompletion6 = true;
      var _didIteratorError6 = false;
      var _iteratorError6 = undefined;

      try {
        for (var _iterator6 = newData[Symbol.iterator](), _step6; !(_iteratorNormalCompletion6 = (_step6 = _iterator6.next()).done); _iteratorNormalCompletion6 = true) {
          var row = _step6.value;

          if (row[rowIndexKey] !== rowIndex && row[field]) {
            allOthersUnchecked = false;
            break;
          }
        }
      } catch (err) {
        _didIteratorError6 = true;
        _iteratorError6 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion6 && _iterator6.return != null) {
            _iterator6.return();
          }
        } finally {
          if (_didIteratorError6) {
            throw _iteratorError6;
          }
        }
      }

      var _iteratorNormalCompletion7 = true;
      var _didIteratorError7 = false;
      var _iteratorError7 = undefined;

      try {
        for (var _iterator7 = newData[Symbol.iterator](), _step7; !(_iteratorNormalCompletion7 = (_step7 = _iterator7.next()).done); _iteratorNormalCompletion7 = true) {
          var _row = _step7.value;
          if (allOthersUnchecked || _row[rowIndexKey] === rowIndex) _row[field] = true;else _row[field] = false;
        }
      } catch (err) {
        _didIteratorError7 = true;
        _iteratorError7 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion7 && _iterator7.return != null) {
            _iterator7.return();
          }
        } finally {
          if (_didIteratorError7) {
            throw _iteratorError7;
          }
        }
      }

      _this.setData(newData);
    });

    _defineProperty(_assertThisInitialized(_this), "allChecked", function (field) {
      var _iteratorNormalCompletion8 = true;
      var _didIteratorError8 = false;
      var _iteratorError8 = undefined;

      try {
        for (var _iterator8 = _this.props.data[Symbol.iterator](), _step8; !(_iteratorNormalCompletion8 = (_step8 = _iterator8.next()).done); _iteratorNormalCompletion8 = true) {
          var datum = _step8.value;
          if (!datum[field]) return false;
        }
      } catch (err) {
        _didIteratorError8 = true;
        _iteratorError8 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion8 && _iterator8.return != null) {
            _iterator8.return();
          }
        } finally {
          if (_didIteratorError8) {
            throw _iteratorError8;
          }
        }
      }

      return true;
    });

    _defineProperty(_assertThisInitialized(_this), "allUnchecked", function (field) {
      var _iteratorNormalCompletion9 = true;
      var _didIteratorError9 = false;
      var _iteratorError9 = undefined;

      try {
        for (var _iterator9 = _this.props.data[Symbol.iterator](), _step9; !(_iteratorNormalCompletion9 = (_step9 = _iterator9.next()).done); _iteratorNormalCompletion9 = true) {
          var datum = _step9.value;
          if (datum[field]) return false;
        }
      } catch (err) {
        _didIteratorError9 = true;
        _iteratorError9 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion9 && _iterator9.return != null) {
            _iterator9.return();
          }
        } finally {
          if (_didIteratorError9) {
            throw _iteratorError9;
          }
        }
      }

      return true;
    });

    _defineProperty(_assertThisInitialized(_this), "toggleAll", function (field) {
      var newData = (0, _object.copyObject)(_this.props.data);

      var newChecked = _this.allUnchecked(field);

      var _iteratorNormalCompletion10 = true;
      var _didIteratorError10 = false;
      var _iteratorError10 = undefined;

      try {
        for (var _iterator10 = newData[Symbol.iterator](), _step10; !(_iteratorNormalCompletion10 = (_step10 = _iterator10.next()).done); _iteratorNormalCompletion10 = true) {
          var datum = _step10.value;
          datum[field] = newChecked;
        }
      } catch (err) {
        _didIteratorError10 = true;
        _iteratorError10 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion10 && _iterator10.return != null) {
            _iterator10.return();
          }
        } finally {
          if (_didIteratorError10) {
            throw _iteratorError10;
          }
        }
      }

      _this.setData(newData);
    });

    _defineProperty(_assertThisInitialized(_this), "beginDrag", function (field, newChecked) {
      _this.setState({
        dragField: field,
        dragValue: newChecked ? true : false
      });
    });

    _defineProperty(_assertThisInitialized(_this), "addToDragList", function (rowIndex) {
      if (!_this.state.dragList.includes(rowIndex)) _this.setState(function (state) {
        return {
          dragList: [].concat(_toConsumableArray(state.dragList), [rowIndex])
        };
      });
    });

    _defineProperty(_assertThisInitialized(_this), "endDrag", function () {
      if (!_this.state.dragField || typeof _this.state.dragValue !== 'boolean' || !_this.state.dragList.length) {
        _this.resetDrag();

        return;
      }

      var newData = (0, _object.copyObject)(_this.state.indexedData);
      var _iteratorNormalCompletion11 = true;
      var _didIteratorError11 = false;
      var _iteratorError11 = undefined;

      try {
        for (var _iterator11 = newData[Symbol.iterator](), _step11; !(_iteratorNormalCompletion11 = (_step11 = _iterator11.next()).done); _iteratorNormalCompletion11 = true) {
          var datum = _step11.value;
          if (_this.state.dragList.includes(datum[rowIndexKey])) datum[_this.state.dragField] = _this.state.dragValue;
        }
      } catch (err) {
        _didIteratorError11 = true;
        _iteratorError11 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion11 && _iterator11.return != null) {
            _iterator11.return();
          }
        } finally {
          if (_didIteratorError11) {
            throw _iteratorError11;
          }
        }
      }

      _this.setData(newData);

      _this.resetDrag();
    });

    _defineProperty(_assertThisInitialized(_this), "resetDrag", function () {
      _this.setState({
        dragField: null,
        dragValue: null,
        dragList: []
      });
    });

    _defineProperty(_assertThisInitialized(_this), "changeSort", function (field) {
      var newState = {};
      newState.sortField = field;
      if (field === _this.state.sortField) newState.sortUp = !_this.state.sortUp;else newState.sortUp = true;

      _this.setState(newState);
    });

    _defineProperty(_assertThisInitialized(_this), "onSearch", function (value) {
      _this.setState({
        searchString: value
      });
    });

    _defineProperty(_assertThisInitialized(_this), "setPage", function (page) {
      if (typeof page !== 'number') page = 1;
      page = Math.round(page);
      if (page < 1) page = 1;
      if (page > _this.state.pages) page = _this.state.pages;

      _this.setState({
        page: page
      });
    });

    _defineProperty(_assertThisInitialized(_this), "setPerPage", function (value) {
      if (typeof value !== 'number') {
        if (Number.isNaN(Number(value))) value = 'all';else value = Number(value);
      }

      _this.setState({
        perPage: value,
        page: 1
      });
    });

    _defineProperty(_assertThisInitialized(_this), "calcPages", function (data, perPage) {
      if (typeof perPage === 'number') return Math.ceil(data.length / perPage);else return 1;
    });

    _this.ref = _react.default.createRef();
    _this.state = {}; // input data at different stages in processing chain

    _this.state.indexedData = [];
    _this.state.sortedData = [];
    _this.state.filteredData = [];
    _this.state.paginatedData = []; // final data passed to children for render

    _this.state.data = []; // table control vars

    _this.state.hovered = false;
    _this.state.sortField = _this.props.defaultSortField || '';
    _this.state.sortUp = _this.props.defaultSortUp || false;
    _this.state.searchString = '';
    _this.state.searchResults = 0;
    _this.state.page = 1;
    _this.state.pages = 1;
    _this.state.perPages = _this.props.perPages || [5, 10, 15, 25, 50, 100, 500, 1000, 'all'];
    _this.state.perPage = _this.props.defaultPerPage || 10;
    _this.state.dragField = null;
    _this.state.dragValue = null;
    _this.state.dragList = []; // end checkbox drag when mouse released anywhere

    window.addEventListener('mousemove', _this.onMouseMove);
    window.addEventListener('keydown', _this.onKeyDown);
    window.addEventListener('mouseup', _this.onMouseUp);
    return _this;
  } // when component mounts


  _createClass(Table, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      var newState = {};
      newState.indexedData = this.indexData(this.props.data);
      newState.sortedData = this.sortData(newState.indexedData);
      newState.filteredData = this.filterData(newState.sortedData);
      newState.searchResults = newState.filteredData.length || 0;
      newState.paginatedData = this.paginateData(newState.filteredData);
      newState.pages = this.calcPages(newState.filteredData, this.state.perPage);
      newState.data = newState.paginatedData;
      this.setState(newState);
    } // when component updates

  }, {
    key: "componentDidUpdate",
    value: function componentDidUpdate(prevProps, prevState) {
      var newState = {}; // when input data changes

      if (!(0, _object.compareObjects)(this.props.data, prevProps.data) || !(0, _object.compareObjects)(this.props.fields, prevProps.fields)) {
        newState.indexedData = this.indexData(this.props.data); // if number of input data rows hasn't changed, assume none were added,
        // deleted, or reordered, and preserve previous sorting
        // assumes prevState.indexedData and newState.indexedData in same order

        if (this.props.dontResort && this.props.data.length === prevProps.data.length) {
          newState.sortedData = this.preserveSortData(prevState.sortedData, newState.indexedData);
        } else newState.sortedData = this.sortData(newState.indexedData);

        newState.filteredData = this.filterData(newState.sortedData);
        newState.searchResults = newState.filteredData.length || 0;
        newState.paginatedData = this.paginateData(newState.filteredData);
        newState.pages = this.calcPages(newState.filteredData, this.state.perPage);
        newState.data = newState.paginatedData;
      } // when sort column or direction changes


      if (this.state.sortField !== prevState.sortField || this.state.sortUp !== prevState.sortUp) {
        newState.sortedData = this.sortData(this.state.indexedData);
        newState.filteredData = this.filterData(newState.sortedData);
        newState.paginatedData = this.paginateData(newState.filteredData);
        newState.data = newState.paginatedData;
      } // when search string changes


      if (this.state.searchString !== prevState.searchString) {
        newState.filteredData = this.filterData(this.state.sortedData);
        newState.searchResults = newState.filteredData.length || 0;
        newState.paginatedData = this.paginateData(newState.filteredData);
        newState.pages = this.calcPages(newState.filteredData, this.state.perPage);
        newState.page = 1;
        newState.data = newState.paginatedData;
      } // when page controls change


      if (this.state.page !== prevState.page || this.state.perPage !== prevState.perPage) {
        newState.paginatedData = this.paginateData(this.state.filteredData);
        newState.pages = this.calcPages(this.state.filteredData, this.state.perPage);
        newState.data = newState.paginatedData;
      } // set new state, if any


      if (Object.keys(newState).length > 0) this.setState(newState);
    } // set hovered state

  }, {
    key: "render",
    // display component
    value: function render() {
      var _this2 = this;

      return _react.default.createElement(TableContext.Provider, {
        value: {
          // give props to TableContext that children components may need
          // mouse
          setHovered: this.setHovered,
          mouseX: this.state.mouseX,
          mouseY: this.state.mouseY,
          // checkbox
          dragField: this.state.dragField,
          dragValue: this.state.dragValue,
          // checkbox functions
          toggleChecked: this.toggleChecked,
          soloChecked: this.soloChecked,
          allChecked: this.allChecked,
          toggleAll: this.toggleAll,
          beginDrag: this.beginDrag,
          addToDragList: this.addToDragList,
          resetDrag: this.resetDrag,
          // sort
          sortField: this.state.sortField,
          sortUp: this.state.sortUp,
          changeSort: this.changeSort,
          // search
          searchString: this.state.searchString,
          searchResults: this.state.searchResults,
          onSearch: this.onSearch,
          // page
          page: this.state.page,
          pages: this.state.pages,
          perPage: this.state.perPage,
          setPage: this.setPage,
          setPerPage: this.setPerPage,
          // component input props
          data: this.state.data,
          fields: this.props.fields || [],
          checkboxes: this.props.checkboxes || [],
          sortables: this.props.sortables || [],
          perPages: this.state.perPages,
          topContents: this.props.topContents || [],
          topStyles: this.props.topStyles || [],
          topClasses: this.props.topClasses || [],
          topColspans: this.props.topColspans || [],
          headContents: this.props.headContents || [],
          headStyles: this.props.headStyles || [],
          headClasses: this.props.headClasses || [],
          headTooltips: this.props.headTooltips || [],
          bodyContents: this.props.bodyContents || [],
          bodyStyles: this.props.bodyStyles || [],
          bodyClasses: this.props.bodyClasses || [],
          bodyTooltips: this.props.bodyTooltips || []
        }
      }, _react.default.createElement("div", {
        className: this.props.containerClass || '',
        ref: this.ref,
        onMouseEnter: function onMouseEnter() {
          return _this2.setHovered(true);
        },
        onMouseLeave: function onMouseLeave() {
          return _this2.setHovered(false);
        }
      }, _react.default.createElement("table", {
        className: this.props.className || ''
      }, _react.default.createElement("thead", null, _react.default.createElement(Top, null), _react.default.createElement(Head, null)), _react.default.createElement("tbody", null, _react.default.createElement(Body, null)))), _react.default.createElement(Controls, null));
    }
  }]);

  return Table;
}(_react.Component);

exports.Table = Table;

var TableContext = _react.default.createContext({}); // top section
// row above head row


var Top =
/*#__PURE__*/
function (_Component2) {
  _inherits(Top, _Component2);

  function Top() {
    _classCallCheck(this, Top);

    return _possibleConstructorReturn(this, _getPrototypeOf(Top).apply(this, arguments));
  }

  _createClass(Top, [{
    key: "render",
    // display component
    value: function render() {
      var _this3 = this;

      var cells = this.context.topContents.map(function (content, index) {
        return _react.default.createElement(TopCell, {
          key: index,
          content: content,
          style: _this3.context.topStyles[index],
          className: _this3.context.topClasses[index],
          colspan: _this3.context.topColspans[index]
        });
      });
      if (cells.length > 0) return _react.default.createElement("tr", null, cells);else return _react.default.createElement(_react.default.Fragment, null);
    }
  }]);

  return Top;
}(_react.Component);

Top.contextType = TableContext; // top cell

var TopCell =
/*#__PURE__*/
function (_Component3) {
  _inherits(TopCell, _Component3);

  function TopCell() {
    _classCallCheck(this, TopCell);

    return _possibleConstructorReturn(this, _getPrototypeOf(TopCell).apply(this, arguments));
  }

  _createClass(TopCell, [{
    key: "render",
    // display component
    value: function render() {
      return _react.default.createElement("th", {
        style: this.props.style || {},
        className: this.props.className || '',
        colSpan: this.props.colspan || 1
      }, this.props.content);
    }
  }]);

  return TopCell;
}(_react.Component);

TopCell.contextType = TableContext; // head section
// contains sort buttons and field names

var Head =
/*#__PURE__*/
function (_Component4) {
  _inherits(Head, _Component4);

  function Head() {
    _classCallCheck(this, Head);

    return _possibleConstructorReturn(this, _getPrototypeOf(Head).apply(this, arguments));
  }

  _createClass(Head, [{
    key: "render",
    // display component
    value: function render() {
      var _this4 = this;

      var cells = this.context.fields.map(function (field, index) {
        var props = {
          key: index,
          field: field,
          content: _this4.context.headContents[index],
          style: _this4.context.headStyles[index],
          className: _this4.context.headClasses[index],
          tooltip: _this4.context.headTooltips[index]
        };
        if (_this4.context.checkboxes[index] && _this4.context.headContents[index]) return _react.default.createElement(HeadCheckboxCell, props);else if (_this4.context.sortables[index]) return _react.default.createElement(HeadSortableCell, props);else return _react.default.createElement(HeadCell, props);
      });
      if (cells.length > 0) return _react.default.createElement("tr", null, cells);else return _react.default.createElement(_react.default.Fragment, null);
    }
  }]);

  return Head;
}(_react.Component);

Head.contextType = TableContext; // head checkbox cell
// contains specified checkbox

var HeadCheckboxCell =
/*#__PURE__*/
function (_Component5) {
  _inherits(HeadCheckboxCell, _Component5);

  function HeadCheckboxCell() {
    _classCallCheck(this, HeadCheckboxCell);

    return _possibleConstructorReturn(this, _getPrototypeOf(HeadCheckboxCell).apply(this, arguments));
  }

  _createClass(HeadCheckboxCell, [{
    key: "render",
    // display component
    value: function render() {
      var _this5 = this;

      return _react.default.createElement(_tooltip.Tooltip, {
        text: this.props.tooltip || ''
      }, _react.default.createElement("th", {
        style: this.props.style || {},
        className: this.props.className || ''
      }, _react.default.createElement(_buttons.Button, {
        className: "table_button",
        onClick: function onClick() {
          return _this5.context.toggleAll(_this5.props.field);
        }
      }, _react.default.createElement("span", {
        "data-checked": this.context.allChecked(this.props.field) ? true : false
      }, this.props.content || ''))));
    }
  }]);

  return HeadCheckboxCell;
}(_react.Component);

HeadCheckboxCell.contextType = TableContext; // head sortable cell
// contains sort button

var HeadSortableCell =
/*#__PURE__*/
function (_Component6) {
  _inherits(HeadSortableCell, _Component6);

  function HeadSortableCell() {
    _classCallCheck(this, HeadSortableCell);

    return _possibleConstructorReturn(this, _getPrototypeOf(HeadSortableCell).apply(this, arguments));
  }

  _createClass(HeadSortableCell, [{
    key: "render",
    // display component
    value: function render() {
      var _this6 = this;

      var sortUp = true;
      if (this.props.field === this.context.sortField && !this.context.sortUp) sortUp = false;
      return _react.default.createElement(_tooltip.Tooltip, {
        text: this.props.tooltip || ''
      }, _react.default.createElement("th", {
        style: this.props.style || {},
        className: this.props.className || ''
      }, _react.default.createElement(_buttons.Button, {
        className: "table_button",
        onClick: function onClick() {
          return _this6.context.changeSort(_this6.props.field);
        }
      }, this.props.content || '', _react.default.createElement(_reactFontawesome.FontAwesomeIcon, {
        icon: sortUp ? _freeSolidSvgIcons.faSortAmountUp : _freeSolidSvgIcons.faSortAmountDownAlt,
        className: "fa-lg table_sort_icon",
        "data-disabled": this.props.field !== this.context.sortField
      }))));
    }
  }]);

  return HeadSortableCell;
}(_react.Component);

HeadSortableCell.contextType = TableContext; // plain head cell

var HeadCell =
/*#__PURE__*/
function (_Component7) {
  _inherits(HeadCell, _Component7);

  function HeadCell() {
    _classCallCheck(this, HeadCell);

    return _possibleConstructorReturn(this, _getPrototypeOf(HeadCell).apply(this, arguments));
  }

  _createClass(HeadCell, [{
    key: "render",
    // display component
    value: function render() {
      return _react.default.createElement(_tooltip.Tooltip, {
        text: this.props.tooltip || ''
      }, _react.default.createElement("th", {
        style: this.props.style || {},
        className: this.props.className || ''
      }, this.props.content || ''));
    }
  }]);

  return HeadCell;
}(_react.Component);

HeadSortableCell.contextType = TableContext; // body section
// contains actual data

var Body =
/*#__PURE__*/
function (_Component8) {
  _inherits(Body, _Component8);

  function Body() {
    _classCallCheck(this, Body);

    return _possibleConstructorReturn(this, _getPrototypeOf(Body).apply(this, arguments));
  }

  _createClass(Body, [{
    key: "render",
    // display component
    value: function render() {
      var rows = this.context.data.map(function (datum, index) {
        return _react.default.createElement(BodyRow, {
          key: index,
          datum: datum
        });
      });
      return _react.default.createElement(_react.default.Fragment, null, rows);
    }
  }]);

  return Body;
}(_react.Component);

Body.contextType = TableContext; // one row in body
// represents one datum of provided data

var BodyRow =
/*#__PURE__*/
function (_Component9) {
  _inherits(BodyRow, _Component9);

  function BodyRow() {
    _classCallCheck(this, BodyRow);

    return _possibleConstructorReturn(this, _getPrototypeOf(BodyRow).apply(this, arguments));
  }

  _createClass(BodyRow, [{
    key: "render",
    // display component
    value: function render() {
      var _this7 = this;

      var cells = this.context.fields.map(function (field, index) {
        var datum = _this7.props.datum;
        var value = datum[field]; // remove under-the-hood keys from data before passing it to user

        var cleanDatum = _this7.props.datum;
        delete cleanDatum[rowIndexKey];
        delete cleanDatum[cellHighlightKey]; // get the value of each item, either as pure value, or value returned
        // from a provided function

        var content = _this7.context.bodyContents[index];
        if (typeof content === 'function') content = content(cleanDatum, field, value);
        var style = _this7.context.bodyStyles[index];
        if (typeof style === 'function') style = style(cleanDatum, field, value);
        var className = _this7.context.bodyClasses[index];
        if (typeof className === 'function') className = className(cleanDatum, field, value);
        var tooltip = _this7.context.bodyTooltips[index];
        if (typeof tooltip === 'function') tooltip = tooltip(cleanDatum, field, value);
        var props = {
          key: index,
          datum: datum,
          field: field,
          value: value,
          content: content,
          style: style,
          className: className,
          tooltip: tooltip
        };
        if (_this7.context.checkboxes[index]) return _react.default.createElement(BodyCheckboxCell, props);else return _react.default.createElement(BodyCell, props);
      });
      return _react.default.createElement("tr", null, cells);
    }
  }]);

  return BodyRow;
}(_react.Component);

BodyRow.contextType = TableContext; // body checkbox cell
// contains checkbox for column whose head is also a checkbox

var BodyCheckboxCell =
/*#__PURE__*/
function (_Component10) {
  _inherits(BodyCheckboxCell, _Component10);

  // initialize component
  function BodyCheckboxCell() {
    var _this8;

    _classCallCheck(this, BodyCheckboxCell);

    _this8 = _possibleConstructorReturn(this, _getPrototypeOf(BodyCheckboxCell).call(this));
    _this8.state = {}; // temporary checked state for dragging

    _this8.state.tempChecked = null; // track previous y of mouse

    _this8.prevMouseY = 0;
    _this8.onCtrlClick = _this8.onCtrlClick.bind(_assertThisInitialized(_this8));
    _this8.onMouseDown = _this8.onMouseDown.bind(_assertThisInitialized(_this8));
    _this8.onMouseUp = _this8.onMouseUp.bind(_assertThisInitialized(_this8));
    window.addEventListener('mouseup', _this8.onMouseUp);
    _this8.ref = _react.default.createRef();
    return _this8;
  } // when component unmounts


  _createClass(BodyCheckboxCell, [{
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      window.removeEventListener('mouseup', this.onMouseUp);
    } // when component updates
    // fires when receiving new mouse position from context

  }, {
    key: "componentDidUpdate",
    value: function componentDidUpdate() {
      // if this column is the column being dragged
      if (this.context.dragField === this.props.field && typeof this.context.dragValue === 'boolean') {
        // if mouse passes by button vertically
        var bbox = this.ref.current.getBoundingClientRect();

        if (this.prevMouseY < bbox.top && this.context.mouseY >= bbox.top || this.prevMouseY > bbox.bottom && this.context.mouseY <= bbox.bottom) {
          // add self to drag list and temp check
          this.context.addToDragList(this.props.datum[rowIndexKey]);
          this.setState({
            tempChecked: this.context.dragValue
          });
        }
      } // track previous y of mouse


      this.prevMouseY = this.context.mouseY;
    } // on ctrl+click

  }, {
    key: "onCtrlClick",
    value: function onCtrlClick() {
      this.context.soloChecked(this.props.datum[rowIndexKey], this.props.field);
    } // on mouse down over button

  }, {
    key: "onMouseDown",
    value: function onMouseDown() {
      this.context.beginDrag(this.props.field, !this.props.value);
      this.context.addToDragList(this.props.datum[rowIndexKey]);
      this.setState({
        tempChecked: !this.props.value
      });
    } // on mouse up anywhere

  }, {
    key: "onMouseUp",
    value: function onMouseUp() {
      // reset temp checked state to nothing
      this.setState({
        tempChecked: null
      });
    } // display component

  }, {
    key: "render",
    value: function render() {
      var checked;
      if (typeof this.state.tempChecked === 'boolean') checked = this.state.tempChecked;else checked = this.props.value;
      return _react.default.createElement(_tooltip.Tooltip, {
        text: this.props.tooltip || ''
      }, _react.default.createElement("td", {
        style: this.props.style || {},
        className: this.props.className || '',
        ref: this.ref
      }, _react.default.createElement(_buttons.Button, {
        className: 'table_button',
        onCtrlClick: this.onCtrlClick,
        onMouseDown: this.onMouseDown
      }, _react.default.createElement("span", {
        "data-checked": checked ? true : false
      }, this.props.content || ''))));
    }
  }]);

  return BodyCheckboxCell;
}(_react.Component);

BodyCheckboxCell.contextType = TableContext; // body cell
// contains one piece of information from row/datum

var BodyCell =
/*#__PURE__*/
function (_Component11) {
  _inherits(BodyCell, _Component11);

  function BodyCell() {
    _classCallCheck(this, BodyCell);

    return _possibleConstructorReturn(this, _getPrototypeOf(BodyCell).apply(this, arguments));
  }

  _createClass(BodyCell, [{
    key: "render",
    // display component
    value: function render() {
      return _react.default.createElement(_tooltip.Tooltip, {
        text: this.props.tooltip || ''
      }, _react.default.createElement("td", {
        style: this.props.style || {},
        className: this.props.className || '',
        "data-highlighted": this.props.datum[cellHighlightKey] === this.props.field ? true : false
      }, this.props.content || ''));
    }
  }]);

  return BodyCell;
}(_react.Component);

BodyCell.contextType = TableContext; // controls section
// contains search, pagination, and more

var Controls =
/*#__PURE__*/
function (_Component12) {
  _inherits(Controls, _Component12);

  function Controls() {
    _classCallCheck(this, Controls);

    return _possibleConstructorReturn(this, _getPrototypeOf(Controls).apply(this, arguments));
  }

  _createClass(Controls, [{
    key: "render",
    // display component
    value: function render() {
      return _react.default.createElement("div", {
        className: "table_controls"
      }, _react.default.createElement(PerPage, null), _react.default.createElement(Nav, null), _react.default.createElement(Search, null));
    }
  }]);

  return Controls;
}(_react.Component); // page navigation component
// contains arrow buttons to previous/next pages, and X/N page info


var Nav =
/*#__PURE__*/
function (_Component13) {
  _inherits(Nav, _Component13);

  function Nav() {
    _classCallCheck(this, Nav);

    return _possibleConstructorReturn(this, _getPrototypeOf(Nav).apply(this, arguments));
  }

  _createClass(Nav, [{
    key: "render",
    // display component
    value: function render() {
      var _this9 = this;

      return _react.default.createElement("div", {
        className: "table_nav",
        onMouseEnter: function onMouseEnter() {
          return _this9.context.setHovered(true);
        },
        onMouseLeave: function onMouseLeave() {
          return _this9.context.setHovered(false);
        }
      }, _react.default.createElement(_buttons.Button, {
        tooltipText: "Go to first page",
        className: "table_nav_button",
        disabled: this.context.page <= 1,
        onClick: function onClick() {
          return _this9.context.setPage(1);
        }
      }, _react.default.createElement(_reactFontawesome.FontAwesomeIcon, {
        icon: _freeSolidSvgIcons.faAngleDoubleLeft,
        className: "fa-sm"
      })), _react.default.createElement(_buttons.Button, {
        tooltipText: "Go to previous page",
        className: "table_nav_button",
        disabled: this.context.page <= 1,
        onClick: function onClick() {
          return _this9.context.setPage(_this9.context.page - 1);
        }
      }, _react.default.createElement(_reactFontawesome.FontAwesomeIcon, {
        icon: _freeSolidSvgIcons.faAngleLeft,
        className: "fa-sm"
      })), _react.default.createElement(_tooltip.Tooltip, {
        text: "Pages"
      }, _react.default.createElement("span", null, this.context.page, " of ", this.context.pages || 1)), _react.default.createElement(_buttons.Button, {
        tooltipText: "Go to next page",
        className: "table_nav_button",
        disabled: this.context.page >= this.context.pages,
        onClick: function onClick() {
          return _this9.context.setPage(_this9.context.page + 1);
        }
      }, _react.default.createElement(_reactFontawesome.FontAwesomeIcon, {
        icon: _freeSolidSvgIcons.faAngleRight,
        className: "fa-sm"
      })), _react.default.createElement(_buttons.Button, {
        tooltipText: "Go to last page",
        className: "table_nav_button",
        disabled: this.context.page >= this.context.pages,
        onClick: function onClick() {
          return _this9.context.setPage(_this9.context.pages);
        }
      }, _react.default.createElement(_reactFontawesome.FontAwesomeIcon, {
        icon: _freeSolidSvgIcons.faAngleDoubleRight,
        className: "fa-sm"
      })));
    }
  }]);

  return Nav;
}(_react.Component);

Nav.contextType = TableContext; // per page component
// ie, show X entries per page

var PerPage =
/*#__PURE__*/
function (_Component14) {
  _inherits(PerPage, _Component14);

  function PerPage() {
    var _getPrototypeOf2;

    var _this10;

    _classCallCheck(this, PerPage);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this10 = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(PerPage)).call.apply(_getPrototypeOf2, [this].concat(args)));

    _defineProperty(_assertThisInitialized(_this10), "onChange", function (event) {
      if (event && event.target && _this10.context.setPerPage) _this10.context.setPerPage(event.target.value);
    });

    return _this10;
  }

  _createClass(PerPage, [{
    key: "render",
    // display component
    value: function render() {
      var _this11 = this;

      var options = this.context.perPages.map(function (entry, index) {
        return _react.default.createElement("option", {
          key: index,
          value: entry
        }, entry);
      });
      return _react.default.createElement("div", {
        className: "table_per_page",
        onMouseEnter: function onMouseEnter() {
          return _this11.context.setHovered(true);
        },
        onMouseLeave: function onMouseLeave() {
          return _this11.context.setHovered(false);
        }
      }, _react.default.createElement("div", {
        className: "table_input"
      }, _react.default.createElement(_tooltip.Tooltip, {
        text: "Rows to show per page"
      }, _react.default.createElement("select", {
        value: String(this.context.perPage),
        onChange: this.onChange
      }, options)), _react.default.createElement(_reactFontawesome.FontAwesomeIcon, {
        icon: _freeSolidSvgIcons.faListOl,
        className: "fa-sm"
      })));
    }
  }]);

  return PerPage;
}(_react.Component);

PerPage.contextType = TableContext; // search textbox component

var Search =
/*#__PURE__*/
function (_Component15) {
  _inherits(Search, _Component15);

  // intialize component
  function Search() {
    var _this12;

    _classCallCheck(this, Search);

    _this12 = _possibleConstructorReturn(this, _getPrototypeOf(Search).call(this));

    _defineProperty(_assertThisInitialized(_this12), "onInput", function (event) {
      if (event && event.target && _this12.context.onSearch) _this12.context.onSearch(event.target.value);
    });

    _defineProperty(_assertThisInitialized(_this12), "onClick", function () {
      _this12.ref.current.focus();

      _this12.ref.current.value = '';

      _this12.context.onSearch('');
    });

    _this12.ref = _react.default.createRef();
    return _this12;
  } // when user types into box


  _createClass(Search, [{
    key: "render",
    // display component
    value: function render() {
      return _react.default.createElement(_tooltip.Tooltip, {
        text: "Search table"
      }, _react.default.createElement("div", {
        className: "table_search"
      }, _react.default.createElement("div", {
        className: "table_input"
      }, _react.default.createElement("input", {
        ref: this.ref,
        type: "text",
        onInput: this.onInput
      }), !this.context.searchString && _react.default.createElement(_reactFontawesome.FontAwesomeIcon, {
        icon: _freeSolidSvgIcons.faSearch,
        className: "fa-sm"
      }), this.context.searchString && _react.default.createElement("button", {
        onClick: this.onClick
      }, _react.default.createElement(_reactFontawesome.FontAwesomeIcon, {
        icon: _freeSolidSvgIcons.faTimes,
        className: "fa-sm"
      }))), this.context.searchString && _react.default.createElement("span", null, this.context.searchResults, " results")));
    }
  }]);

  return Search;
}(_react.Component);

Search.contextType = TableContext;
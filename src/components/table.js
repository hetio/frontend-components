import React from 'react';
import { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleLeft } from '@fortawesome/free-solid-svg-icons';
import { faAngleDoubleLeft } from '@fortawesome/free-solid-svg-icons';
import { faAngleRight } from '@fortawesome/free-solid-svg-icons';
import { faAngleDoubleRight } from '@fortawesome/free-solid-svg-icons';
import { faSortAmountUp } from '@fortawesome/free-solid-svg-icons';
import { faSortAmountDownAlt } from '@fortawesome/free-solid-svg-icons';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { faListOl } from '@fortawesome/free-solid-svg-icons';

import { Button } from './buttons.js';
import { Tooltip } from './tooltip.js';
import { compareObjects } from '../util/object.js';
import { copyObject } from '../util/object.js';

import './table.css';

const rowIndexKey = '_rowIndex';
const cellHighlightKey = '_cellHighlight';

// //////////////////////////////////////////////////
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
export class Table extends Component {
  // initialize component
  constructor(props) {
    super(props);

    // ref to table container
    this.ref = React.createRef();

    this.state = {};

    // input data at different stages in processing chain
    this.state.indexedData = [];
    this.state.sortedData = [];
    this.state.filteredData = [];
    this.state.paginatedData = [];
    // final data passed to children for render
    this.state.data = [];

    // table control vars
    this.state.hovered = false;
    this.state.sortField = this.props.defaultSortField || '';
    this.state.sortUp = this.props.defaultSortUp || false;
    this.state.searchString = '';
    this.state.searchResults = 0;
    this.state.page = 1;
    this.state.pages = 1;
    this.state.perPages = this.props.perPages || [5, 10, 15, 25, 50, 100];
    this.state.perPage = this.props.defaultPerPage || 10;
    this.state.dragField = null;
    this.state.dragValue = null;
    this.state.dragList = [];

    // listen for key press anywhere to trigger keyboard shortcuts
    window.addEventListener('keydown', this.onKeyDown);
    // end checkbox drag when mouse released anywhere
    window.addEventListener('mouseup', this.onMouseUp);
  }

  // when component mounts
  componentDidMount() {
    const newState = {};

    newState.indexedData = this.indexData(this.props.data);
    newState.sortedData = this.sortData(newState.indexedData);
    newState.filteredData = this.filterData(newState.sortedData);
    newState.searchResults = newState.filteredData.length || 0;
    newState.paginatedData = this.paginateData(newState.filteredData);
    newState.pages = this.calcPages(newState.filteredData, this.state.perPage);
    newState.data = newState.paginatedData;

    this.setState(newState);
  }

  // when component updates
  componentDidUpdate(prevProps, prevState) {
    const newState = {};

    // when input data changes
    if (
      !compareObjects(this.props.data, prevProps.data) ||
      !compareObjects(this.props.fields, prevProps.fields)
    ) {
      newState.indexedData = this.indexData(this.props.data);
      // if number of input data rows hasn't changed, assume none were added,
      // deleted, or reordered, and preserve previous sorting
      // assumes prevState.indexedData and newState.indexedData in same order
      if (
        this.props.dontResort &&
        this.props.data.length === prevProps.data.length
      ) {
        newState.sortedData = this.preserveSortData(
          prevState.sortedData,
          newState.indexedData
        );
      } else
        newState.sortedData = this.sortData(newState.indexedData);
      newState.filteredData = this.filterData(newState.sortedData);
      newState.searchResults = newState.filteredData.length || 0;
      newState.paginatedData = this.paginateData(newState.filteredData);
      newState.pages = this.calcPages(
        newState.filteredData,
        this.state.perPage
      );
      newState.data = newState.paginatedData;
    }

    // when sort column or direction changes
    if (
      this.state.sortField !== prevState.sortField ||
      this.state.sortUp !== prevState.sortUp
    ) {
      newState.sortedData = this.sortData(this.state.indexedData);
      newState.filteredData = this.filterData(newState.sortedData);
      newState.paginatedData = this.paginateData(newState.filteredData);
      newState.data = newState.paginatedData;
    }

    // when search string changes
    if (this.state.searchString !== prevState.searchString) {
      newState.filteredData = this.filterData(this.state.sortedData);
      newState.searchResults = newState.filteredData.length || 0;
      newState.paginatedData = this.paginateData(newState.filteredData);
      newState.pages = this.calcPages(
        newState.filteredData,
        this.state.perPage
      );
      newState.page = 1;
      newState.data = newState.paginatedData;
    }

    // when page controls change
    if (
      this.state.page !== prevState.page ||
      this.state.perPage !== prevState.perPage
    ) {
      newState.paginatedData = this.paginateData(this.state.filteredData);
      newState.pages = this.calcPages(
        this.state.filteredData,
        this.state.perPage
      );
      newState.data = newState.paginatedData;
    }

    // set new state, if any
    if (Object.keys(newState).length > 0)
      this.setState(newState);
  }

  // when user presses key anywhere in window
  onKeyDown = (event) => {
    if (!this.ref.current)
      return;

    if (!this.state.hovered)
      return;

    // if user is hovering over table, let arrow keys control pagination nav
    if (event.key === 'ArrowLeft') {
      if (event.ctrlKey)
        this.setPage(1);
      else
        this.setPage(this.state.page - 1);
    }

    if (event.key === 'ArrowRight') {
      if (event.ctrlKey)
        this.setPage(this.state.pages);
      else
        this.setPage(this.state.page + 1);
    }
  };

  // when user releases mouse anywhere
  onMouseUp = (event) => {
    this.endDrag(event);
  };

  // //////////////////////////////////////////////////
  // DATA FUNCTIONS
  // //////////////////////////////////////////////////

  // call input onChange function with new data to set
  setData = (data) => {
    if (!this.props.onChange)
      return;

    data = copyObject(data);

    // remove under-the-hood keys from data before passing it to user
    for (const datum of data) {
      delete datum[rowIndexKey];
      delete datum[cellHighlightKey];
    }

    this.props.onChange(data);
  };

  // attach row index property to data for easy referencing/identification
  indexData = (data) => {
    data = copyObject(data);

    let index = 0;
    for (const datum of data) {
      datum[rowIndexKey] = index;
      index++;
    }

    return data;
  };

  // sort table data based on sort field and direction
  sortData = (data) => {
    data = copyObject(data);

    // get sort function from props or standard/default sort
    let func;
    if (this.props.sortFunction)
      func = this.props.sortFunction(this.state.sortField);
    if (typeof func !== 'function')
      func = this.defaultSort;

    // sort
    data.sort((a, b) => func(a, b, this.state.sortField, this.state.sortUp));

    // reverse sort direction
    if (this.state.sortUp)
      data.reverse();

    return data;
  };

  // compare function for sorting
  defaultSort = (a, b, key, sortUp) => {
    // if both are numbers, compare by values
    if (
      (typeof a[key] === 'number' || !Number.isNaN(Number(a[key]))) &&
      (typeof b[key] === 'number' || !Number.isNaN(Number(b[key])))
    ) {
      if (Number(a[key]) < Number(b[key]))
        return -1;
      else if (Number(a[key]) > Number(b[key]))
        return 1;
      else
        return 0;
    }

    // if one is undefined/object and the other is not, always put the
    // undefined/object vertically below
    if (
      (typeof a[key] === 'undefined' || typeof a[key] === 'object') &&
      !(typeof b[key] === 'undefined' || typeof b[key] === 'object')
    )
      return sortUp ? -1 : 1;
    if (
      !(typeof a[key] === 'undefined' || typeof a[key] === 'object') &&
      (typeof b[key] === 'undefined' || typeof b[key] === 'object')
    )
      return sortUp ? 1 : -1;

    // otherwise, compare alphabetically
    if (a[key] < b[key])
      return -1;
    else if (a[key] > b[key])
      return 1;
    else
      return 0;
  };

  // sort data in same order as it was before, based on index
  preserveSortData = (oldData, newData) => {
    oldData = copyObject(oldData);
    newData = copyObject(newData);

    let returnData = [];
    for (const oldDatum of oldData) {
      const index = newData.findIndex(
        (newDatum) => oldDatum[rowIndexKey] === newDatum[rowIndexKey]
      );
      if (index !== -1) {
        returnData.push(newData[index]);
        newData.splice(index, 1);
      }
    }

    returnData = [...returnData, ...newData];

    return returnData;
  };

  // filter table based on search textbox
  filterData = (data) => {
    data = copyObject(data);

    if (!this.state.searchString)
      return data;

    return data.filter((datum) => {
      const searchFields = this.props.searchAllFields
        ? this.props.fields.concat(Object.keys(datum))
        : this.props.fields;
      for (const field of searchFields) {
        if (
          String(JSON.stringify(datum[field]))
            .toLowerCase()
            .includes(this.state.searchString.toLowerCase())
        ) {
          datum[cellHighlightKey] = field;
          return true;
        }
      }
      return false;
    });
  };

  // paginate data based on page controls
  paginateData = (data) => {
    data = copyObject(data);

    let start = 0;
    let end = data.length;
    if (typeof this.state.perPage === 'number') {
      start = (this.state.page - 1) * this.state.perPage;
      end = start + this.state.perPage;
    }

    return data.slice(start, end);
  };

  // //////////////////////////////////////////////////
  // CHECKBOX FUNCTIONS
  // //////////////////////////////////////////////////

  // toggles checkbox on/off
  toggleChecked = (rowIndex, field) => {
    const newData = copyObject(this.state.indexedData);

    for (const row of newData) {
      if (row[rowIndexKey] === rowIndex)
        row[field] = !row[field];
    }

    this.setData(newData);
  };

  // solo checkbox (turn all others off)
  soloChecked = (rowIndex, field) => {
    const newData = copyObject(this.state.indexedData);

    let allOthersUnchecked = true;
    for (const row of newData) {
      if (row[rowIndexKey] !== rowIndex && row[field]) {
        allOthersUnchecked = false;
        break;
      }
    }

    for (const row of newData) {
      if (allOthersUnchecked || row[rowIndexKey] === rowIndex)
        row[field] = true;
      else
        row[field] = false;
    }

    this.setData(newData);
  };

  // checks whether all checkboxes are checked
  allChecked = (field) => {
    for (const datum of this.props.data) {
      if (!datum[field])
        return false;
    }

    return true;
  };

  // checks whether all checkboxes are unchecked
  allUnchecked = (field) => {
    for (const datum of this.props.data) {
      if (datum[field])
        return false;
    }

    return true;
  };

  // check or uncheck all checkboxes
  toggleAll = (field) => {
    const newData = copyObject(this.props.data);

    const newChecked = this.allUnchecked(field);
    for (const datum of newData)
      datum[field] = newChecked;

    this.setData(newData);
  };

  // begin dragging checkboxes
  beginDrag = (field, newChecked) => {
    this.setState({ dragField: field, dragValue: newChecked ? true : false });
  };

  // add row index to drag list
  addToDragList = (rowIndex) => {
    if (!this.state.dragList.includes(rowIndex))
      this.setState((state) => ({ dragList: [...state.dragList, rowIndex] }));
  };

  // end dragging checkboxes
  endDrag = () => {
    if (
      !this.state.dragField ||
      typeof this.state.dragValue !== 'boolean' ||
      !this.state.dragList.length
    ) {
      this.resetDrag();
      return;
    }

    const newData = copyObject(this.state.indexedData);

    for (const datum of newData) {
      if (this.state.dragList.includes(datum[rowIndexKey]))
        datum[this.state.dragField] = this.state.dragValue;
    }

    this.setData(newData);
    this.resetDrag();
  };

  // cancel dragging checkboxes
  resetDrag = () => {
    this.setState({ dragField: null, dragValue: null, dragList: [] });
  };

  // //////////////////////////////////////////////////
  // SORT FUNCTIONS
  // //////////////////////////////////////////////////

  // change which field table is sorted by
  changeSort = (field) => {
    const newState = {};
    newState.sortField = field;

    if (field === this.state.sortField)
      newState.sortUp = !this.state.sortUp;
    else
      newState.sortUp = true;

    this.setState(newState);
  };

  // //////////////////////////////////////////////////
  // SEARCH/FILTER FUNCTIONS
  // //////////////////////////////////////////////////

  // when user types into searchbox
  onSearch = (value) => {
    this.setState({ searchString: value });
  };

  // //////////////////////////////////////////////////
  // PAGE FUNCTIONS
  // //////////////////////////////////////////////////

  // set page number
  setPage = (page) => {
    if (typeof page !== 'number')
      page = 1;
    page = Math.round(page);
    if (page < 1)
      page = 1;
    if (page > this.state.pages)
      page = this.state.pages;

    this.setState({ page: page });
  };

  // set per page
  setPerPage = (value) => {
    if (typeof value !== 'number') {
      if (Number.isNaN(Number(value)))
        value = 'all';
      else
        value = Number(value);
    }

    this.setState({ perPage: value, page: 1 });
  };

  // calculate number of pages based on results and per page
  calcPages = (data, perPage) => {
    if (typeof perPage === 'number')
      return Math.ceil(data.length / perPage);
    else
      return 1;
  };

  // display component
  render() {
    return (
      <TableContext.Provider
        value={{
          // give props to TableContext that children components may need

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
        }}
      >
        <div
          className={this.props.containerClass || ''}
          ref={this.ref}
          onMouseEnter={() => this.setState({ hovered: true })}
          onMouseLeave={() => this.setState({ hovered: false })}
        >
          <table
            className={this.props.className || ''}
            onMouseMove={this.onMouseMove}
          >
            <thead>
              <Top />
              <Head />
            </thead>
            <tbody>
              <Body />
            </tbody>
          </table>
        </div>
        <Controls />
      </TableContext.Provider>
    );
  }
}
const TableContext = React.createContext({});

// top section
// row above head row
class Top extends Component {
  // display component
  render() {
    const cells = this.context.topContents.map((content, index) => (
      <TopCell
        key={index}
        content={content}
        style={this.context.topStyles[index]}
        className={this.context.topClasses[index]}
        colspan={this.context.topColspans[index]}
      />
    ));

    if (cells.length > 0)
      return <tr>{cells}</tr>;
    else
      return <></>;
  }
}
Top.contextType = TableContext;

// top cell
class TopCell extends Component {
  // display component
  render() {
    return (
      <th
        style={this.props.style || {}}
        className={this.props.className || ''}
        colSpan={this.props.colspan || 1}
      >
        {this.props.content}
      </th>
    );
  }
}
TopCell.contextType = TableContext;

// head section
// contains sort buttons and field names
class Head extends Component {
  // display component
  render() {
    const cells = this.context.fields.map((field, index) => {
      const props = {
        key: index,
        field: field,
        content: this.context.headContents[index],
        style: this.context.headStyles[index],
        className: this.context.headClasses[index],
        tooltip: this.context.headTooltips[index]
      };
      if (this.context.checkboxes[index] && this.context.headContents[index])
        return <HeadCheckboxCell {...props} />;
      else if (this.context.sortables[index])
        return <HeadSortableCell {...props} />;
      else
        return <HeadCell {...props} />;
    });

    if (cells.length > 0)
      return <tr>{cells}</tr>;
    else
      return <></>;
  }
}
Head.contextType = TableContext;

// head checkbox cell
// contains specified checkbox
class HeadCheckboxCell extends Component {
  // display component
  render() {
    return (
      <Tooltip text={this.props.tooltip || ''}>
        <th
          style={this.props.style || {}}
          className={this.props.className || ''}
        >
          <Button
            className='table_button'
            onClick={() => this.context.toggleAll(this.props.field)}
          >
            <span
              data-checked={
                this.context.allChecked(this.props.field) ? true : false
              }
            >
              {this.props.content || ''}
            </span>
          </Button>
        </th>
      </Tooltip>
    );
  }
}
HeadCheckboxCell.contextType = TableContext;

// head sortable cell
// contains sort button
class HeadSortableCell extends Component {
  // display component
  render() {
    let sortUp = true;
    if (this.props.field === this.context.sortField && !this.context.sortUp)
      sortUp = false;

    return (
      <Tooltip text={this.props.tooltip || ''}>
        <th
          style={this.props.style || {}}
          className={this.props.className || ''}
        >
          <Button
            className='table_button'
            onClick={() => this.context.changeSort(this.props.field)}
          >
            {this.props.content || ''}
            <FontAwesomeIcon
              icon={sortUp ? faSortAmountUp : faSortAmountDownAlt}
              className='fa-lg table_sort_icon'
              data-disabled={this.props.field !== this.context.sortField}
            />
          </Button>
        </th>
      </Tooltip>
    );
  }
}
HeadSortableCell.contextType = TableContext;

// plain head cell
class HeadCell extends Component {
  // display component
  render() {
    return (
      <Tooltip text={this.props.tooltip || ''}>
        <th
          style={this.props.style || {}}
          className={this.props.className || ''}
        >
          {this.props.content || ''}
        </th>
      </Tooltip>
    );
  }
}
HeadSortableCell.contextType = TableContext;

// body section
// contains actual data
class Body extends Component {
  // display component
  render() {
    const rows = this.context.data.map((datum, index) => (
      <BodyRow key={index} datum={datum} />
    ));
    return <>{rows}</>;
  }
}
Body.contextType = TableContext;

// one row in body
// represents one datum of provided data
class BodyRow extends Component {
  // display component
  render() {
    const cells = this.context.fields.map((field, index) => {
      const datum = this.props.datum;
      const value = datum[field];

      // remove under-the-hood keys from data before passing it to user
      const cleanDatum = copyObject(this.props.datum);
      delete cleanDatum[rowIndexKey];
      delete cleanDatum[cellHighlightKey];

      // get the value of each item, either as pure value, or value returned
      // from a provided function
      let content = this.context.bodyContents[index];
      if (typeof content === 'function')
        content = content(cleanDatum, field, value);
      let style = this.context.bodyStyles[index];
      if (typeof style === 'function')
        style = style(cleanDatum, field, value);
      let className = this.context.bodyClasses[index];
      if (typeof className === 'function')
        className = className(cleanDatum, field, value);
      let tooltip = this.context.bodyTooltips[index];
      if (typeof tooltip === 'function')
        tooltip = tooltip(cleanDatum, field, value);

      const props = {
        key: index,
        datum: datum,
        field: field,
        value: value,
        content: content,
        style: style,
        className: className,
        tooltip: tooltip
      };
      if (this.context.checkboxes[index])
        return <BodyCheckboxCell {...props} />;
      else
        return <BodyCell {...props} />;
    });
    return <tr>{cells}</tr>;
  }
}
BodyRow.contextType = TableContext;

// body checkbox cell
// contains checkbox for column whose head is also a checkbox
class BodyCheckboxCell extends Component {
  // initialize component
  constructor() {
    super();

    this.state = {};
    // temporary checked state for dragging
    this.state.tempChecked = null;

    this.onCtrlClick = this.onCtrlClick.bind(this);
    this.onMouseDown = this.onMouseDown.bind(this);
    this.onMouseMove = this.onMouseMove.bind(this);
    this.onMouseUp = this.onMouseUp.bind(this);

    this.ref = React.createRef();

    window.addEventListener('mouseup', this.onMouseUp);
  }

  // when component unmounts
  componentWillUnmount() {
    window.removeEventListener('mouseup', this.onMouseUp);
  }

  // on ctrl+click
  onCtrlClick() {
    this.context.soloChecked(this.props.datum[rowIndexKey], this.props.field);
  }

  // on mouse down over button
  onMouseDown() {
    this.context.beginDrag(this.props.field, !this.props.value);
    this.context.addToDragList(this.props.datum[rowIndexKey]);
    this.setState({ tempChecked: !this.props.value });
  }

  // on mouse move over button
  onMouseMove() {
    // if this column is the column being dragged
    if (
      this.context.dragField === this.props.field &&
      typeof this.context.dragValue === 'boolean'
    ) {
      // add self to drag list and temp check
      this.context.addToDragList(this.props.datum[rowIndexKey]);
      this.setState({ tempChecked: this.context.dragValue });
    }
  }

  // on mouse up anywhere
  onMouseUp() {
    // reset temp checked state to nothing
    this.setState({ tempChecked: null });
  }

  // display component
  render() {
    let checked;
    if (typeof this.state.tempChecked === 'boolean')
      checked = this.state.tempChecked;
    else
      checked = this.props.value;

    return (
      <Tooltip text={this.props.tooltip || ''}>
        <td
          style={this.props.style || {}}
          className={this.props.className || ''}
          ref={this.ref}
        >
          <Button
            className={'table_button'}
            onCtrlClick={this.onCtrlClick}
            onMouseDown={this.onMouseDown}
            onMouseMove={this.onMouseMove}
          >
            <span data-checked={checked ? true : false}>
              {this.props.content || ''}
            </span>
          </Button>
        </td>
      </Tooltip>
    );
  }
}
BodyCheckboxCell.contextType = TableContext;

// body cell
// contains one piece of information from row/datum
class BodyCell extends Component {
  // display component
  render() {
    return (
      <Tooltip text={this.props.tooltip || ''}>
        <td
          style={this.props.style || {}}
          className={this.props.className || ''}
          data-highlighted={
            this.props.datum[cellHighlightKey] === this.props.field
              ? true
              : false
          }
        >
          {this.props.content || ''}
        </td>
      </Tooltip>
    );
  }
}
BodyCell.contextType = TableContext;

// controls section
// contains search, pagination, and more
class Controls extends Component {
  // display component
  render() {
    return (
      <div className='table_controls'>
        <PerPage />
        <Nav />
        <Search />
      </div>
    );
  }
}

// page navigation component
// contains arrow buttons to previous/next pages, and X/N page info
class Nav extends Component {
  // display component
  render() {
    return (
      <div className='table_nav'>
        <Button
          tooltipText='Go to first page'
          className='table_nav_button'
          disabled={this.context.page <= 1}
          onClick={() => this.context.setPage(1)}
        >
          <FontAwesomeIcon icon={faAngleDoubleLeft} className='fa-sm' />
        </Button>
        <Button
          tooltipText='Go to previous page'
          className='table_nav_button'
          disabled={this.context.page <= 1}
          onClick={() => this.context.setPage(this.context.page - 1)}
        >
          <FontAwesomeIcon icon={faAngleLeft} className='fa-sm' />
        </Button>
        <Tooltip text='Pages'>
          <span>
            {this.context.page} of {this.context.pages || 1}
          </span>
        </Tooltip>
        <Button
          tooltipText='Go to next page'
          className='table_nav_button'
          disabled={this.context.page >= this.context.pages}
          onClick={() => this.context.setPage(this.context.page + 1)}
        >
          <FontAwesomeIcon icon={faAngleRight} className='fa-sm' />
        </Button>
        <Button
          tooltipText='Go to last page'
          className='table_nav_button'
          disabled={this.context.page >= this.context.pages}
          onClick={() => this.context.setPage(this.context.pages)}
        >
          <FontAwesomeIcon icon={faAngleDoubleRight} className='fa-sm' />
        </Button>
      </div>
    );
  }
}
Nav.contextType = TableContext;

// per page component
// ie, show X entries per page
class PerPage extends Component {
  // when selection changes
  onChange = (event) => {
    if (event && event.target && this.context.setPerPage)
      this.context.setPerPage(event.target.value);
  };

  // display component
  render() {
    const options = this.context.perPages.map((entry, index) => (
      <option key={index} value={entry}>
        {entry}
      </option>
    ));
    return (
      <div className='table_per_page'>
        <div className='table_input'>
          <Tooltip text='Rows to show per page'>
            <select
              value={String(this.context.perPage)}
              onChange={this.onChange}
            >
              {options}
            </select>
          </Tooltip>
          <FontAwesomeIcon icon={faListOl} className='fa-sm' />
        </div>
      </div>
    );
  }
}
PerPage.contextType = TableContext;

// search textbox component
class Search extends Component {
  // intialize component
  constructor() {
    super();

    this.ref = React.createRef();
  }
  // when user types into box
  onInput = (event) => {
    if (event && event.target && this.context.onSearch)
      this.context.onSearch(event.target.value);
  };

  // when user clicks button
  onClick = () => {
    this.ref.current.focus();
    this.ref.current.value = '';
    this.context.onSearch('');
  };

  // display component
  render() {
    return (
      <Tooltip text='Search table'>
        <div className='table_search'>
          <div className='table_input'>
            <input ref={this.ref} type='text' onInput={this.onInput} />
            {!this.context.searchString && (
              <FontAwesomeIcon icon={faSearch} className='fa-sm' />
            )}
            {this.context.searchString && (
              <button onClick={this.onClick}>
                <FontAwesomeIcon icon={faTimes} className='fa-sm' />
              </button>
            )}
          </div>
          {this.context.searchString && (
            <span>{this.context.searchResults} results</span>
          )}
        </div>
      </Tooltip>
    );
  }
}
Search.contextType = TableContext;

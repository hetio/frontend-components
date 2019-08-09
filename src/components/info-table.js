import React from 'react';
import { Component } from 'react';

import { Tooltip } from './tooltip.js';
import { DynamicField } from './dynamic-field.js';

import './info-table.css';

// info table component
export class InfoTable extends Component {
  render() {
    const rows = this.props.bodyContents.map((row, index) => (
      <React.Fragment key={index}>
        <Tooltip text={row[1] || ''}>
          <div className='info_table_key small left light semibold'>
            {row[0]}
          </div>
        </Tooltip>
        <div className='info_table_value small left'>
          <DynamicField
            value={row[2]}
            fullValue={row[3] === undefined ? row[2] : row[3]}
          />
        </div>
      </React.Fragment>
    ));
    return (
      <div className={'info_table ' + (this.props.className || '')}>{rows}</div>
    );
  }
}

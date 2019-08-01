import React from 'react';
import { Component } from 'react';

import { Button } from './components/buttons.js';
import { IconButton } from './components/buttons.js';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import { Tooltip } from './components/tooltip.js';
import { DynamicField } from './components/dynamic-field.js';
import { Table } from './components/table.js';
import { toExponential } from './util/format.js';
import { toGradient } from './util/format.js';
import { toComma } from './util/format.js';

export class TestBed extends Component {
  constructor() {
    super();

    this.state = {};

    this.state.data = [];

    // generate random dummy table data
    for (let n = 0; n < 4321; n++) {
      this.state.data.push({
        checked: Math.random() > 0.75,
        text:
          (Math.random() > 0.5 ? 'Red' : 'Green') +
          (Math.random() > 0.5 ? 'Apple' : 'Grape') +
          String(1 + Math.floor(Math.random() * 99)),
        smallNumber: Math.pow(Math.random(), 10),
        bigNumber: Math.floor(Math.random() * 100000),
        fruit:
          (Math.random() > 0.5 ? '🍎' : '🍇') +
          (Math.random() > 0.5 ? '🍎' : '🍇') +
          (Math.random() > 0.5 ? '🍎' : '🍇') +
          (Math.random() > 0.5 ? '🍎' : '🍇') +
          (Math.random() > 0.5 ? '🍎' : '🍇') +
          (Math.random() > 0.5 ? '🍎' : '🍇')
      });
    }
  }

  render() {
    return (
      <>
        {/* load global, site-wide styles from het.io */}
        <link
          rel="stylesheet"
          type="text/css"
          href="https://het.io/global.css"
        />
        <br />
        <br />
        <Button
          onClick={() => console.log('button click')}
          onCtrlClick={() => console.log('button ctrl+click')}
          tooltipText="Generic button tooltip text"
        >
          Generic Button
        </Button>
        <br />
        <br />
        <IconButton
          icon={faStar}
          text="Icon Button"
          tooltipText="Icon button tooltip text"
        />
        <br />
        <br />
        <Tooltip text="Generic element tooltip">
          <span>Generic element tooltip</span>
        </Tooltip>
        <br />
        <br />
        <span style={{ display: 'inline-block', width: '200px' }}>
          <DynamicField value="Dynamic field" fullValue="full/long value" />
        </span>
        <br />
        <br />
        <b>Table</b>
        <br />
        <i>{this.state.data.length} entries</i>
        <br />
        <i>{this.state.data.filter((datum) => datum.checked).length} starred</i>
        <Table
          data={this.state.data}
          sortFunction={(field) => {
            // sort by number of apples
            if (field === 'fruit') {
              return (a, b, key) => {
                a = a[key];
                b = b[key];
                // first by number of apples
                const aApples = (a.match(/🍎/g) || []).length;
                const bApples = (b.match(/🍎/g) || []).length;
                if (aApples < bApples)
                  return -1;
                else if (aApples > bApples)
                  return 1;
                else {
                  // then alphabetically
                  if (a < b)
                    return -1;
                  else if (a > b)
                    return 1;
                  else
                    return 0;
                }
              };
            }
          }}
          onChange={(newData) => this.setState({ data: newData })}
          defaultSortField="smallNumber"
          defaultSortUp={false}
          topContents={[null, null, 'numbers', null]}
          topStyles={[
            { width: 25 },
            { width: 150 },
            { width: 100 },
            { width: 100 },
            { width: 100 }
          ]}
          topClasses={['small', 'small', 'small']}
          topColspans={[1, 1, 2, 1]}
          headClasses={[null, 'small left', 'small', 'small', 'small']}
          headFields={['checked', 'text', 'smallNumber', 'bigNumber', 'fruit']}
          headTooltips={[
            'Starred',
            'Text field',
            'Small number field',
            'Big number field',
            'Sort by number of apples'
          ]}
          headContents={[
            <FontAwesomeIcon className="fa-xs" icon={faStar} />,
            'Text',
            'Small Number',
            'Big Number',
            'Fruit'
          ]}
          bodyValues={[
            null,
            null,
            (datum) => toExponential(datum.smallNumber),
            (datum) => toComma(datum.bigNumber)
          ]}
          bodyStyles={[
            null,
            null,
            (datum) => ({ background: toGradient(datum.smallNumber) })
          ]}
          bodyClasses={[null, 'left']}
          bodyTooltips={[null, (datum) => datum.text + ' is my username']}
        />
      </>
    );
  }
}
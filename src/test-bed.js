import React from 'react';
import { Component } from 'react';

import { Button } from './components/buttons.js';
import { IconButton } from './components/buttons.js';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import { Tooltip } from './components/tooltip.js';
import { DynamicField } from './components/dynamic-field.js';
import { Table } from './components/table.js';
import { InfoTable } from './components/info-table.js';
import { toExponential } from './util/format.js';
import { toGradient } from './util/format.js';
import { toComma } from './util/format.js';

export class TestBed extends Component {
  constructor() {
    super();

    this.state = {};

    this.state.data = [];

    // generate random dummy table data
    for (let n = 0; n < 321; n++) {
      this.state.data.push({
        checked: Math.random() > 0.75,
        text:
          (Math.random() > 0.5 ? 'Red' : 'Green') +
          (Math.random() > 0.5 ? 'Apple' : 'Grape') +
          String(1 + Math.floor(Math.random() * 99)),
        smallNumber: Math.random() > 0.05 ? Math.pow(Math.random(), 10) : 0,
        bigNumber: Math.floor(Math.random() * 100000),
        fruit:
          (Math.random() > 0.5 ? '🍎' : '🍇') +
          (Math.random() > 0.5 ? '🍎' : '🍇') +
          (Math.random() > 0.5 ? '🍎' : '🍇') +
          (Math.random() > 0.5 ? '🍎' : '🍇') +
          (Math.random() > 0.5 ? '🍎' : '🍇') +
          (Math.random() > 0.5 ? '🍎' : '🍇'),
        aHiddenField:
          (Math.random() > 0.5 ? 'Red' : 'Green') +
          (Math.random() > 0.5 ? 'Cat' : 'Dog')
      });
    }
  }

  render() {
    return (
      <>
        <Button
          onClick={() => console.log('button click')}
          onCtrlClick={() => console.log('button ctrl+click')}
          onShiftClick={() => console.log('button shift+click')}
          tooltipText='Generic button tooltip text'
        >
          Generic Button
        </Button>
        <br />
        <br />
        <IconButton
          icon={faStar}
          text='Icon Button'
          tooltipText='Icon button tooltip text'
          href="https://www.greenelab.com"
        />
        <br />
        <br />
        <Tooltip text='Generic element tooltip'>
          <span>Generic element tooltip</span>
        </Tooltip>
        <br />
        <br />
        <span style={{ display: 'inline-block', width: '200px' }}>
          <DynamicField value='Dynamic field' fullValue='full/long value' />
        </span>
        <br />
        <br />
        <b>Table</b>
        <br />
        <i>{this.state.data.length} entries</i>
        <br />
        <i>{this.state.data.filter((datum) => datum.checked).length} starred</i>
        <Table
          containerClass="table_container"
          data={this.state.data}
          fields={['checked', 'text', 'smallNumber', 'bigNumber', 'fruit']}
          checkboxes={[true]}
          sortables={[false, true, true, true, true]}
          searchAllFields={true}
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
          defaultSortField='bigNumber'
          defaultSortUp={false}
          topContents={[null, null, 'numbers', null]}
          topStyles={[
            { width: 25 },
            { width: 150 },
            { width: 200 },
            { width: 150 }
          ]}
          topClasses={['small', 'small', 'small']}
          topColspans={[1, 1, 2, 1]}
          headContents={[
            <FontAwesomeIcon className='fa-xs' icon={faStar} />,
            'Text',
            <>
              Small
              <br />
              Number
            </>,
            <>
              Big
              <br />
              Number
            </>,
            'Fruit'
          ]}
          headClasses={[
            'center',
            'small left',
            'small center',
            'small center',
            'small center'
          ]}
          headTooltips={[
            'Starred',
            'Text field',
            'Small number field',
            'Big number field',
            'Sort by number of apples'
          ]}
          bodyContents={[
            <FontAwesomeIcon className='fa-xs' icon={faStar} />,
            (datum, field, value) => <DynamicField value={value} />,
            (datum, field, value) => (
              <DynamicField value={toExponential(value)} fullValue={value} />
            ),
            (datum, field, value) => (
              <DynamicField value={toComma(value)} fullValue={value} />
            ),
            (datum, field, value) => <DynamicField value={value} />
          ]}
          bodyStyles={[
            null,
            null,
            (datum, field, value) => ({
              background: toGradient(Math.log10(value), [
                [-25, 'rgba(3, 169, 244, 0.5)'],
                [-15, 'rgba(156, 39, 176, 0.5)'],
                [-5, 'rgba(233, 30, 99, 0.5)'],
                [0, 'rgba(255, 255, 255, 0)']
              ])
            })
          ]}
          bodyClasses={['center', 'left', 'center', 'center', 'center']}
          bodyTooltips={[
            null,
            (datum, field, value) => value + ' is my username'
          ]}
        />
        <br />
        <br />
        <b>Info Table</b>
        <br />
        <br />
        <InfoTable
          headContent='Info Table'
          bodyContents={[
            [
              'dog breed',
              'Tooltip describing the dog breed field',
              'Labrador Labrador Labrador Labrador Labrador Labrador Labrador',
              'labrador labrador labrador labrador labrador labrador labrador'
            ],
            [
              'vegetable',
              'Tooltip describing the vegetable field',
              'Broccoli',
              'broccoli'
            ],
            [
              'vehicle',
              'Tooltip describing the vehicle field',
              'Truck',
              'truck'
            ],
            [
              'clothing',
              'Tooltip describing the clothing field',
              'Gloves',
              'gloves'
            ],
            [
              'planet',
              'Tooltip describing the planet field',
              'Jupiter',
              'jupiter'
            ]
          ]}
        />
      </>
    );
  }
}

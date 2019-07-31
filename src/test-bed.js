import React from 'react';
import { Component } from 'react';

import { Table } from './components/table.js';
import { DynamicField } from './components/dynamic-field.js';
import { Button } from './components/buttons.js';

export class TestBed extends Component {
  render() {
    return (
      <React.Fragment>
        <Table />
        <DynamicField />
        <Button />
      </React.Fragment>
    );
  }
}

import React from 'react';
import { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleLeft } from '@fortawesome/free-solid-svg-icons';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

import { Button } from './buttons.js';
import { DynamicField } from './dynamic-field.js';
import { copyObject } from '../util/object.js';

export class Table extends Component {
  render() {
    console.log(copyObject({ test: 'hello world' }));
    return (
      <div>
        <div>Table</div>
        <DynamicField />
        <DynamicField />
        <DynamicField />
        <Button />
        <Button />
        <Button />
        <FontAwesomeIcon icon={faSearch} />
        <FontAwesomeIcon icon={faTimes} />
        <FontAwesomeIcon icon={faAngleLeft} />
      </div>
    );
  }
}

import React from 'react';
import { render } from 'react-dom';

import { TestBed } from './test-bed.js';

import { Table } from './components/table.js';
import { DynamicField } from './components/dynamic-field.js';
import { Button } from './components/buttons.js';

export { Table };
export { DynamicField };
export { Button };

render(<TestBed />, document.getElementById('root'));

import React from 'react';
import { render } from 'react-dom';

import { TestBed } from './test-bed.js';

import { Button } from './components/buttons.js';
import { IconButton } from './components/buttons.js';
import { Tooltip } from './components/tooltip.js';
import { DynamicField } from './components/dynamic-field.js';
import { Table } from './components/table.js';
import { sortCustom } from './util/array.js';
import { compareElements } from './util/array.js';
import { compareArrays } from './util/array.js';
import { debug } from './util/debug.js';
import { downloadCsv } from './util/file.js';
import { downloadSvg } from './util/file.js';
import { toExponential } from './util/format.js';
import { toFixed } from './util/format.js';
import { toComma } from './util/format.js';
import { toGradient } from './util/format.js';
import { transferObjectProps } from './util/object.js';
import { copyObject } from './util/object.js';
import { compareObjects } from './util/object.js';
import { cutString } from './util/string.js';
import { shortenUrl } from './util/string.js';
import { makeFilenameFriendly } from './util/string.js';

export { Button };
export { IconButton };
export { Tooltip };
export { DynamicField };
export { Table };
export { sortCustom };
export { compareElements };
export { compareArrays };
export { debug };
export { downloadCsv };
export { downloadSvg };
export { toExponential };
export { toFixed };
export { toComma };
export { toGradient };
export { transferObjectProps };
export { copyObject };
export { compareObjects };
export { cutString };
export { shortenUrl };
export { makeFilenameFriendly };

if (!process.env.NODE_ENV || process.env.NODE_ENV === 'development')
  render(<TestBed />, document.getElementById('root'));

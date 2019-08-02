"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.debug = debug;

// show debug message on screen
// useful for mobile debugging where dev console isn't available
function debug() {
  var div = document.getElementById('_debug');

  if (!div) {
    div = document.createElement('div');
    div.id = '_debug';
    div.style.position = 'fixed';
    div.style.left = 0;
    div.style.top = 0;
    div.style.background = 'rgba(255, 255, 255, 0.75)';
    div.style.fontFamily = 'monospace';
    div.style.fontSize = '10px';
    div.style.color = '#ff00ff';
    div.style.zIndex = 99999;
    document.body.appendChild(div);
  }

  for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
    args[_key] = arguments[_key];
  }

  div.innerHTML += args.join(' | ');
  div.innerHTML += '<br>';
}
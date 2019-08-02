"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.downloadCsv = downloadCsv;
exports.downloadSvg = downloadSvg;

// downloads provided data as csv file
// data in format [ [A1, B1] , [A2, B2] ]
function downloadCsv(data, filename) {
  var fileContent = data.map(function (cell) {
    return cell.join(',');
  }).join('\n');
  var blob = new Blob(["\uFEFF", fileContent], {
    type: 'text/csv;charset=utf-8'
  });
  var url = window.URL.createObjectURL(blob);
  var link = document.createElement('a');
  document.body.appendChild(link);
  link.href = url;
  link.download = (filename || 'data') + '.csv';
  link.click();
  window.URL.revokeObjectURL(url);
  link.remove();
} // downloads provided data as svg file


function downloadSvg(data, filename) {
  var fileContent = new XMLSerializer().serializeToString(data);
  fileContent = fileContent.split('&amp;').join('&');
  var blob = new Blob([fileContent], {
    type: 'image/svg+xml'
  });
  var url = window.URL.createObjectURL(blob);
  var link = document.createElement('a');
  document.body.appendChild(link);
  link.href = url;
  link.download = (filename || 'data') + '.svg';
  link.click();
  window.URL.revokeObjectURL(url);
  link.remove();
}
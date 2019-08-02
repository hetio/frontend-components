"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.cutString = cutString;
exports.shortenUrl = shortenUrl;
exports.makeFilenameFriendly = makeFilenameFriendly;

// truncate string to character limit, insert ellipsis  if necessary
function cutString(string, n) {
  if (typeof string !== 'string') return '-';
  if (string.length <= n) return string;else return string.substring(0, n - 3) + '...';
} // remove unnecessary preceding "www." and etc from url


function shortenUrl(url) {
  var regexes = ['^http://', '^https://', '^www.'];

  for (var _i = 0, _regexes = regexes; _i < _regexes.length; _i++) {
    var regex = _regexes[_i];
    url = url.replace(new RegExp(regex), '');
  }

  return url;
} // make OS-friendly filename


function makeFilenameFriendly(string) {
  if (typeof string !== 'string') return '-'; // remove leading and trailing whitespace

  string = string.trim(); // replace special characters with dashes

  string = string.replace(/[^0-9A-Za-z]/gi, '-'); // shorten if too long

  string = string.substring(0, 15);
  return string;
}
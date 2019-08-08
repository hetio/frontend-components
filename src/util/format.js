import React from 'react';
import Color from 'color';

// get html of number in exponential form
export function toExponential(number) {
  if (typeof number !== 'number' && Number.isNaN(Number(number)))
    return '-';

  number = parseFloat(number).toExponential(1);
  const mantissa = parseFloat(number.split('e')[0]).toFixed(1);
  const exponent = parseInt(number.split('e')[1]);

  if (isNaN(mantissa) || isNaN(exponent))
    return '-';

  return (
    <span>
      {mantissa} &times; 10<sup>{exponent}</sup>
    </span>
  );
}

// get html of number in regular form, rounded to 1 decimal digit
export function toFixed(number, precision) {
  if (typeof number !== 'number' && Number.isNaN(Number(number)))
    return '-';
  return parseFloat(number).toFixed(precision || 1);
}

// split many-digit number by comma (or other, depending on locale)
export function toComma(number) {
  if (typeof number !== 'number' && Number.isNaN(Number(number)))
    return '-';
  return Number(number).toLocaleString();
}

// map number to css color based on specified gradient
// gradient should be in format [ ... , [number, 'rgba()'], ... ]
// values between gradient steps are linearly interpolated
export function toGradient(number, gradient) {
  // check inputs
  if (
    (typeof number !== 'number' && Number.isNaN(Number(number))) ||
    !Array.isArray(gradient) ||
    !gradient.length
  )
    return 'rgba(255, 255, 255, 0)';

  // sort gradient by number
  gradient.sort((a, b) => a[0] - b[0]);

  // if provided number is outside range of gradient, return boundary color
  if (number < gradient[0][0])
    return gradient[0][1];
  if (number > gradient[gradient.length - 1][0])
    return gradient[gradient.length - 1][1];

  // find gradient entry below and above provided number
  let lowerIndex = 0;
  let upperIndex = gradient.length - 1;
  for (let index = 0; index < gradient.length - 1; index++) {
    if (gradient[index][0] <= number && gradient[index + 1][0] > number) {
      lowerIndex = index;
      upperIndex = index + 1;
      break;
    }
  }

  // get number and color below and above provided number
  const lowerNumber = gradient[lowerIndex][0];
  const lowerColor = Color(gradient[lowerIndex][1]);
  const upperNumber = gradient[upperIndex][0];
  const upperColor = Color(gradient[upperIndex][1]);

  // interpolate between below and above colors
  const percent = (number - lowerNumber) / (upperNumber - lowerNumber);
  const color = lowerColor.mix(upperColor, percent);

  // return color
  return color || 'rgba(255, 255, 255, 0)';
}

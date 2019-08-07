import React from 'react';

// get html of number in exponential form
export function toExponential(number) {
  if (typeof number !== 'number')
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
  if (typeof number !== 'number')
    return '-';
  return parseFloat(number).toFixed(precision || 1);
}

// split many-digit number by comma (or other, depending on locale)
export function toComma(number) {
  if (typeof number !== 'number')
    return '-';
  return Number(number).toLocaleString();
}

// map number to css color based on specified gradient
// gradient should be an array of rgba() CSS color strings
export function toGradient(number, min, max, gradient) {
  // check inputs
  if (typeof number !== 'number')
    return 'rgba(255, 255, 255, 0)';
  if (!Array.isArray(gradient) || !gradient.length)
    gradient = ['rgba(255, 255, 255, 0)'];
  if (typeof min !== 'number')
    min = 0;
  if (typeof max !== 'number')
    max = 100;
  if (min > max) {
    const temp = max;
    max = min;
    min = temp;
  }
  if (number < min)
    return gradient[0];
  if (number > max)
    return gradient[gradient.length - 1];

  // get percent that number is through range
  let percent = 0;
  if (max - min !== 0)
    percent = Math.abs((number - min) / (max - min));
  percent = Math.min(Math.max(0, percent), 1);

  // split each gradient color into component rgba values
  gradient = gradient.map((color) => {
    color = String(color)
      .split(/[^0-9,.]/)
      .join('');
    color = {
      r: parseInt(color.split(',')[0] || 255),
      g: parseInt(color.split(',')[1] || 255),
      b: parseInt(color.split(',')[2] || 255),
      a: parseFloat(color.split(',')[3] || 0)
    };
    return color;
  });

  // map percent to float gradient index
  const gradientIndex = (gradient.length - 1) * percent;
  // get integer indices below/above float index
  const lowerColor = gradient[Math.floor(gradientIndex)];
  const higherColor = gradient[Math.ceil(gradientIndex)];
  // get percent that float index is between nearest integer indices
  const percentBetween = gradientIndex % 1;

  // interpolate color between gradient colors below/above float index
  let color = {
    r: lowerColor.r + (higherColor.r - lowerColor.r) * percentBetween,
    g: lowerColor.g + (higherColor.g - lowerColor.g) * percentBetween,
    b: lowerColor.b + (higherColor.b - lowerColor.b) * percentBetween,
    a: lowerColor.a + (higherColor.a - lowerColor.a) * percentBetween
  };

  // clean rgba values
  color.r = Math.floor(color.r);
  color.g = Math.floor(color.g);
  color.b = Math.floor(color.b);
  color.a = color.a.toFixed(3);

  // convert color in rgba format to css color string
  color =
    'rgba(' + color.r + ', ' + color.g + ', ' + color.b + ', ' + color.a + ')';

  // return color
  return color || 'rgba(255, 255, 255, 0)';
}

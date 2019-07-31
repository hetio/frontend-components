export function copyObject(object) {
  if (typeof object === 'object')
    return JSON.parse(JSON.stringify(object));
  else
    return object;
}

/**
 * Create an object and its properties based on the string parameter
 * @param {String} nsString String that will create the object
 * E.g. namespace('Pokemon.Charizard');
 * @return {Object} The object with its properties.
 */
export function namespace(nsString) {
  let parts = nsString.split('.');
  let parents;
  let i = 1;
  let len = parts.length;

  if (!window.hasOwnProperty(parts[0])) {
    window[parts[0]] = {};
  }

  parent = window[parts[0]];

  for (; i < len; i += 1) {
    if (typeof parent[parts[i]] === 'undefined') {
      parent[parts[i]] = {};
    }

    parent = parent[parts[i]];
  }

  return parent;
}

/*Write a Javascript function camelCase that converts given input strings into camel case. 
Make sure to remove any spaces, numbers or symbols in between except for $ which you should
 use to break down the sentence into words, convert to camel case and then remove it. Handle
  edge cases like undefined or nullvalues. For example, 
  camelCase(′hEllo$tHis$is$a/!$example$1sentence') should return 
  'helloThisIsAExampleSentence' */

/**
 * Convert input to camelCase using `$` as primary separator.
 * Removes any spaces, numbers or symbols in between (except `$`),
 * normalizes unicode and handles null/undefined.
 */
function camelCase(input) {
  if (input === null || input === undefined) return '';
  let str = String(input).trim();
  if (!str) return '';

  if (str.normalize) {
    try { str = str.normalize('NFKD').replace(/\p{M}/gu, ''); } catch (e) {}
  }

  // If dollar present, use it to split words; otherwise split on non-letters
  const rawParts = str.includes('$') ? str.split('$') : str.split(/[^\p{L}]+/u);
  const parts = rawParts.map(p => (p || '').replace(/[^\p{L}]+/gu, '')).filter(Boolean);
  if (parts.length === 0) return '';

  const first = parts[0].toLowerCase();
  const rest = parts.slice(1).map(w => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase());
  return [first, ...rest].join('');
}



/*Create a function that converts strings to dot.case format */

/**
 * Convert input to lower dot.case
 * - Normalize unicode (remove diacritics)
 * - Treat spaces, hyphens, underscores, periods and any non-alphanumeric as separators
 * - Insert separators for camelCase boundaries
 * - Collapse multiple separators and trim edges
 * - Preserve numbers inside words
 */
function dotCase(input) {
  if (input === null || input === undefined) return '';
  let str = String(input).trim();
  if (!str) return '';

  if (str.normalize) {
    try { str = str.normalize('NFKD').replace(/\p{M}/gu, ''); } catch (e) {}
  }

  // Insert dot between camelCase boundaries (e.g. userID -> user.ID)
  str = str.replace(/([a-z0-9])([A-Z])/g, '$1.$2');

  // Replace any sequence of non-alphanumeric characters with a single dot
  // Keep numbers and letters, remove other symbols
  const s = str
    .replace(/[^A-Za-z0-9]+/g, '.')
    .replace(/\.+/g, '.')
    .replace(/^\.+|\.+$/g, '')
    .toLowerCase();

  return s;
}

/*Generate detailed JSDoc documentation for our string case conversion functions */

 /**
   * Convert any input to lower_snake_case.
   * - Accepts strings or other values (coerces via `String(input)`).
   * - Returns '' for `null` or `undefined`.
   * - Normalizes Unicode (removes diacritics).
   * - Treats camelCase boundaries as word separators and converts
   *   any non-alphanumeric sequences to a single underscore.
   * - Collapses multiple underscores and trims leading/trailing underscores.
   * - Preserves numbers inside words (e.g. `v2Feature` -> `v2_feature`).
   *
   * @param {any} input - Value to convert to snake_case.
   * @returns {string} Lowercase snake_case string.
   * @example
   * snakeCase('User_ID') // 'user_id'
   * snakeCase('make---this__snake.case') // 'make_this_snake_case'
   */

   /**
   * Convert input to lower camelCase.
   * - Accepts strings or other values (coerces via `String(input)`).
   * - Returns '' for `null` or `undefined` or when no alphanumeric characters are present.
   * - Normalizes Unicode (removes diacritics).
   * - Treats spaces, punctuation, underscores, hyphens and other non-alphanumerics
   *   as word separators (also inserts separators at camelCase boundaries).
   * - Collapses multiple separators and preserves numbers inside words
   *   (e.g. `v2_feature` -> `v2Feature`).
   *
   * @param {any} input - Value to convert to camelCase.
   * @returns {string} lower camelCase string.
   * @example
   * toCamelCase('hello world') // 'helloWorld'
   * toCamelCase('User_ID') // 'userId'
   */

   
const sleep = (ms) => {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
};

const snakeCase = (input) => {
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
  if (input === null || input === undefined) return '';
  const str = String(input).trim()
    .normalize && String(input).normalize('NFKD').replace(/\p{Diacritic}/gu, '') || String(input).trim();

  let s = str
    .replace(/([a-z0-9])([A-Z])/g, '$1_$2')
    .replace(/[^A-Za-z0-9]+/g, '_')
    .replace(/_+/g, '_')
    .replace(/^_+|_+$/g, '');

  return s.toLowerCase();
};

function toCamelCase(input) {
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
  if (input === null || input === undefined) return '';
  let str = String(input).trim();
  if (!str) return '';

  if (str.normalize) {
    try { str = str.normalize('NFKD').replace(/\p{M}/gu, ''); } catch (e) {}
  }

  // Break camel boundaries and treat any non-alphanumeric as separator
  str = str.replace(/([a-z0-9])([A-Z])/g, '$1 $2');
  const parts = str.split(/[^A-Za-z0-9]+/).filter(Boolean);
  if (parts.length === 0) return '';

  const first = parts[0].toLowerCase();
  const rest = parts.slice(1).map(w => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase());
  return [first, ...rest].join('');
}

/**
 * Convert input to camelCase using `$` as the primary separator.
 *
 * Behavior:
 * - Returns an empty string for `null` or `undefined` inputs.
 * - Coerces other values via `String(input)` and trims surrounding whitespace.
 * - Normalizes Unicode (removes diacritics) when `String.prototype.normalize` is available.
 * - If the input contains `$`, the function uses `$` as the primary word separator.
 *   Otherwise it splits on non-letter sequences.
 * - Removes any numbers or non-letter symbols from each word part after splitting
 *   (numbers are dropped for this conversion), then collapses empty parts.
 * - Converts the first word to lowercase and capitalizes the first letter of subsequent words.
 *
 * Note: This implementation intentionally drops numeric characters from word parts
 * when producing the result (per project spec). Use `toCamelCase` if you want
 * to preserve numbers inside words (e.g. `v2_feature` -> `v2Feature`).
 *
 * @param {any} input - Value to convert to camelCase. `null`/`undefined` -> ''.
 * @returns {string} Resulting camelCased string with numbers/symbols removed (except `$` used as separator).
 * @example
 * camelCase('hEllo$tHis$is$a/!$example$1sentence') // 'helloThisIsAExampleSentence'
 * camelCase('first name') // 'firstName'
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

/**
 * Convert input to lower dot.case.
 *
 * Behavior:
 * - Returns '' for `null` or `undefined` inputs.
 * - Coerces values via `String(input)` and trims surrounding whitespace.
 * - Normalizes Unicode (removes diacritics) when available.
 * - Inserts separators at camelCase boundaries (e.g. `userID` -> `user.ID`).
 * - Treats spaces, hyphens, underscores, periods and any other non-alphanumeric
 *   sequences as separators and collapses them into a single dot (`.`).
 * - Preserves numbers inside words (e.g. `v2Feature` -> `v2.feature`).
 *
 * @param {any} input - Value to convert to dot.case.
 * @returns {string} Lowercase dot.delimited string, or '' for null/undefined.
 * @example
 * dotCase('Hello World') // 'hello.world'
 * dotCase('make---this__snake.case') // 'make.this.snake.case'
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

/**
 * Convert input to kebab-case (lowercase, hyphen-delimited).
 *
 * Steps:
 * - Return '' for `null` or `undefined`.
 * - Coerce via `String(input)` and `trim()`.
 * - Normalize Unicode (NFKD) and remove diacritics when available.
 * - Insert separators at camelCase boundaries.
 * - Treat any non-letter/number sequence as a word separator and collapse repeats.
 * - Preserve numbers inside words (e.g. `v2_feature` -> `v2-feature`).
 * - Lowercase each segment and join with single hyphens.
 *
 * @param {any} input - Value to convert to kebab-case.
 * @returns {string} kebab-cased string or '' for null/undefined.
 * @example
 * toKebabCase('first name') // 'first-name'
 * toKebabCase('User_ID') // 'user-id'
 * toKebabCase('make---this__snake.case') // 'make-this-snake-case'
 * toKebabCase(null) // ''
 * toKebabCase('Ångström') // 'angstrom'
 */
function toKebabCase(input) {
  if (input === null || input === undefined) return '';
  let str = String(input).trim();
  if (!str) return '';

  if (str.normalize) {
    try { str = str.normalize('NFKD').replace(/\p{M}/gu, ''); } catch (e) {}
  }

  // Insert separator for camelCase boundaries (userID -> user ID)
  str = str.replace(/([a-z0-9])([A-Z])/g, '$1 $2');

  // Split on any non-letter/number sequence (unicode-aware), collapse empties
  const parts = str.split(/[^^\p{L}\p{N}]+/u).filter(Boolean);

  // Lowercase and join with hyphens, then collapse any accidental duplicates and trim
  const joined = parts.map(p => p.toLowerCase()).join('-').replace(/-+/g, '-').replace(/^-+|-+$/g, '');
  return joined;
}

module.exports = { sleep, snakeCase, toCamelCase, camelCase, dotCase, toKebabCase };

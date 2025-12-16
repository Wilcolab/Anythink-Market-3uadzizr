/*Write a chain prompt that asks Copilot to create a JavaScript function called toKebabCase. 
Your prompt should include at least three sequential steps that build upon each other. */

/*Goal: Implement a pure JavaScript function named toKebabCase(input) that converts arbitrary input into kebab-case.

Step 1 — sanitize and normalize:

If input is null or undefined, return ''.
Coerce to string with String(input), then trim().
Normalize Unicode (use str.normalize('NFKD')) and remove diacritics.
Step 2 — split into words:

Insert separators for camelCase boundaries (e.g., userID → user ID).
Treat spaces, hyphens, underscores, periods, and any non-alphanumeric characters as word separators.
Collapse multiple separators into one and remove empty segments.
Preserve numbers inside words (e.g., v2_feature → v2, feature).
Step 3 — transform and join:

Lowercase each word.
Join words with single hyphens (-) to form kebab-case.
Trim leading/trailing hyphens and collapse any accidental duplicate hyphens.
Step 4 — finish and test:

Ensure the function has no side effects and returns a plain string.
Add a few unit-test examples:
toKebabCase('first name') → first-name
toKebabCase('User_ID') → user-id
toKebabCase('make---this__snake.case') → make-this-snake-case
toKebabCase(null) → ''
toKebabCase('Ångström') → angstrom
Implementation notes for Copilot:

Use regexes carefully and prefer Unicode-aware patterns where available.
Keep code concise and readable; include a short JSDoc comment describing behavior. */

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

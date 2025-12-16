const toCamelCase = (input) => {
  if (input === null || input === undefined) return '';
  let str = String(input).trim();
  if (!str) return '';

  if (str.normalize) {
    try {
      str = str.normalize('NFKD').replace(/\p{M}/gu, '');
    } catch (e) {}
  }

  // Insert separators between camelCase boundaries (e.g. userID -> user ID)
  str = str.replace(/([a-z0-9])([A-Z])/g, '$1 $2');

  // Split on any non-alphanumeric characters (collapses multiple separators)
  const parts = str.split(/[^A-Za-z0-9]+/).filter(Boolean);
  if (parts.length === 0) return '';

  const first = parts[0].toLowerCase();
  const rest = parts.slice(1).map((w) => {
    if (!w) return '';
    return w.charAt(0).toUpperCase() + w.slice(1).toLowerCase();
  });

  return [first, ...rest].join('');
};

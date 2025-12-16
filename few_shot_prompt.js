function toCamelCase(input) {
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


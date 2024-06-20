/**
 * Returns a string of joined class names.
 *
 * This function expects at least two arguments.
 *
 * @example
 * buildClassName('foo', '', 'bar', false && 'baz');
 * // returns 'foo bar'
 */
export function buildClassName(
  // At least two arguments are required
  ...classNames: [unknown, unknown, ...unknown[]]
) {
  return classNames.filter(Boolean).join(' ');
}

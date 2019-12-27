/**
 * Backwards compatibility for Object.entries function.
 */
/* istanbul ignore next */
export const entries = typeof Object.entries === 'undefined'
  ? (obj: {[key: string]: any}) => Object.keys(obj).map((key) => [key, obj[key]])
  : Object.entries;

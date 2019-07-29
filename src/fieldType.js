/** @type {string[]} */
const fieldTypes = [
  'string',
  'text',
  'boolean',
  'integer',
  'float',
  'date',
  'datetime',
  'objectid',
]

/** @enum {string} */
export default fieldTypes.reduce((x, y) => ({ ...x, [y]: y }), {})

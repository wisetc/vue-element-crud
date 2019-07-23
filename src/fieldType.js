const fieldTypes = [
  'string',
  'text',
  'boolean',
  'integer',
  'float',
  'date',
  'datetime',
  'objectid',
];

export default fieldTypes.reduce((x, y, i) => ({ ...x, [y]: y }), {});

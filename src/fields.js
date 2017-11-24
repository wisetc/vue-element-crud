const fields = ['string', 'text', 'boolean', 'integer', 'float', 'date', 'datetime', 'objectid']

export default fields.reduce((x, y, i) => (
  {...x, [y]: y}
), {})

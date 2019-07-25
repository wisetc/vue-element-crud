import { Message } from 'element-ui'

export default function report(data, type = '', callback) {
  let map = {
    create: __('create'),
    update: __('update'),
    destroy: __('destroy'),
  }
  let msg = map[type] || type || __('handle')

  if (data.code === 1) {
    Message.success(msg + __(' succeed.'))
    callback(data)
  } else {
    Message.error(msg + __(' failed. ') + data.msg)
  }
}

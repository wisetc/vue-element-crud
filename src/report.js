import { Message } from 'element-ui'

export default function report (data, type='', callback) {
  let map = {
    create: '新增',
    update: '修改',
    destroy: '删除'
  }
  let msg = map[type] || type || '操作'

  if (data.code === 1) {
    Message.success(msg + '成功！')
    callback(data)
  } else {
    Message.error(msg + '失败！' + data.msg)
  }
}

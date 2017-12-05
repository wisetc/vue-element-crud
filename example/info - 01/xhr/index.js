let initData = [
  { id: 1, name: '大暗扣', phone: '18588497777', mail: 'zhi@xxx.com', site: 'http://www.example.com' }
]

export const Customer = {
  list: () => new Promise((resolve, reject) => {
    resolve({
      data: {
        data: {
          data: initData
        },
        code: 1
      },
      status: 200
    })
  }),
  create: params => new Promise((resolve, reject) => {
    initData = initData.concat({ ...params, id: initData[initData.length - 1].id + 1 })
    resolve({
      data: {
        data: {
          data: initData
        },
        code: 1
      },
      status: 200
    })
  }),
  retrieve: () => {},
  update: params => new Promise((resolve, reject) => {
    let index = initData.findIndex(item => item.id === params.id)
    for (let k in initData[index]) {
      initData[index][k] = params[k]
    }
    resolve({
      data: {
        data: {
          data: params
        },
        code: 1
      }
    })
  }),
  destroy: id => new Promise((resolve, reject) => {
    let index = initData.findIndex(item => item.id === id)
    initData.splice(index, 1)
    resolve({
      data: {
        data: {
          data: initData
        },
        code: 1
      },
      status: 200
    })
  })
}

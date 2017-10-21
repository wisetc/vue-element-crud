<template>
<div>
  <crud :data="data" :form="form" :rules="rules" :fields="mapItems" :inline="false"
    :editing="editing" @open="handleOpen" @close="handleClose"
    @create="handleCreate" @update="handleUpdate" @destroy="handleDestroy" @submit="handleSubmit"/>

</div>
</template>

<script>
import { Customer as api } from './xhr'
export default {
  data() {
    return {
      data: [],

      form: {},

      editing: false,

      mapItems: {
        name: {
          label: '姓名',
          length: 50,
          type: String,
          rules: [{ required: true, message: '此项不能为空' }]
        },
        phone: {
          label: '手机',
          length: 11,
          type: Number
        },
        mail: {
          label: '邮箱',
          length: 50,
          type: String,
          rules: [{ required: true, message: '此项不能为空' }, { type: 'email', message: '邮箱地址不正确' }]
        },
        site: {
          label: '网址',
          length: 50,
          type: String,
          rules: [{ type: 'url', message: '网址格式不正确' }]
        },
      }
    }
  },
  computed: {
    model() {
      let model = {}
      let mapItems = this.mapItems
      for (let k in mapItems) {
        model[k] = null
      }
      return model
    },
    rules() {
      let rules = {}
      let mapItems = this.mapItems
      for (let k in mapItems) {
        if (mapItems[k].rules) {
          rules[k] = mapItems[k].rules
        }
      }
      return rules
    }
  },
  created() {
    this.loadData()
  },
  methods: {
    loadData() {
      api.list().then(({data}) => {
        this.data = data.data.data
      })
    },
    handleCreate() {
      this.form = { ...this.model }
    },
    handleUpdate(row, index) {
      this.form = { ...row }
      this.handleOpen()
    },
    handleDestroy(row, index) {
      api.destroy(row.id).then(({data}) => {
        this.$report(data, 'destroy', this.deleteSuccess)
      })
    },
    handleOpen() {
      this.editing = true
    },
    handleClose() {
      this.editing = false      
    },
    handleSubmit(status) {
      if (status === 0) {
        api.create(this.form).then(({data}) => {
          console.log('response data of create is ', data)
          this.$report(data, 'create', this.createSuccess)
        })
      } else {
        api.update(this.form).then(({data}) => {
          this.$report(data, 'update', this.updateSuccess)
        })
      }
    },
    createSuccess(data) {
      this.handleClose()
      this.loadData()
    },
    updateSuccess(data) {
      this.handleClose()
      this.loadData()
    },
    deleteSuccess(data) {
      this.loadData()
    }
  }
}
</script>

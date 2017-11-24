<template>
<div>
  <crud :data="data" :form="form" :fields="mapItems"
    @create="handleCreate" @update="handleUpdate" @destroy="handleDestroy" @submit="handleSubmit">
    <template slot="index">
      <el-table-column type="index"></el-table-column>
    </template>
  </crud>

</div>
</template>

<script>
import { Customer as api } from './xhr'
export default {
  data() {
    return {
      data: [],

      form: {},

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
    },
    handleDestroy(row, index) {
      api.destroy(row.id).then(({data}) => {
        this.$report(data, 'destroy', this.deleteSuccess)
      })
    },
    handleSubmit(status, closeDialog) {
      this.closeDialog = closeDialog
      
      if (status === 0) {
        api.create(this.form).then(({data}) => {
          this.$report(data, 'create', this.submitSuccess)
        })
      } else {
        api.update(this.form).then(({data}) => {
          this.$report(data, 'update', this.submitSuccess)
        })
      }
    },
    submitSuccess(data) {
      this.loadData()
      this.closeDialog()
    },
    deleteSuccess(data) {
      this.loadData()
    }
  }
}
</script>

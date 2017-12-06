<template>
<div>
  <crud-inline :data.sync="data" :fields="mapItems"
    @destroy="handleDestroy" @submit="handleSubmit">
    <template slot="index">
      <el-table-column type="index"></el-table-column>
    </template>
  </crud-inline>

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
          options: [
            { label: 'http://www.example.com', value: 'http://www.example.com' },
            { label: 'http://www.google.com', value: 'http://www.google.com' }
          ],
          rules: [{ type: 'url', message: '网址格式不正确' }]
        },
      }
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

    handleDestroy(row, index) {
      api.destroy(row.id).then(({data}) => {
        this.$report(data, 'destroy', () => {})
      })
    },
    handleSubmit(status, form, switchEditable, updateRowId) {
      if (status === 0) {
        api.create(form).then(({data}) => {
          this.$report(data, 'create', () => {
            let id = data.data.data.id
            switchEditable(false)
            updateRowId(id)
          })
        })
      } else {
        api.update(form).then(({data}) => {
          this.$report(data, 'update', () => {
            switchEditable(false)
          })
        })
      }
    }
  }
}
</script>

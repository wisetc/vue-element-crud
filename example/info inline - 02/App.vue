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
          maxlength: 50,
          type: 'string',
          rules: [{ required: true, message: '此项不能为空' }]
        },
        phone: {
          label: '手机',
          maxlength: 11,
          type: 'number'
        },
        mail: {
          label: '邮箱',
          maxlength: 50,
          type: 'string',
          rules: [{ required: true, message: '此项不能为空' }, { type: 'email', message: '邮箱地址不正确' }]
        },
        site: {
          label: '网址',
          maxlength: 50,
          type: 'string',
          options: [
            { label: 'http://www.example.com', value: 'http://www.example.com' },
            { label: 'http://www.google.com', value: 'http://www.google.com' }
          ],
          rules: [{ type: 'url', message: '网址格式不正确' }]
        },
        birth: {
          label: '出生日',
          type: 'date'
        },
        married: {
          label: '已婚',
          type: 'boolean',
          formatter: function (value) {
            return value ? '是' : '否'
          },
        },
        age: {
          label: '年龄',
          editable: false,
          formatter: function (value, row) {
            let birth = row.__form__.birth
            let birthFullYear = typeof birth === 'string' ?
              Number(birth.slice(0, 4))
              : row.__form__.birth.getUTCFullYear()
            const age = new Date().getUTCFullYear() - birthFullYear
            row.__form__.age = age
            return age
          }
        }
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

    beforeSubmit(form) {
      const birth = form.birth
      if (typeof birth === 'object') {
        // date object
        form.birth = birth.toISOString().slice(0,10)
      }
    },

    handleSubmit(status, form, switchEditable, updateRowId) {
      this.beforeSubmit(form)

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

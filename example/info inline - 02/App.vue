<template>
  <div>
    <crud-inline
      :data.sync="data"
      :fields="mapItems"
      @destroy="handleDestroy"
      @submit="handleSubmit"
    >
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
          label: __('name'),
          maxlength: 50,
          type: 'string',
          rules: [{ required: true, message: __('This item cannot be empty') }],
        },
        phone: {
          label: __('phone'),
          maxlength: 11,
          type: 'number',
        },
        mail: {
          label: __('mail'),
          maxlength: 50,
          type: 'string',
          rules: [
            { required: true, message: __('This item cannot be empty') },
            { type: 'email', message: __('Email address format is incorrect') },
          ],
        },
        site: {
          label: __('site'),
          maxlength: 50,
          clearable: true,
          type: 'string',
          options: [
            {
              label: 'http://www.example.com',
              value: 'http://www.example.com',
            },
            { label: 'http://www.google.com', value: 'http://www.google.com' },
          ],
          rules: [{ type: 'url', message: __('URL format is incorrect') }],
        },
        birth: {
          label: __('birth'),
          type: 'date',
        },
        married: {
          label: __('married'),
          type: 'boolean',
          formatter: function(value) {
            return value ? __('Yes') : __('No')
          },
        },
        age: {
          label: __('age'),
          editable: false,
          formatter: function(value, row) {
            let birth = row.__form__.birth
            let birthFullYear =
              typeof birth === 'string'
                ? Number(birth.slice(0, 4))
                : row.__form__.birth.getUTCFullYear()
            const age = new Date().getUTCFullYear() - birthFullYear
            row.__form__.age = age
            return age
          },
        },
      },
    }
  },
  created() {
    this.loadData()
  },
  methods: {
    loadData() {
      api.list().then(({ data }) => {
        this.data = data.data.data
      })
    },

    handleDestroy(row, index) {
      api.destroy(row.id).then(({ data }) => {
        this.$report(data, 'destroy', () => {})
      })
    },

    beforeSubmit(form) {
      const birth = form.birth
      if (typeof birth === 'object') {
        // date object
        form.birth = birth.toISOString().slice(0, 10)
      }
    },

    handleSubmit(status, form, switchEditable, updateRowId) {
      this.beforeSubmit(form)

      if (status === 0) {
        api.create(form).then(({ data }) => {
          this.$report(data, 'create', () => {
            let id = data.data.data.id
            switchEditable(false)
            updateRowId(id)
          })
        })
      } else {
        api.update(form).then(({ data }) => {
          this.$report(data, 'update', () => {
            switchEditable(false)
          })
        })
      }
    },
  },
}
</script>

<template>
  <div class="crud">
    <div class="crud__ctrl">
      <el-button v-if="actions.includes('create')" type="primary" @click="create" size="small" icon="plus"></el-button>
    </div>
    <el-table :data="injectedData" stripe border :row-style="rowStyle || undefined" :highlight-current-row="highlightCurrentRow"
      @expand="handleExpand" @row-click="handleRowClick" @row-dblclick="handleRowDblclick">
      <slot name="expand"></slot>
      
      <slot name="index"></slot>
      <slot name="prepend"></slot>
      <template v-for="(key, index) in Object.keys(columns)">
        <el-table-column :key="index" v-if="key in fields && fields[key].options && !fields[key].raw" :label="columns[key]" :min-width="labelWidth" show-overflow-tooltip> <!-- 如果表格中包含有选项的字段 -->
          <template slot-scope="scope">
            <template v-if="scope.row.__editable__">
              <el-select v-model="scope.row.__form__[key]" :placeholder="columns[key]" class="crud__select"
                :class="{ 'is-error': scope.row.__error__[key].isError }" @change="clearErrors(scope.row, key)">
                <el-option :key="index" v-for="(o, index) in fields[key].options" v-bind="o"></el-option>
              </el-select>
            </template>
            <template v-else>
              {{ (fields[key].options.find(item => item.value === scope.row[key]) || '').label }}
            </template>
          </template>
        </el-table-column>
        <el-table-column :key="index" v-else :label="columns[key]" :min-width="labelWidth" :prop="key" show-overflow-tooltip>
          <template slot-scope="scope">
            <template v-if="scope.row.__editable__">
              <el-input v-model="scope.row.__form__[key]" :placeholder="columns[key]" class="crud__input"
                :class="{ 'is-error': scope.row.__error__[key].isError }" @change="clearErrors(scope.row, key)" @keydown.13.native="submit(scope.row)"></el-input>
            </template>
            <template v-else>
              {{ scope.row[key] }}
            </template>
          </template>
        </el-table-column>
      </template>
      <slot></slot>

      <el-table-column v-if="actions.includes('update') || actions.includes('destroy')" label="操作" width="120" align="center">
        <template slot-scope="scope">
          <template v-if="!scope.row.__editable__">
            <el-button v-if="actions.includes('update')" type="warning" size="small" icon="edit"
              @click.stop="update(scope.row, scope.$index)"></el-button>
            <el-button v-if="actions.includes('destroy')" type="danger" size="small" icon="delete"
              @click.stop="destroy(scope.row, scope.$index)"></el-button>
          </template>
          <template v-else>
            <el-button type="success" size="small" icon="check"
              @click.stop="submit(scope.row)"></el-button>
            <el-button type="danger" size="small" icon="close"
              @click.stop="cancelEdit(scope.row, scope.$index)"></el-button>
          </template>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import TYPES from './fields'
import schema from 'async-validator'
export default {
  props: {
    // 表格数据
    data: { required: true, type: Array },

    // 表单字段
    fields: { required: true, type: Object },

    // 表单验证
    rules: Object,
    
    // 表格与表单的字段不一致时，传入作为表格的表头
    table: Object,

    // 表单元素标签的尺寸
    labelWidth: { default: '100px', type: String },

    // 是否正在提交数据，请求网络
    loading: { default: false, type: Boolean },

    // 操作
    actions: { default: () => ['create', 'destroy', 'update'], type: Array },

    // 是否高亮显示当前行
    highlightCurrentRow: { default: false, type: Boolean },

    // 表格行样式
    rowStyle: Function
  },
  data() {
    return {
      // 选项不可重复时，传入当前行判断选项是否为此当前行的属性
      updatingRow: null,

      TYPES
    }
  },
  computed: {
    labels() {
      let labels = {}
      let fields = this.fields
      for (let key in fields) {
        labels[key] = fields[key].label
      }
      return labels
    },
    columns() {
      return this.table || this.labels
    },
    computedRules() {
      if (this.rules) return this.rules

      let rules = {}
      let fields = this.fields
      for (let k in fields) {
        if (fields[k].rules) {
          rules[k] = fields[k].rules.concat({ pattern: /^\S.*?$/, message: '不允许以空格开头' })
        }
      }
      return rules
    },
    injectedData() {
      return this.data.map(item => {
        let error = {}
        for (let k in item) {
          error[k] = {
            isError: false,
            message: ''
          }
        }

        let rowInclude = { __form__: {...item}, __editable__: false, __error__: error }
        return { ...item, ...rowInclude }
      })
    },
    model() {
      let model = {}
      for (let k in this.fields) {
        model[k] = null
      }
      return model
    }
  },

  methods: {
    clearErrors(row, key) {
      row.__error__[key] = {
        isError: false,
        message: ''
      }
    },
    create() {
      let row = { ...this.model }
      let __error__ = {}
      for (let k in row) {
        __error__[k] = {
          isError: false,
          message: ''
        }
      }
      this.injectedData.push({
        ...row,
        __error__,
        __editable__: true,
        __form__: { ...this.model }
      })
    },
    update(row, index) {
      row.__editable__ = true
    },
    destroy(row, index) {
      this.$confirm(`确定要删除？`, '确认', {type: 'warning'}).then(()=> {
        this.$emit('destroy', row, index)
      }).catch(_ => {})
    },
    cancelEdit(row, index) {
      if (row.id) {
        let _row = {}
        let error = {}
        for (let k in row) {
          if (k !== '__form__' && k !== '__editable__' && k !== '__error__') {
            _row[k] = row[k]

            error[k] = {
              isError: false,
              message: ''
            }
          }
        }
        row.__form__ = _row
        row.__error__ = error
        row.__editable__ = false
      } else {
        this.injectedData.splice(index, 1)
      }
    },
    validate(form, error){
      return new Promise((resolve, reject) => {
        new schema(this.computedRules).validate(form, (errors, fields) => {
          if (fields) {
            for (let k in fields) {
              error[k] = {
                isError: true,
                message: fields[k][0].message
              }
            }
          }

          let valid = fields ? false : true
          resolve(valid)
        })
      })
    },

    submit(row) {
      let status = row.id ? 1: 0
      const switchEditable = (editable=false) => {
        row.__editable__ = editable
      }
      this.validate(row.__form__, row.__error__).then((valid) => {
        if (valid) {
          this.$emit('submit', status, row.__form__, switchEditable)
        }
      })
    },

    handleExpand(row, expanded) {
      this.$emit('expand', row, expanded)
    },
    handleRowClick(row, event, column) {
      this.$emit('row-click', row, event, column)
    },
    handleRowDblclick(row, event) {
      this.$emit('row-dblclick', row, event)
    }
  }
}
</script>

<style>
.crud__ctrl {
  margin: 8px 0;
}
.crud__select {
  width: 100%;
}
.crud__input.is-error .el-input__inner, .crud__select.is-error .el-input__inner {
  border-color: red !important;
}
</style>

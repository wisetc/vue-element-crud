<template>
  <div class="crud">
    <div class="crud__ctrl" v-if="actions.includes('create')">
      <slot name="action.create">
        <el-button type="primary" @click="create" size="small" icon="el-icon-plus"></el-button>
      </slot>
    </div>
    <el-table
      :data="injectedData"
      stripe
      border
      :row-style="rowStyle || undefined"
      :highlight-current-row="highlightCurrentRow"
      @expand="handleExpand"
      @row-click="handleRowClick"
      @row-dblclick="handleRowDblclick"
    >
      <slot name="expand"></slot>

      <slot name="index"></slot>
      <slot name="prepend"></slot>
      <template v-for="(key, index) in Object.keys(columns)">
        <el-table-column
          :key="index"
          v-if="key in fields && fields[key].options && !fields[key].raw"
          :label="columns[key]"
          :min-width="labelWidth"
          show-overflow-tooltip
        >
          <!-- 如果表格中包含有选项的字段 -->
          <template slot-scope="scope">
            <template v-if="scope.row.__editable__">
              <el-select
                v-bind="fields[key]"
                v-model="scope.row.__form__[key]"
                :placeholder="columns[key]"
                class="crud__select"
                :class="{ 'is-error': scope.row.__error__[key].isError }"
                @change="clearErrors(scope.row, key)"
              >
                <el-option :key="index" v-for="(o, index) in fields[key].options" v-bind="o"></el-option>
              </el-select>
            </template>
            <template
              v-else
            >{{ (fields[key].options.find(item => item.value === scope.row[key]) || '').label }}</template>
          </template>
        </el-table-column>
        <el-table-column
          :key="index"
          v-else
          :label="columns[key]"
          :min-width="labelWidth"
          :prop="key"
          show-overflow-tooltip
        >
          <template slot-scope="scope">
            <template v-if="scope.row.__editable__">
              <template v-if="fields[key].editable || fields[key].editable === undefined">
                <el-input
                  v-if="fields[key].type === 'string' || fields[key].type === 'text'"
                  v-bind="fields[key]"
                  v-model="scope.row.__form__[key]"
                  :placeholder="columns[key]"
                  :maxlength="fields[key].maxlength"
                  class="crud__input"
                  :class="{ 'is-error': scope.row.__error__[key].isError }"
                  @change="clearErrors(scope.row, key)"
                  @keydown.13.native="submit(scope.row)"
                ></el-input>
                <el-input
                  v-else-if="fields[key].type === 'number'"
                  v-bind="fields[key]"
                  type="number"
                  v-model="scope.row.__form__[key]"
                  :placeholder="columns[key]"
                  class="crud__input"
                  :class="{ 'is-error': scope.row.__error__[key].isError }"
                  @change="clearErrors(scope.row, key)"
                  @input.native="handleNumberInput(scope.row, key, fields[key].maxlength)"
                  @keydown.13.native="submit(scope.row)"
                ></el-input>
                <el-date-picker
                  v-else-if="fields[key].type === 'date' || fields[key].type === 'datetime'"
                  v-bind="fields[key]"
                  :type="fields[key].type"
                  :placeholder="columns[key]"
                  style="width:100%"
                  class="crud__input"
                  v-model="scope.row.__form__[key]"
                  @change="clearErrors(scope.row, key)"
                ></el-date-picker>
                <el-radio-group
                  v-bind="fields[key]"
                  v-else-if="fields[key].type === 'boolean'"
                  v-model="scope.row.__form__[key]"
                  size="small"
                  @change="clearErrors(scope.row, key)"
                >
                  <el-radio-button label="是"></el-radio-button>
                  <el-radio-button label="否"></el-radio-button>
                </el-radio-group>
              </template>
              <template v-else>
                <template
                  v-if="fields[key].formatter"
                >{{ fields[key].formatter(scope.row[key], scope.row) }}</template>
              </template>
            </template>
            <template v-else>
              <template
                v-if="fields[key].formatter && fields[key].editable !== false"
              >{{ fields[key].formatter(scope.row[key], scope.row) }}</template>
              <template v-else>{{ scope.row[key] }}</template>
            </template>
          </template>
        </el-table-column>
      </template>
      <slot></slot>

      <el-table-column
        v-if="actions.includes('update') || actions.includes('destroy')"
        :label="actionsColumnLabel"
        width="150"
        align="center"
      >
        <template slot-scope="scope">
          <template v-if="!scope.row.__editable__">
            <el-button
              v-if="actions.includes('update')"
              type="warning"
              size="small"
              icon="el-icon-edit"
              @click.stop="update(scope.row, scope.$index)"
            ></el-button>
            <el-button
              v-if="actions.includes('destroy')"
              type="danger"
              size="small"
              icon="el-icon-delete"
              @click.stop="destroy(scope.row, scope.$index)"
            ></el-button>
          </template>
          <template v-else>
            <div
              :class="{ 'shake' : scope.row.__warning__ }"
              @animationend="scope.row.__warning__ = false"
            >
              <el-button
                type="success"
                size="small"
                icon="el-icon-check"
                @click.stop="submit(scope.row)"
              ></el-button>
              <el-button
                type="danger"
                size="small"
                icon="el-icon-close"
                @click.stop="cancelEdit(scope.row, scope.$index)"
              ></el-button>
            </div>
          </template>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import TYPES from './fieldType'
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
    rowStyle: Function,
  },
  data() {
    return {
      // 选项不可重复时，传入当前行判断选项是否为此当前行的属性
      updatingRow: null,

      TYPES,
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
          rules[k] = fields[k].rules.concat({
            pattern: /^\S.*?$/,
            message: __('Do not allow spaces to start'),
          })
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
            message: '',
          }
        }

        let rowInclude = {
          __form__: { ...item },
          __editable__: false,
          __error__: error,
          __warning__: false,
        }
        return { ...item, ...rowInclude }
      })
    },
    model() {
      let model = {}
      for (let k in this.fields) {
        model[k] = null
      }
      return model
    },
    actionsColumnLabel() {
      return __('Actions')
    },
  },

  methods: {
    clearErrors(row, key) {
      row.__error__[key] = {
        isError: false,
        message: '',
      }
    },
    handleNumberInput(row, key, maxlength) {
      const value = row.__form__[key].toString()
      if (value.length > maxlength) {
        this.$nextTick(() => {
          row.__form__[key] = Number(value.slice(0, -1))
        })
      }
    },
    isSomeRowEditing() {
      let row = this.injectedData.find(item => item.__editable__)
      if (row) {
        row.__warning__ = true
        return true
      } else {
        return false
      }
    },
    create() {
      let row = { ...this.model, id: null }
      let __error__ = {}
      for (let k in row) {
        __error__[k] = {
          isError: false,
          message: '',
        }
      }
      this.injectedData.push({
        ...row,
        __error__,
        __warning__: false,
        __editable__: true,
        __form__: { ...this.model },
      })
    },
    update(row, index) {
      row.__editable__ = true
    },
    destroy(row, index) {
      this.$confirm(__('Are you sure you want to delete?'), __('Confirm'), {
        type: 'warning',
      })
        .then(() => {
          this.remove(index)
          this.$emit('destroy', row, index)
        })
        .catch(_ => {})
    },
    cancelEdit(row, index) {
      if (row.id) {
        let _row = {}
        let error = {}
        for (let k in row) {
          if (
            k !== '__form__' &&
            k !== '__editable__' &&
            k !== '__error__' &&
            k !== '__warning__'
          ) {
            _row[k] = row[k]

            error[k] = {
              isError: false,
              message: '',
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
    validate(form, error) {
      return new Promise((resolve, reject) => {
        new schema(this.computedRules).validate(form, (errors, fields) => {
          if (fields) {
            for (let k in fields) {
              error[k] = {
                isError: true,
                message: fields[k][0].message,
              }
            }
          }

          let valid = fields ? false : true
          resolve(valid)
        })
      })
    },

    submit(row, index) {
      let status = row.id ? 1 : 0
      const switchEditable = (editable = false) => {
        row.__editable__ = editable
      }
      const updateRowId = (id = null) => {
        row.id = id
        row.__form__.id = id
      }

      this.validate(row.__form__, row.__error__).then(valid => {
        if (valid) {
          this.commit(row)
          this.$emit(
            'submit',
            status,
            row.__form__,
            switchEditable,
            updateRowId
          )
        }
      })
    },
    remove(index) {
      this.injectedData.splice(index, 1)
    },
    commit(row) {
      for (let k in row.__form__) {
        row[k] = row.__form__[k]
      }
    },

    handleExpand(row, expanded) {
      this.$emit('expand', row, expanded)
    },
    handleRowClick(row, event, column) {
      this.$emit('row-click', row, event, column)
    },
    handleRowDblclick(row, event) {
      this.$emit('row-dblclick', row, event)
    },
  },
}
</script>

<style>
.crud__ctrl {
  margin: 8px 0;
}
.crud__select {
  width: 100%;
}
.crud__input.is-error .el-input__inner,
.crud__select.is-error .el-input__inner {
  border-color: red !important;
}
.shake {
  animation-name: shake;
  -webkit-animation-duration: 1s;
  animation-duration: 1s;
  -webkit-animation-fill-mode: both;
  animation-fill-mode: both;
}

@keyframes shake {
  from,
  to {
    -webkit-transform: translate3d(0, 0, 0);
    transform: translate3d(0, 0, 0);
  }

  10%,
  30%,
  50%,
  70%,
  90% {
    -webkit-transform: translate3d(-10px, 0, 0);
    transform: translate3d(-10px, 0, 0);
  }

  20%,
  40%,
  60%,
  80% {
    -webkit-transform: translate3d(10px, 0, 0);
    transform: translate3d(10px, 0, 0);
  }
}
</style>

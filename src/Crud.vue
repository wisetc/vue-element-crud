<template>
  <div class="crud">
    <div class="crud__ctrl" v-if="actions.includes('create')">
      <el-button type="primary" @click="create" size="small" icon="el-icon-plus">新增</el-button>
    </div>
    <el-table :data="data" stripe :border="border || undefined" :row-style="rowStyle || undefined" :highlight-current-row="highlightCurrentRow" @expand="handleExpand" @row-click="handleRowClick"
      @row-dblclick="handleRowDblclick">
      <slot name="prepend"></slot>
      <template v-for="(key, index) in Object.keys(columns)">
        <el-table-column :key="index" v-if="key in fields && fields[key].options
          && fields[key].formatter && typeof fields[key].formatter === 'function'"
          :label="columns[key]" :min-width="fields[key].width || labelWidth" show-overflow-tooltip> <!-- 如果表格中包含有选项的字段 -->
          <template slot-scope="scope">
            {{ fields[key].formatter(scope.row, scope.column, scope.row[key]) }}
          </template>
        </el-table-column>
        <el-table-column :key="index" v-else-if="key in fields && fields[key].options && !fields[key].raw" :label="columns[key]" :min-width="fields[key].width || labelWidth" show-overflow-tooltip> <!-- 如果表格中包含有选项的字段 -->
          <template slot-scope="scope">
            {{ (fields[key].options.find(item => item.value === scope.row[key]) || '').label }}
          </template>
        </el-table-column>
        <el-table-column :key="index" v-else-if="key in fields && fields[key].type === TYPES.date" :label="columns[key]" :min-width="fields[key].width || labelWidth" show-overflow-tooltip>
          <template slot-scope="scope">
            {{ scope.row[key] ? scope.row[key].slice(0, 10) : '' }}
          </template>
        </el-table-column>
        <el-table-column :key="index" v-else :label="columns[key]" :min-width="fields[key] ? fields[key].width : labelWidth" :prop="key" show-overflow-tooltip></el-table-column>
      </template>
      <slot></slot>

      <el-table-column v-if="actions.includes('update') || actions.includes('destroy')" label="操作" width="148" align="center">
        <template slot-scope="scope">
          <el-button v-if="actions.includes('update')" type="warning" size="small" @click.stop="update(scope.row, scope.$index)">修改</el-button>
          <el-button v-if="actions.includes('destroy')" type="danger" size="small" @click.stop="destroy(scope.row, scope.$index)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-dialog :title="dialog.title[dialog.status]" :size="dialog.size" :close-on-click-modal="false"
      :visible="dialog.visible" :show-close="false" @open="handleOpen">
      <el-form class="crud__form" :class="{'crud__form--inline': inline}" ref="form" :model="form" :rules="computedRules" @keyup.native.13="submit">
        <el-form-item v-for="(key, index) in Object.keys(labels)" :key="index" :label="labels[key]" :prop="key" :label-width="labelWidth">
          <slot v-if="fields[key].slot" :name="fields[key].slot"></slot>

          <el-select :disabled="fields[key].disabled" v-else-if="fields[key].options" v-model="form[key]" style="width: 100%;" filterable>
            <el-option v-for="(o, index) in fields[key].options" :key="index" :label="o.label" :value="o.value"
              :disabled="fields[key].unique && repeated(key, o.value, (updatingRow || '')[key])"/>
          </el-select>
          <el-date-picker :disabled="fields[key].disabled" v-else-if="fields[key].type === TYPES.date" type="date" v-model="form[key]"></el-date-picker>
          <el-date-picker :disabled="fields[key].disabled" v-else-if="fields[key].type === TYPES.datetime" type="datetime" v-model="form[key]"></el-date-picker>
          <el-input :disabled="fields[key].disabled" v-else-if="fields[key].type === TYPES.text"
            type="textarea" resize="none" @keyup.13.native.stop="doNothing"
            v-model="form[key]" :maxlength="fields[key].length"></el-input>
          <el-input :disabled="fields[key].disabled" v-else-if="fields[key].type === TYPES.integer || fields[key].type === TYPES.float" type="number" v-model.number="form[key]" @change="handleNumberChange(key, $event, fields[key].length)"/>
          <el-input :disabled="fields[key].disabled" :type="fields[key].protected ? 'password' : 'text'" v-else v-model="form[key]" :maxlength="fields[key].length"/>
        </el-form-item>
        <slot name="addon"></slot>
      </el-form>
      <div slot="footer">
        <el-button @click="closeDialog">取消</el-button>
        <el-button type="primary" @click="submit" :loading="loading">提交</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import TYPES from './fieldType'
export default {
  props: {
    // 表格数据
    data: { required: true, type: Array },

    // 表单 v-model 对象
    form: { required: true, type: Object },

    // 表单字段
    fields: { required: true, type: Object },

    // 表单验证
    rules: Object,
    
    // 表格与表单的字段不一致时，传入作为表格的表头
    table: Object,

    // 对话框 el-dialog 的大小值
    size: { default: 'large', type: String },

    // 表单元素标签的尺寸
    labelWidth: { default: '100px', type: String },

    // 表单的显示样式，如果为真，则是行内显示
    inline: { default: false, type: Boolean },

    // 是否正在提交数据，请求网络
    loading: { default: false, type: Boolean },

    // 操作
    actions: { default: () => ['create', 'destroy', 'update'], type: Array },

    // 是否高亮显示当前行
    highlightCurrentRow: { default: false, type: Boolean },

    // 表格行样式
    rowStyle: Function,

    // 表格单元格是否带边框
    border: { type: Boolean, default: true }
  },
  data() {
    return {
      dialog: {
        status: 0,
        visible: false,
        title: {
          0: '新增',
          1: '修改'
        },
        size: this.inline ? this.size : 'small'
      },

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
    }
  },

  methods: {
    doNothing() {},
    create() {
      this.dialog.status = 0
      this.showDialog()
      this.$emit('create')
    },
    update(row, index) {
      this.dialog.status = 1
      this.updatingRow = row
      this.showDialog()
      this.$emit('update', row, index)
    },
    destroy(row, index) {
      this.$confirm(`确定要删除？`, '确认', {type: 'warning'}).then(()=> {
        this.$emit('destroy', row, index)
      }).catch(_ => {})
    },
    showDialog() {
      this.dialog.visible = true
      this.$emit('open')
    },
    closeDialog() {
      this.dialog.visible = false
      this.$emit('close')
    },
    handleOpen() {
      if (this.$refs.form) {
        this.$refs.form.resetFields()
      }
    },
    submit() {
      this.$refs.form.validate(valid => {
        if (valid) {
          this.$emit('submit', this.dialog.status, this.closeDialog)
        }
      })
    },
    repeated(key, value, self) {
      if (value === self) return false
      return this.data.find(item => item[key] === value) ? true : false
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
    handleNumberChange(key, event, length) {
      const tooLong = event.toString().length > length
      const slicedText = event.toString().slice(0, length)
      this.$nextTick(() => {
        this.form[key] = slicedText
      })
    }
  }
}
</script>

<style>
.crud__ctrl {
  margin: 8px 0;
}
.crud__form--inline:after {
  content: '';
  clear: both;
  display: table;
}
.crud__form--inline .el-form-item {
  width: 33%;
  min-height: 38px;
  float: left;
  padding: 0 8px;
  box-sizing: border-box;
}
</style>

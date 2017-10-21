<template>
  <div class="crud">
    <div class="crud__ctrl">
      <el-button type="primary" @click="create" size="small" icon="plus">新增</el-button>
    </div>
    
    <el-table :data="data" stripe border>
      <el-table-column v-if="index" type="index" width="60"></el-table-column>
      <template v-for="(key, index) in Object.keys(columns)">
        <el-table-column :key="index" v-if="(fields[key] || '').options" :label="columns[key]" show-overflow-tooltip> <!-- 如果表格中包含有选项的字段 -->
          <template scope="scope">
            {{ (fields[key].options.find(item => item.value === scope.row[key]) || '').label }}
          </template>
        </el-table-column>
        <el-table-column :key="index" v-else :label="columns[key]" :prop="key" show-overflow-tooltip></el-table-column>
      </template>

      <el-table-column label="操作" width="140" align="center">
        <template scope="scope">
          <el-button type="warning" size="small" @click="update(scope.row, scope.$index)">修改</el-button>
          <el-button type="danger" size="small" @click="destroy(scope.row, scope.$index)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-dialog :title="dialog.title[dialog.status]" :size="dialog.size" :close-on-click-modal="false"
      :visible="editing" :show-close="false" @open="handleOpen">
      <el-form class="crud__form" :class="{'crud__form--inline': inline}" ref="form" :model="form" :rules="rules" @keyup.native.13="Submit">
        <el-form-item v-for="(key, index) in Object.keys(labels)" :key="index" :label="labels[key]" :prop="key" :label-width="labelWidth">
          <el-select v-if="fields[key].options" v-model="form[key]" style="width: 100%;">
            <el-option v-for="(o, index) in fields[key].options" :key="index" :label="o.label" :value="o.value"
              :disabled="fields[key].unique && repeated(key, o.value, (updatingRow || '')[key])"/>
          </el-select>
          <el-date-picker v-else-if="fields[key].type === TYPES.datetime" type="datetime" v-model="form[key]"></el-date-picker>
          <el-input v-else v-model="form[key]" :maxlength="fields[key].length"/>
        </el-form-item>
      </el-form>
      <div slot="footer">
        <el-button @click="closeDialog">取消</el-button>
        <el-button type="primary" @click="Submit">提交</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import TYPES from './fields'
export default {
  props: {
    // 表格数据
    data: { required: true, type: Array },

    // 表单 v-model 对象
    form: { required: true, type: Object },

    // 表单字段
    fields: { required: true, type: Object },

    // 表单验证
    rules: { required: true, type: Object },

    // 对话框 el-dialog 的显示和隐藏状态
    editing: { required: true, type: Boolean },

    // 对话框 el-dialog 的大小值
    size: { default: 'large', type: String },

    // 表单元素标签的尺寸
    labelWidth: { default: '100px', type: String },

    // 表单的显示样式，如果为真，则是行内显示
    inline: { default: false, type: Boolean },

    // 是否显示表格的序号，如果为真，则显示表格的序号
    index: { default: false, type: Boolean },

    // 表格与表单的字段不一致时，传入作为表格的表头
    table: { default: () => ({}), type: Object }
  },
  data() {
    return {
      dialog: {
        status: 0,
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
      return Object.keys(this.table).length ? this.table : this.labels
    }
  },
  methods: {
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
      })
    },
    showDialog() {
      this.$emit('open')
    },
    closeDialog() {
      this.$emit('close')
    },
    handleOpen() {
      if (this.$refs.form) {
        this.$refs.form.resetFields()
      }
    },
    Submit() {
      this.$refs.form.validate(valid => {
        if (valid) {
          this.$emit('submit', this.dialog.status)
        }
      })
    },
    repeated(key, value, self) {
      if (value === self) return false
      return this.data.find(item => item[key] === value) ? true : false
    },
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
  float: left;
  padding: 0 8px;
  box-sizing: border-box;
}
</style>

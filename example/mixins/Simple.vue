<template>
<div>
  <crud :data="data" :form="form" :rules="rules" :fields="mapItems" index
    :editing="editing" @open="handleOpen" @close="handleClose"
    @create="handleCreate" @update="handleUpdate" @destroy="handleDestroy" @submit="handleSubmit"/>
</div>
</template>

<script>
import CRUD from '../../dist/crud.common'
export default {
  components: { crud: CRUD },
  data() {
    return {
      data: [],

      form: {},

      editing: false,

      mapItems: {
        // user implement
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
          rules[k] = mapItems[k].rules.concat({ pattern: /^\S.*?$/, message: '不允许以空格开头' })
        }
      }
      return rules
    }
  },
  methods: {
    loadData() {}, // user implement
    handleCreate() {
      this.form = { ...this.model }
    },
    handleUpdate(row, index) {
      this.form = { ...row }
    },
    handleDestroy(row, index) {}, // user implement
    handleOpen() {
      this.editing = true
    },
    handleClose() {
      this.editing = false      
    },
    handleSubmit(status) {
      if (status === 0) {

      } else {

      }
    }, // user implement
    createSuccess(data) {
      this.loadData()
      this.handleClose()
    },
    updateSuccess() {
      this.loadData()
      this.handleClose()
    },
    deleteSuccess(data) {
      this.loadData()
    }
  }
}
</script>

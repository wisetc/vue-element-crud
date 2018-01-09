import CRUD from '../Crud.vue'

export default {
  components: { crud: CRUD },
  data() {
    return {
      data: [],

      form: {},

      fields: {
        // user implement
      }
    }
  },

  computed: {
    model() {
      let model = {}
      let fields = this.fields
      for (let k in fields) {
        model[k] = null
      }
      return model
    },

    rules() {
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
    loadData() {}, // user implement

    handleCreate() {
      this.form = { ...this.model }
    },
    
    handleUpdate(row, index) {
      this.form = { ...row }
    },
    
    handleDestroy(row, index) {}, // user implement

    handleSubmit(status, closeDialog) {
      const submitSuccess = (data) => {
        this.loadData()
        closeDialog()
      }

      if (status === 0) {
        
      } else {

      }
    }, // user implement
  }
}

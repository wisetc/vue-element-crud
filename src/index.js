import CRUD from './Crud.vue'
import CRUDInline from './CrudInline.vue'
import Simple from './mixins/Simple'
import fields from './fields'
import report from './report'

const install = (Vue, opt) => {
  Vue.component('crud', CRUD)
  Vue.component('crud-inline', CRUDInline)
  Vue.prototype.$report = report
}

if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue);
}

export default {
  install
}

export {
  fields,
  CRUD,
  Simple
}

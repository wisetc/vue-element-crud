import Vue from 'vue'
import App from './App.vue'

import "element-ui/lib/theme-chalk/index.css"
import ElementUI from 'element-ui'
import CRUD from '../../dist/crud.common'

Vue.use(ElementUI)
Vue.use(CRUD)

new Vue({
  el: '#app',
  render: h => h(App)
})

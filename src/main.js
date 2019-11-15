import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify';
import router from './router'
import '@progress/kendo-ui'
import '@progress/kendo-theme-default/dist/all.css'

// import { Editor } from '@progress/kendo-editor-vue-wrapper'
// import { EditorTool } from '@progress/kendo-editor-vue-wrapper'
import { EditorInstaller } from '@progress/kendo-editor-vue-wrapper'

Vue.use(EditorInstaller)

Vue.config.productionTip = false

new Vue({
  vuetify,
  router,
  render: h => h(App)
}).$mount('#app')

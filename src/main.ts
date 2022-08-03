import { createApp } from 'vue'
// import { registerApp } from './global'
import 'normalize.css'
import './assets/css/index.less'

// 引入element-ui 图标
import * as ElementPlusIconsVue from '@element-plus/icons-vue'

import App from './App.vue'
import router from './router'
import store from './store'
import { setupStore } from './store'

const app = createApp(App)
// 引入所有图标
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}
// registerApp(app)
app.use(store)
setupStore()
app.use(router)

app.mount('#app')

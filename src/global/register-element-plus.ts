import { App } from 'vue'
import 'element-plus/theme-chalk/base.css'
// import 'element-plus/theme-chalk/index.css'

import { ElButton, ElAlert } from 'element-plus/lib/components'

const components = [ElButton, ElAlert]

export default function (app: App): void {
  for (const component of components) {
    console.log(component)
    app.component(component.name, component)
  }
}

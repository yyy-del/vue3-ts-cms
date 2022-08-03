import { App } from 'vue'
import registerElementPlus from './register-element-plus'

export function registerApp(app: App): void {
  registerElementPlus(app)
}

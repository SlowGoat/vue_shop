import Vue from 'vue'
import { Button, Form, FormItem, Input, Message } from 'element-ui'

Vue.use(Button)
Vue.use(Form)
Vue.use(FormItem)
Vue.use(Input)

//消息弹框组件 需要挂载到全局（方便每个组件调用）
Vue.prototype.$message = Message
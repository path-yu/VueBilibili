import Vue from 'vue'
import App from './App.vue'
import router from './router'

import Vant from "vant";
import { Toast } from 'vant'
import 'vant/lib/index.css';
//引入封装的axios请求
import http from "../http";
Vue.prototype.$http = http// 将axios挂载到vue实例上, 方便调用
Vue.prototype.$msg = Toast;

Vue.use(Vant)
Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')

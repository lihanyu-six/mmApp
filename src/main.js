// 导入
import Vue from 'vue'
import App from './App.vue'
import router from './router/index'
import ElementUI from 'element-ui';
import axios from 'axios';
import 'element-ui/lib/theme-chalk/index.css';
import '@/style/index.css'

Vue.prototype.$axios = axios

// 注册
Vue.use(ElementUI);

Vue.config.productionTip = false

// window.console.log(process.env.VUE_APP_NAME)

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')

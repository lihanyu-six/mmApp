// 导入
import Vue from 'vue'
import App from './App.vue'
import router from './router/index'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import './style/index.css'

// 注册
Vue.use(ElementUI);

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')

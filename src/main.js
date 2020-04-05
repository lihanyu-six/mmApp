// 导入
import Vue from 'vue'
import App from './App.vue'
import router from './router/index'
import store from './store/index'
import ElementUI from 'element-ui';

// 导入富文本编辑器
import VueQuillEditor from 'vue-quill-editor'
import 'quill/dist/quill.core.css' // import styles
import 'quill/dist/quill.snow.css' // for snow theme
import 'quill/dist/quill.bubble.css' // for bubble theme
Vue.use(VueQuillEditor, /* { default global options } */)

// import axios from 'axios';
// Vue.prototype.$axios = axios
import 'element-ui/lib/theme-chalk/index.css';
import '@/style/index.css'
import "./filters/timeFilter"

// 导入子组件，然后全局注册
import enterCom from './components/enterCom.vue'
import subjectCom from './components/subjectCom.vue'
import myCity from './components/myCity.vue'

Vue.component('enterCom',enterCom);
Vue.component('subjectCom',subjectCom);
Vue.component('myCity',myCity)

// 注册
Vue.use(ElementUI);

Vue.config.productionTip = false

// window.console.log(process.env.VUE_APP_NAME)

new Vue({
  store,
  router,
  render: h => h(App),
}).$mount('#app')

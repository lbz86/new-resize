import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import dataV from '@jiaminghi/data-view'
//echarts图表
import echarts from 'echarts';
Vue.prototype.$echarts = echarts
Vue.use(ElementUI);
Vue.use(dataV)
// import VueDragResize from 'vue-drag-resize'
// Vue.component('vue-drag-resize', VueDragResize)
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

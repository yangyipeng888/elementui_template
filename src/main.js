import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

Vue.config.productionTip = false

// element ui
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI);

import Const from './util/const'
import Common from './util/common'
Vue.prototype.const = Const;
Vue.prototype.common = Common;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

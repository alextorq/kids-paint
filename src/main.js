import Vue from 'vue'
import App from './App.vue'
import router from './router'
import Notifications from 'vue-notification'

Vue.use(Notifications);
Vue.config.production = false;

new Vue({
  router,
  render: h => h(App)
}).$mount('#app');

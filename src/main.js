import Vue from 'vue'
import App from './App.vue'
import Axios from 'axios'
import router from './router'
import vuetify from './plugins/vuetify';

Vue.prototype.$http = Axios;
Vue.prototype.$apiUrl = 'http://localhost/PAWTubesUAS/BackendTubes-master/index.php/';

Vue.config.productionTip = false

new Vue({
  render: h => h(App), 
  router, 
  vuetify, 
  components: { App } 
}).$mount('#app')

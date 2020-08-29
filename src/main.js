import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import firebase from 'firebase'
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import VueClipboard from 'vue-clipboard2'
Vue.use(VueClipboard)
Vue.config.productionTip = false
// Install BootstrapVue
Vue.use(BootstrapVue)
// Optionally install the BootstrapVue icon components plugin
Vue.use(IconsPlugin)
const firebaseConfig = {
  apiKey: "AIzaSyCbToqmEp2QiocdNRv5Q2B6psDc-k2sC7g",
  authDomain: "pokemoncard-31df1.firebaseapp.com",
  databaseURL: "https://pokemoncard-31df1.firebaseio.com",
  projectId: "pokemoncard-31df1",
  storageBucket: "pokemoncard-31df1.appspot.com",
  messagingSenderId: "1005753857893",
  appId: "1:1005753857893:web:26ace42f0740f8110f538c"
};
firebase.initializeApp(firebaseConfig);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

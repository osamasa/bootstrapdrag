import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import Input from './views/Input.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'input',
      component: Input
    },
    {
      path: '/mydeck',
      name: 'home',
      component: Home
    },      
  ]
})

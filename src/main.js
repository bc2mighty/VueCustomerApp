// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import VueRouter from 'vue-router'
import vueResource from 'vue-resource'
import Customers from './components/Customers'
import About from './components/About'
import Add from './components/Add'
import CustomerDetails from './components/CustomerDetails'
import Edit from './components/Edit'

Vue.use(vueResource)
Vue.use(VueRouter)

const router = new VueRouter({
  mode: 'history',
  base: __dirname,
  routes:[
    {path: '/', component: Customers},
    {path: '/about', component: About},
    {path: '/add', component: Add},
    {path: '/customer/:email_address', component: CustomerDetails},
    {path: '/customer/edit/:email_address', component: Edit}
  ]
})

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  router,
  template: `
    <div id="app">
      <nav class="navbar navbar-expand-lg navbar-dark bg-dark bg-light">
        <a class="navbar-brand" href="#">vCustomers</a>
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
          <div class="navbar-nav">
            <router-link to="/" class="nav-item nav-link active">Home</router-link>
            <router-link to="/about" class="nav-item nav-link">About</router-link>
          </div>
          <div class="navbar-nav navbar-right">
            <router-link to="/add" class="nav-item nav-link">Add Customer</router-link>
          </div>
        </div>
      </nav>
      <router-view></router-view>
    </div>
  `
}).$mount("#app")

import Vue from 'vue'
import Router from 'vue-router'
import Header from '../components/Header'
import search from '../components/Search'
import subject from '../components/Subject'

Vue.use(Router)

export default new Router({
  routes: [{
      path: '/',
      name: 'Header',
      component: Header
    },
    {
      path: '/search',
      name: 'search',
      component: search
    },
    {
      path: '/subject/:id',
      name: 'subject',
      component: subject
    }
  ]
})

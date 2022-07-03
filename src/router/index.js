import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
  {
    path: '/master/item',
    name: 'MasterView',  
    component: () => import('../views/master/indexItem.vue'),  
  },
  {
    path: '/master/trx',
    name: 'TrxView',  
    component: () => import('../views/master/indexTrx.vue'),  
  },
  {
    path: '/contact',
    name: 'Contact',
    component: () => import('../views/contact/'),
  },
  {
    path: '/tools',
    name: 'Tools',
    component: () => import('../views/tools/'),
  },
  {
    path: '/tools/calc',
    name: 'Calculator',
    component: () => import('../views/tools/calc'),
  },
  // {
  //   path: '/tools/todo',
  //   name: 'Todo',
  //   component: () => import('../views/tools/todo'),
  // },
  {
    path: '/tools/items',
    name: 'Item List Calculate',
    component: () => import('../views/tools/items'),
  },
]

const router = new VueRouter({
  routes
})

export default router

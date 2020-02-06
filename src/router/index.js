import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import UpdateSingleTodo from '../components/UpdateSingleTodo'

Vue.use(VueRouter)

const routes = [{
    path: '/',
    name: 'home',
    component: Home,
    props: true
  },
  {
    path: '/:id',
    component: UpdateSingleTodo,
    props: true
  }
]

const router = new VueRouter({
  mode: 'history',
  routes
})

export default router
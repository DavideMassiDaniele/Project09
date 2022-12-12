import Vue from 'vue'
import VueRouter from 'vue-router'
import Main from '../views/Main.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Main',
    component: Main
  },
  {
    path: '/sequencediagram',
    name: 'Sequence diagrams',
    component: () => import('../views/SequenceDiagram.vue')
  },
  {
    path: '/documentation',
    name: 'Documentation',
    component: () => import('../views/Documentation.vue')
  },
  {
    path: '/people',
    name: 'People',
    component: () => import('../views/People.vue')
  },
  {
    path: '/publications',
    name: 'Publications',
    component: () => import('../views/Publications.vue')
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router

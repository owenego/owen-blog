import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/home',
    name: 'home',
    component: Home
  },
  {
    path: '/category',
    name: 'category',
    component: () => import(/* webpackChunkName: "category" */ '../views/Category.vue')
  },
  {
    path: '/news',
    name: 'news',
    component: () => import(/* webpackChunkName: "news" */ '../views/News.vue')
  },
  {
    path: '/blog',
    name: 'blog-list',
    component: () => import(/* webpackChunkName: "blog-list" */ '../views/BlogList.vue')
  },
  {
    path: '/blog/post',
    name: 'blog-post',
    component: () => import(/* webpackChunkName: "blog-post" */ '../views/BlogPost.vue')
  },
  {
    path: '/blog/:id',
    name: 'blog',
    component: () => import(/* webpackChunkName: "blog" */ '../views/Blog.vue')
  },
  {
    path: '/login',
    name: 'login',
    component: () => import(/* webpackChunkName: "login" */ '../views/Login.vue')
  },
  {
    path: '*',
    redirect: '/news',
  },
]

const router = new VueRouter({
  mode: 'hash',
  routes
})

export default router

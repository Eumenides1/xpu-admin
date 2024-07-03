import { createRouter, createWebHashHistory } from 'vue-router'
import Layout from '@/layout/index.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Layout,
    redirect: '/article',
    children: [
      {
        path: 'article',
        name: '文章管理',
        meta: {
          requiresAuth: true,
          icon: 'document-copy'
        },
        redirect: '/article/all',
        children: [
          {
            path: '/article/all',
            name: '全部文章',
            meta: {
              requiresAuth: true,
              icon: 'collection'
            },
            component: ()=> import('@/views/articles/AllArticles.vue'),
          },
          {
            path: '/article/me',
            name: '我的文章',
            meta: {
              requiresAuth: true,
              icon: 'document-checked'
            },
            component: () => import('@/views/articles/MyArticles.vue')
          }
        ]
      }
    ]
  },
  {
    path: '/register',
    name: 'register',
    component: () => import("@/views/register/index.vue")
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})


export default router

import { createRouter, createWebHashHistory } from 'vue-router'
import Layout from '@/layout/index.vue'
import component from 'element-plus/es/components/tree-select/src/tree-select-option.mjs'
import { useUserStore } from '@/store/user'

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
      },
      {
        path: 'personal',
        name: '个人设置',
        meta: {
          requiresAuth: true,
          icon: 'collection'
        },
        children: [
          {
            path: '/personal/me',
            name: '个人信息',
            meta: {
              requiresAuth: true,
              icon: 'collection'
            },
            component: () => import('@/views/personal/index.vue')
          }
        ]
      }
    ]
  },
  {
    path: '/register',
    name: 'register',
    component: () => import("@/views/register/index.vue")
  },
  {
    path: '/login',
    name: 'login',
    component: () => import("@/views/login/index.vue")
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

router.beforeEach((to) => {
  const useStore = useUserStore();
  const { isLoggedIn } = useStore;
  if (to.meta.requiresAuth && !isLoggedIn) {
    return {
      name: 'login'
    }
  }
})

export default router

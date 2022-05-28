import { createRouter, createWebHashHistory } from 'vue-router'

const Layout = (resolve) => require(['@/layout/index'], resolve)

export const constantRoutes = [
  {
    path: '/redirect',
    component: Layout,
    hidden: true,
    children: [
      {
        path: '/redirect/:path(.*)',
        component: () => import('@/views/redirect')
      }
    ]
  },
  {
    path: '/login',
    component: () => import('@/views/login/index.vue'),
    meta: {
      title: '登录'
    }
  },
  {
    path: '/404',
    component: () => import('@/views/error-page/404.vue'),
    meta: {
      title: '404'
    }
  },
  {
    path: '/401',
    component: () => import('@/views/error-page/401.vue'),
    meta: {
      title: '401'
    }
  },
  {
    path: '/',
    component: () => import('@/layout/index.vue'),
    redirect: '/home',
    children: [
      {
        path: '/home',
        component: () => import('@/views/home/index.vue'),
        name: 'Home',
        meta: { title: '首页', icon: 'icon-shouye', affix: true }
      },
      {
        path: '/setting',
        component: () => import('@/views/setting/index.vue'),
        name: 'Setting',
        meta: { title: '设置', icon: 'icon-yiyuanguanli', roles: ['admin'] }
      },
      {
        path: '/example',
        component: () => import('@/views/example/index.vue'),
        name: 'Example',
        meta: { title: '示例', icon: 'icon-quanke', roles: ['admin', 'editor'] },
        children: [
          {
            path: '/example/table',
            component: () => import('@/views/example/table/index.vue'),
            name: 'Table',
            meta: { title: 'Table', icon: 'icon-shouye'}
          },
          {
            path: '/example/tree',
            component: () => import('@/views/example/tree/index.vue'),
            name: 'Tree',
            meta: { title: 'Tree', icon: 'icon-shouye'}
          },
        ]
      }
    ]
  }
]

export const asyncRoutes = []

export const router = createRouter({
  history: createWebHashHistory(),
  routes: constantRoutes
})

export default router

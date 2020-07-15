import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']    control the page roles (you can set multiple roles)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'/'el-icon-x' the icon show in the sidebar
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
export const constantRoutes = [
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },

  {
    path: '/404',
    component: () => import('@/views/404'),
    hidden: true
  },

  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    children: [{
      path: 'dashboard',
      name: 'Dashboard',
      component: () => import('@/views/softwareLibrary/index'),
      meta: { title: '软件库', icon: 'dashboard' }
    }]
  },

  {
    path: '/installed',
    component: Layout,
    children: [{
      path: 'installed',
      name: 'installed',
      component: () => import('@/views/softwareLibrary/index'),
      meta: { title: '已安装', icon: 'example' }
    }]
  },

  {
    path: '/history',
    component: Layout,
    children: [{
      path: 'history',
      name: 'history',
      component: () => import('@/views/table/history'),
      meta: { title: '日志', icon: 'nested' }
    }]
  },

  {
    path: '/userManage',
    component: Layout,
    children: [{
      path: 'userManage',
      name: 'userManage',
      component: () => import('@/views/table/userManage'),
      meta: { title: '用户管理', icon: 'nested' }
    }]
  },

  // {
  //   path: '/userManage',
  //   component: Layout,
  //   redirect: '/userManage/userManage',
  //   name: 'UserManage',
  //   meta: { title: '用户管理', icon: 'form' },
  //   children: [
  //     {
  //       path: 'userManage',
  //       name: 'userManage',
  //       component: () => import('@/views/table/userManage'),
  //       meta: { title: '用户管理', icon: 'table' }
  //     },
  //     {
  //       path: 'treeType',
  //       name: 'TreeType',
  //       component: () => import('@/views/tree/index'),
  //       meta: { title: '级别管理', icon: 'tree' }
  //     }
  //   ]
  // },

  {
    path: '/apply',
    component: Layout,
    children: [{
      path: 'apply',
      name: 'apply',
      component: () => import('@/views/table/applyList'),
      meta: { title: '申请列表', icon: 'el-icon-s-help' }
    }]
  },
  {
    path: '/softManage',
    component: Layout,
    children: [{
      path: 'softManage',
      name: 'softManage',
      component: () => import('@/views/table/softwareManage'),
      meta: { title: '软件管理', icon: 'table' }
    }]
  },

  // 404 page must be placed at the end !!!
  { path: '*', redirect: '/404', hidden: true }
]

const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router

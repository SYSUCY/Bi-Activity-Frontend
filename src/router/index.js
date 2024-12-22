import {createRouter, createWebHistory} from 'vue-router'

const routes = [
  {
    path: '/Test',
    name: 'Test',
    component: () => import('@/pages/home/TestPage.vue')
  },
  {
    path: '/',
    name: 'Home',
    component: () => import('@/pages/home/HomePage.vue')
  },
  // TODO: 搜索页面
  {
    path: '/activityQuery',
    name: 'ActivityQuery',
    component: () => import('@/pages/home/ActivityQueryPage.vue')
  },
    // TODO: 我的活动页面
  {
    path: '/myActivity',
    name: 'MyActivity',
    component: () => import('@/pages/home/MyActivityPage.vue')
  },
    // TODO: 活动详情页面
    // TODO: 活动报名页面
    // TODO: 帮助页面
  {
    path: '/helpCenter',
    name: 'HelpCenter',
    component: () => import('@/pages/home/HelpCenterPage.vue')
  },
  {
    path: "/login", 
    component: () => import("@/pages/LoginPage.vue"),
    children: [ // 子路由
      {
        path: '',
        component: import("@/pages/login/LoginDefaultPage.vue")
      },
      {
        path: 'student', // 学生登录
        component: import("@/pages/login/StudentLoginPage.vue")
      },
      {
        path: 'college', // 学院登录
        component: import("@/pages/login/CollegeLoginPage.vue")
      }
    ]
  },
  {
    path: "/register", 
    component: () => import("@/pages/RegisterPage.vue"),
    children: [ // 子路由
      {
        path: '',
        component: import("@/pages/register/RegisterDefaultPage.vue")
      },
      {
        path: 'student', // 学生注册
        component: import("@/pages/register/StudentRegisterPage.vue")
      },
      {
        path: 'college', // 学院注册
        component: import("@/pages/register/CollegeRegisterPage.vue")
      }
    ]
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
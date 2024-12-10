import {createRouter, createWebHistory} from 'vue-router'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('@/pages/HomePage.vue')
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
          path: 'student', // 学生登录
          component: import("@/pages/register/StudentRegisterPage.vue")
      },
      {
          path: 'college', // 学院登录
          component: import("@/pages/register/CollegeRegisterPage.vue")
      }
    ]
  },
  {
    path: '/personalCenter',
    component: () => import('@/pages/PersonalCenter/Layout.vue'), // 父级布局组件
    children: [
      {
        path: 'personalInfo',
        name: 'PersonalInfo',
        component: () => import('@/pages/PersonalCenter/PersonalInfo.vue'), // 个人资料页面
      },
    ],
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
import {createRouter, createWebHistory} from 'vue-router'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('@/pages/HomePage.vue'),
    meta: {requiresAuth: true}
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
  {
    path: '/change-password/student',
    component: () => import('@/pages/forget/StudentForgetPage.vue'),
  },
  {
    path: '/change-password/college',
    component: () => import('@/pages/forget/CollegeForgetPage.vue'),
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
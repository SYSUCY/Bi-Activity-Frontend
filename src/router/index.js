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
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
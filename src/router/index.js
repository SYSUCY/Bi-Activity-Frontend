import {createRouter, createWebHistory} from 'vue-router'
import {useStudentStore} from "@/stores/student.js";

const routes = [
  {
    path: '/Test',
    name: 'Test',
    component: () => import('@/pages/home/TestPage.vue')
  },
  {
    path: '/',
    name: 'Home',
    component: () => import('@/pages/home/HomePage.vue'),

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
    component: () => import('@/pages/home/MyActivityPage.vue'),
    meta: {
      requiresAuth: true
    }  // 添加此行
  },
    // TODO: 活动详情页面
  {
    path: '/activityDetail/:id',
    name: 'ActivityDetail',
    component: () => import('@/pages/home/ActivityDetailPage.vue')
  },
    // TODO: 活动报名页面
    // TODO: 帮助页面
  {
    path: '/helpCenter',
    name: 'HelpCenter',
    component: () => import('@/pages/home/HelpCenterPage.vue')
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

// 全局前置守卫
router.beforeEach((to, from, next) => {
  if (to.meta.requiresAuth && !isAuthenticated()) {
    alert('请先登录')
    next('/login');  // 如果未登录，重定向到登录页面
  } else {
    next();  // 否则继续导航
  }
});


function isAuthenticated() {
  const studentStore = useStudentStore();
  const { token, expireDate } = studentStore.data;
  if (!token || !expireDate) return false;

  const now = new Date().getTime();
  const expiryTime = new Date(expireDate).getTime();

  return now < expiryTime;
}

export default router
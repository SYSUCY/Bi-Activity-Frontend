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
    path: '/studentPersonalCenter',
    component: () => import('@/pages/studentPersonalCenter/Layout.vue'), // 父级布局组件
    children: [
      {
        path: 'personalInfo',
        name: 'personalInfo',
        component: () => import('@/pages/studentPersonalCenter/PersonalInfo.vue'), // 个人资料页面
      },
      {
        path: 'affiliatedOrganizations',
        name: 'affiliatedOrganizations',
        component: () => import('@/pages/studentPersonalCenter/AffiliatedOrganizations.vue'),//归属组织
      },
      {
        path: 'myMessages',
        name: 'myMessages',
        component: () => import('@/pages/studentPersonalCenter/MyMessages.vue'),//我的消息
      },
      {
        path: 'activityRecords',
        name: 'activityRecords',
        component: () => import('@/pages/studentPersonalCenter/ActivityRecords.vue'),//活动记录
      },
      {
        path: 'publishActivity',
        name: 'publishActivity',
        component: () => import('@/pages/studentPersonalCenter/PublishActivity.vue'),//发布活动
      },
      {
        path: 'activityAdmissions',
        name: 'activityAdmissions',
        component: () => import('@/pages/studentPersonalCenter/ActivityAdmissions.vue'),//活动录取
      },
      {
        path: 'securitySettings',
        name: 'SecuritySettings',
        component: () => import('@/pages/studentPersonalCenter/SecuritySettings.vue'), // 安全设置
      },
    ],
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
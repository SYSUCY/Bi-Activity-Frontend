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
    component: () => import('@/pages/student-personal-center/Layout.vue'), // 更新路径
    children: [
      {
        path: 'personalInfo',
        name: 'personalInfo',
        component: () => import('@/pages/student-personal-center/components/PersonalInfo.vue'),
      },
      {
        path: 'affiliatedOrganizations',
        name: 'affiliatedOrganizations',
        component: () => import('@/pages/student-personal-center/components/AffiliatedOrganizations.vue'),
      },
      {
        path: 'myMessages',
        name: 'myMessages',
        component: () => import('@/pages/student-personal-center/components/MyMessages.vue'),
      },
      {
        path: 'activityRecords',
        name: 'activityRecords',
        component: () => import('@/pages/student-personal-center/components/ActivityRecords.vue'),
      },
      {
        path: 'publishActivity',
        name: 'publishActivity',
        component: () => import('@/pages/student-personal-center/components/PublishActivity.vue'),
      },
      {
        path: 'activityAdmissions',
        name: 'activityAdmissions',
        component: () => import('@/pages/student-personal-center/components/ActivityAdmissions.vue'),
      },
      {
        path: 'securitySettings',
        name: 'securitySettings', 
        component: () => import('@/pages/student-personal-center/components/SecuritySettings.vue'),
      },
    ],
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
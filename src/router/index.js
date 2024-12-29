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
      requiresAuth: true,
      role: 'student',
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
    component: () => import('@/pages/home/HelpCenterPage.vue'),
  },

  // 登录注册路由
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
      },
      {
        path: 'admin', // 管理员登录
        component: import("@/pages/login/AdminLoginPage.vue")
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

  // 学生个人中心路由
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
    meta: {
      requiresAuth: true,
      role:'student'
    }
  },

  // 学院个人中心路由
  {
    path: "/collegePersonalCenter",
    component: () => import("@/pages/college/CollegePersonalCenterPage.vue"),
    children: [
      {
        path: '',
        component: import("@/pages/college/personalCenter/CollegeInfoPage.vue")
      },
      {
        path: 'collegeInfo',
        component: import("@/pages/college/personalCenter/CollegeInfoPage.vue")
      },
      {
        path: 'personalInfo',
        component: import("@/pages/college/personalCenter/PersonalInfoPage.vue")
      },
      {
        path: 'myNews',
        component: import("@/pages/college/personalCenter/MyNewsPage.vue")
      },
      {
        path: 'securitySettings',
        component: import("@/pages/college/personalCenter/SecuritySettingsPage.vue")
      }
    ],
    meta: {requiresAuth: true, role: 'college'}
  },
  // 人员管理
  {
    path: "/collegeMemberManagement",
    component: () => import("@/pages/college/CollegePersonalCenterPage.vue"),
    children: [
      {
        path: "joinOrgReview",
        component: import("@/pages/college/memberManagement/JoinOrgReviewPage.vue")
      },
      {
        path: "memberQuery",
        component: import("@/pages/college/memberManagement/MemberQueryPage.vue")
      }
    ],
    meta: {requiresAuth: true, role: 'college'}
  },
  // 活动管理
  {
    path: "/collegeActivityManagement",
    component: () => import("@/pages/college/CollegePersonalCenterPage.vue"),
    children: [
      {
        path: "activityRelease",
        component: import("@/pages/college/activityManagement/ActivityReleasePage.vue")
      },
      {
        path: "activityQuery",
        component: import("@/pages/college/activityManagement/ActivityQueryPage.vue")
      },
      {
        path: "activityReview",
        component: import("@/pages/college/activityManagement/ActivityReviewPage.vue")
      },
      {
        path: "activityAdmission",
        component: import("@/pages/college/activityManagement/ActivityAdmissionPage.vue")
      }
    ],
    meta: {requiresAuth: true, role: 'college'}
  },
  // 管理员相关路由
  {
    path: "/admin",
    component: () => import("@/pages/admin/AdminPage.vue"),
    meta: {requiresAuth: true, role: 'admin'}
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})
export default router
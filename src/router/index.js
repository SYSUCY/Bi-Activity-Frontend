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

  // 学院个人中心路由
  // 个人中心
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
    ]
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
    ]
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
    ]
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
export const routes = [
  // Auth routes
  {
    path: '',
    component: () => import('~/layouts/AuthLayout.vue'),
    children: [
      {
        path: '/login',
        name: 'Login',
        component: () => import('~/views/auth/Login.vue'),
      },
      {
        path: '/register',
        name: 'Register',
        component: () => import('~/views/auth/Register.vue'),
      },
      {
        path: '/teacher/login',
        name: 'TeacherLogin',
        component: () => import('~/views/auth/TeacherLogin.vue'),
      },
    ],
  },
  // Main app routes (protected)
  {
    path: '',
    component: () => import('~/layouts/AppLayout.vue'),
    meta: { requiresAuth: true },
    redirect: '/my/courses',
    children: [
      // Student routes
      {
        path: '/discover/courses',
        name: 'Discover',
        component: () => import('~/views/student/Discover.vue'),
        meta: { requiresTeacher: false },
      },
      {
        path: '/my/courses',
        name: 'MyCourses',
        component: () => import('~/views/student/MyCourses.vue'),
        meta: { requiresTeacher: false },
      },
      // Teacher routes
      {
        path: '/teacher/courses',
        name: 'TeacherCourses',
        component: () => import('~/views/teacher/TeacherCourses.vue'),
        meta: { requiresTeacher: true },
      },
      {
        path: '/teacher/courses/new',
        name: 'NewCourse',
        component: () => import('~/views/teacher/NewCourse.vue'),
        meta: { requiresTeacher: true },
      },
      // Game
      {
        path: '/game',
        name: 'Game',
        component: () => import('~/views/Game.vue'),
        alias: '',
      },
    ],
  },
]

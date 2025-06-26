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
      {
        path: '/profile',
        name: 'MyProfile',
        component: () => import('~/views/student/MyProfile.vue'),
      },
      {
        path: '/courses/:id',
        name: 'CourseDetails',
        component: () => import('~/views/student/CourseDetails.vue'),
        meta: { requiresTeacher: false },
      },
      {
        path: '/courses/:id/classes',
        name: 'Classes',
        component: () => import('~/views/student/Classes.vue'),
        meta: { requiresTeacher: false },
      },
      {
        path: '/courses/:id/classes/:classId',
        name: 'StudentClassesDetails',
        component: () => import('~/views/student/ClassDetails.vue'),
        meta: { requiresTeacher: false },
      },
      {
        path: '/teachers/:id/profile',
        name: 'TeacherProfile',
        component: () => import('~/views/student/TeacherProfile.vue'),
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
      {
        path: '/teacher/courses/:id',
        name: 'TeacherCourseDetails',
        component: () => import('~/views/teacher/CourseDetails.vue'),
        meta: { requiresTeacher: true },
      },
      {
        path: '/teacher/courses/:id/edit',
        name: 'EditCourse',
        component: () => import('~/views/teacher/EditCourse.vue'),
        meta: { requiresTeacher: true },
      },
      {
        path: '/teacher/courses/:id/class',
        name: 'CreateClass',
        component: () => import('~/views/teacher/class/Create.vue'),
        meta: { requiresTeacher: true },
      },
      {
        path: '/teacher/courses/:id/class/:classId/view',
        name: 'ViewClass',
        component: () => import('~/views/teacher/class/Details.vue'),
        meta: { requiresTeacher: true },
      },
      {
        path: '/teacher/courses/:id/class/:classId/edit',
        name: 'EditClass',
        component: () => import('~/views/teacher/class/Edit.vue'),
        meta: { requiresTeacher: true },
      },
      {
        path: '/teacher/courses/:id/classes/:classId',
        name: 'ClassesDetails',
        component: () => import('~/views/student/ClassDetails.vue'),
        meta: { requiresTeacher: true },
      },
      {
        path: '/game',
        name: 'Game',
        component: () => import('~/views/Game.vue'),
        alias: '',
      },
      {
        path: '/chat/:id',
        name: 'Chat',
        component: () => import('~/views/course/Chat.vue'),
      },
    ],
  },
]

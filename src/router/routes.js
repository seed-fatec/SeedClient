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
        path: '/teacher-login',
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
    redirect: '/home',
    children: [
      {
        path: '/home',
        name: 'Home',
        component: () => import('~/views/Home.vue'),
        alias: '',
      },
      {
        path: '/game',
        name: 'Game',
        component: () => import('~/views/Game.vue'),
        alias: '',
      },
    ],
  },
]

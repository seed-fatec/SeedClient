export const routes = [
  {
    path: '',
    component: () => import('~/layouts/AppLayout.vue'),
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

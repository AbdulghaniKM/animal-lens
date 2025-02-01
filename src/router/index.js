import { createRouter, createWebHistory } from 'vue-router';

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('@/pages/index.vue'),
    },
    {
      path: '/animals/favorites',
      name: 'favorites',
      component: () => import('@/pages/fav.vue'),
    },
    {
      path: '/search',
      name: 'search',
      component: () => import('@/pages/search.vue'),
    },
  ],
});

export default router;

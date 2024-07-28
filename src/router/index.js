// src/router.js
import {createRouter, createWebHistory} from 'vue-router';
import HomePage from '../views/HomePage.vue';
import AboutPage from '../views/AboutPage.vue';
import RenameFileInsertPage from '../views/RenameFileInsertPage.vue';

const routes = [
  {
    path: '/',
    name: 'HomePage',
    component: HomePage
  },
  {
    path: '/about',
    name: 'AboutPage',
    component: AboutPage
  },
  {
    path: '/insert',
    name: 'RenameFileInsertPage',
    component: RenameFileInsertPage
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;
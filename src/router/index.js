// src/router.js
import {createRouter, createWebHistory} from 'vue-router';
import TextJoin from '../views/TextJoin.vue';
import TextDiff from '../views/TextDiff.vue';
import PositiveReview from '../views/PositiveReview.vue';
import RenameFileInsertPage from '../views/RenameFileInsertPage.vue';

const routes = [
  {
    path: '/text_join',
    name: 'TextJoin',
    component: TextJoin
  },
  {
    path: '/text_diff',
    name: 'TextDiff',
    component: TextDiff
  },
  {
    path: '/insert',
    name: 'RenameFileInsertPage',
    component: RenameFileInsertPage
  },
  {
    path: '/positive_review',
    name: 'PositiveReview',
    component: PositiveReview
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;
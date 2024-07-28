// src/main.js
import { createApp } from 'vue';
import App from './App.vue';
import router from './router/index.js';
import $ from 'jquery';
import './assets/tailwind.css'; // 引入 Tailwind CSS

const app = createApp(App);

window.$ = $; // 将 jQuery 暴露到全局
app.config.globalProperties.$ = $; // 将 jQuery 添加到全局属性中
app.use(router); // 使用路由
app.mount('#app');



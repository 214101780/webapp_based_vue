<!-- src/views/Home.vue -->
<template>
  <div>
    <h1>Home Page</h1>
    <div id="home-content"></div>
  </div>
</template>
  
  <script>

  export default {
    name: 'HomePage',
    mounted() {
      var $ = window.$;
      // 这里可以使用 jQuery 来操作 DOM
      $('#home-content').html('<p>This content is added by jQuery in Home page.</p>');
    },
  };
  </script>
  
  <style scoped>
  /* 添加你的样式 */
  </style>
  
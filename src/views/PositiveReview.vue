<!-- src/views/About.vue -->
<template>
  
  <div class="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
    <h2 class="text-2xl font-bold mb-4">外卖好评生成器</h2>
    <textarea id="reviewContent" class="w-full p-2 border border-gray-300 rounded mb-4" rows="4" placeholder="请输入好评内容...">好评！餐品美味，配送及时，服务周到！推荐！</textarea>
    <button id="copyButton" class="bg-blue-500 text-white py-2 px-4 rounded mb-4 w-full">一键复制</button>
    <div id="qrcode" class="flex justify-center"></div>
  </div>

</template>
  <script>
    export default {
      name: 'PositiveReview',
      mounted() {
        // var $ = window.$;
        // function generateQRCode(text) {
        //   $('#qrcode').empty(); // 清空之前的二维码
        //   new QRCode(document.getElementById("qrcode"), {
        //     text: text,
        //     width: 128,
        //     height: 128
        //   });
        // }

        // $('#copyButton').on('click', function() {
        //   var content = $('#reviewContent').val();
        //   navigator.clipboard.writeText(content).then(function() {
        //     alert('好评内容已复制！');
        //   }, function(err) {
        //     alert('复制失败，请手动复制。');
        //   });
        //   generateQRCode(content);
        // });

        // // 初始化生成默认文本的二维码
        // generateQRCode($('#reviewContent').val());
      }
    };

  </script>
  
  <style scoped>
  .container {
      max-width: 1200px;
  }
  .diff-container {
      display: flex;
      gap: 1rem;
  }
  .diff-item {
      flex: 1;
      padding: 1rem;
      border: 1px solid #d1d5db;
      background-color: #f9fafb;
      white-space: pre-wrap; /* 保留换行符 */
      overflow-x: auto; /* 支持水平滚动 */
  }
  .added { background-color: #d4f5d4; }
  .removed { background-color: #f5d4d4; }
  .hidden-content { color: transparent; }
  </style>
  
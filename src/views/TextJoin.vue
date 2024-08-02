<!-- src/views/Home.vue -->
<template>
  
  <div class="max-w-xl mx-auto my-8 bg-white p-8 rounded-lg shadow-md">
    <h1 class="text-2xl font-bold mb-4 text-slate-600">多行文本连接工具</h1>
    <textarea id="inputText" rows="6" class="w-full p-2 border rounded-md mb-4" placeholder="输入多行文本..."></textarea>
    <label for="delimiter" class="block mb-2">连接字符:</label>
    <input type="text" id="delimiter" class="w-full p-2 border rounded-md mb-4" placeholder="输入连接字符">
    <button id="joinBtn" class="bg-blue-500 text-white px-4 py-2 rounded-md">连接文本</button>
    <div id="result" class="result-container mt-4 p-4 bg-gray-200 rounded-md"></div>
    <button id="copyBtn" class="bg-green-500 text-white px-4 py-2 rounded-md mt-2 hidden">复制结果</button>
  </div>
  <div id="toast" class="toast">结果已复制到剪贴板</div>

</template>
  
<script>

  export default {
    name: 'TextJoin',
    mounted() {
      var $ = window.$;
      
      $('#joinBtn').click(function() {
        var text = $('#inputText').val();
        var delimiter = $('#delimiter').val();
        var lines = text.split('\n');
        var joinedText = lines.join(delimiter);
        
        $('#result').text(joinedText);
        $('#copyBtn').removeClass('hidden');
      });

      $('#copyBtn').click(function() {
        var tempTextarea = $('<textarea>');
        tempTextarea.val($('#result').text());
        $('body').append(tempTextarea);
        tempTextarea.select();
        document.execCommand('copy');
        tempTextarea.remove();

        $('#toast').fadeIn(400).delay(2000).fadeOut(400);
      });
    },
  };
</script>
  
<style scoped>
  .toast {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    padding: 10px 20px;
    background-color: rgba(0, 0, 0, 0.8);
    color: white;
    border-radius: 4px;
    display: none;
    z-index: 1000; /* 确保提示在最上层 */
  }
  .result-container {
    max-height: 200px;
    overflow-y: auto;
    white-space: pre-wrap;
    word-break: break-word;
  }
</style>
  
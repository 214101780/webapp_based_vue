<!-- src/views/About.vue -->
<template>
 
<div class="bg-gray-100 text-gray-800">
  <div class="container mx-auto px-4 py-8">
      <h1 id="rename-text" class="text-3xl font-bold mb-8 text-center text-slate-600">文件批量重命名工具</h1>
      
      <div id="browserWarning" class="hidden bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4" role="alert">
          <strong class="font-bold">警告：</strong>
          <span class="block sm:inline">该浏览器不支持文件操作接口，请下载Google浏览器再继续操作。</span>
      </div>

      <div class="bg-white shadow-md rounded-lg p-6 mb-8">
          <div class="mb-6">
              <div class="flex space-x-4">
                  <h2 id="文件导入" class="text-base text-slate-600 font-semibold mb-4 w-24">文件导入</h2>
                  <button id="importFiles" class="bg-blue-400 hover:bg-blue-500 text-white font-bold py-2 px-4 rounded">导入文件</button>
                  <button id="importFolder" class="bg-blue-400 hover:bg-blue-500 text-white font-bold py-2 px-4 rounded">导入文件夹</button>
              </div>
          </div>

          <div class="mb-6">
              <div class="flex space-x-4">
                  <h2 id="匹配规则" class="text-base text-slate-600 font-semibold mb-4 w-24">匹配规则</h2>
                  <select id="fileAttribute" class="border rounded py-2 px-3">
                      <option value="fileName">文件名</option>
                      <option value="extension">扩展名</option>
                  </select>
                  <select id="matchRule" class="border rounded py-2 px-3">
                      <option value="contains">包含</option>
                      <option value="equals">等于</option>
                  </select>
                  <input type="text" id="matchString" placeholder="指定字符串" class="border rounded py-2 px-3">
                  <button id="matchButton" class="bg-blue-400 hover:bg-blue-500 text-white font-bold py-2 px-4 rounded">匹配</button>
              </div>
          </div>

          <div class="mb-6">
              <div class="flex space-x-4">
                  <h2 id="重命名规则" class="text-base text-slate-600 font-semibold mb-4 w-24">重命名规则</h2>
                  <select id="insertPosition" class="border rounded py-2 px-3">
                      <option value="prefix">前缀</option>
                      <option value="suffix">后缀</option>
                      <option value="byString">按字符串所在位置插入</option>
                      <option value="byPosition">指定第N位插入</option>
                  </select>
                  <input type="text" id="insertString" placeholder="要插入的字符串" class="border rounded py-2 px-3">
                  <button id="generateNewNames" class="bg-blue-400 hover:bg-blue-500 text-white font-bold py-2 px-4 rounded">生成新文件名</button>
              </div>
          </div>

          <div class="mb-6">
              <div class="flex space-x-4">
                  <h2 id="重命名" class="text-base text-slate-600 font-semibold mb-4 w-24">重命名</h2>
                  <button id="executeRename" class="bg-red-400 hover:bg-red-500 text-white font-bold py-2 px-4 rounded">执行</button>
                  <button id="clearCache" class="bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded">清除上次操作记录</button>
                  <button id="restoreOriginal" class="bg-blue-400 hover:bg-blue-500 text-white font-bold py-2 px-4 rounded">恢复初始状态</button>
              </div>
          </div>
      </div>


      <div class="overflow-x-auto overflow-y-auto max-h-96 bg-white shadow-md rounded-lg">
          <table class="min-w-full divide-y divide-gray-200 rounded-lg overflow-hidden">
              <thead class="bg-gray-50">
                  <tr>
                      <th scope="col" class="px-6 py-3 text-left font-medium text-slate-600 uppercase tracking-wider">
                          匹配结果
                      </th>
                      <th scope="col" class="px-6 py-3 text-left font-medium text-slate-600 uppercase tracking-wider">
                          重命名名称
                      </th>
                      <th scope="col" class="px-6 py-3 text-left font-medium text-slate-600 uppercase tracking-wider min-w-24">
                          状态
                      </th>
                  </tr>
              </thead>
              <tbody class="bg-white divide-y divide-gray-200" id="fileTable">
                  <!-- Table rows will be dynamically inserted here -->
              </tbody>
          </table>
      </div>
  </div>
</div>

</template>
  
  <script>
    import { onMounted } from 'vue';
    import { initRenameTools } from '@/assets/rename.js';

    export default {
      name: 'RenameFileInsertPage',
      setup() {
        onMounted(() => {
          initRenameTools();
        });
      }
    };
  </script>
  
  <style scoped>
  /* 添加你的样式 */
  </style>
  
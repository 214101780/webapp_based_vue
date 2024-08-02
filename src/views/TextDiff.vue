<!-- src/views/About.vue -->
<template>
  

  <div class="container mx-auto p-4">
      <h1 class="text-2xl font-bold mb-4">文本对比工具</h1>
      <div class="flex space-x-4 mb-4">
          <div class="flex-1">
              <textarea id="text1" class="w-full h-40 p-2 border border-gray-300" placeholder="输入第一个文本"></textarea>
          </div>
          <div class="flex-1">
              <textarea id="text2" class="w-full h-40 p-2 border border-gray-300" placeholder="输入第二个文本"></textarea>
          </div>
      </div>
      <button id="compareButton" class="px-4 py-2 bg-blue-500 text-white rounded">对比文本</button>
      <div class="diff-container mt-4">
          <div id="result1" class="diff-item"></div>
          <div id="result2" class="diff-item"></div>
      </div>
  </div>



</template>
  <!-- <script src="https://cdn.jsdelivr.net/npm/diff/dist/diff.min.js"></script> -->
  
  <script>
    import Diff from 'diff';

    export default {
      name: 'TextDiff',
      data() {
        return {
          text1: '',
          text2: '',
          results: [],
          loading: false
        };
      },
      methods: {
        compareTexts() {
          this.loading = true;
          this.results = [];

          const diff = Diff.diffLines(this.text1, this.text2);

          let resultHtml1 = '';
          let resultHtml2 = '';

          diff.forEach(part => {
            const colorClass = part.added ? 'added' : (part.removed ? 'removed' : '');
            const hiddenClass = part.removed ? 'hidden-content' : '';

            if (part.added) {
              resultHtml1 += `<span class="${colorClass}">${part.value}</span>`;
              resultHtml2 += `<span class="bg-transparent">${part.value}</span>`;
            } else if (part.removed) {
              resultHtml1 += `<span class="bg-transparent">${part.value}</span>`;
              resultHtml2 += `<span class="${colorClass} ${hiddenClass}">${part.value}</span>`;
            } else {
              resultHtml1 += `<span class="${colorClass}">${part.value}</span>`;
              resultHtml2 += `<span class="${colorClass}">${part.value}</span>`;
            }
          });

          this.results = [resultHtml1, resultHtml2];
          this.loading = false;
        }
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
  
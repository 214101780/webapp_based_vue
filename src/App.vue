<template>
  <div id="app">
    
    <nav class="bg-slate-700">
      <div class="container mx-auto px-4">
        <div class="flex items-center justify-center h-16">
          <div class="flex items-center space-x-4">
            <!-- Logo -->
            <a href="#" class="flex-shrink-0">
              <img class="h-16 w-16" src="/logo_256.png" alt="Rename online logo">
            </a>

            <!-- Navigation Links -->
            <div class="hidden md:block">
              <div class="flex items-baseline space-x-4">
                <a href="/" class="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-lg font-medium">首页</a>

                <!-- Dropdown for "重命名工具页" -->
                <div class="relative inline-block text-left">
                  <div>
                    <button type="button" class="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-lg font-medium inline-flex items-center" id="rename-menu" aria-expanded="false" aria-haspopup="true">
                      重命名工具页
                      <svg class="-mr-1 ml-2 h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                        <path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd" />
                      </svg>
                    </button>
                  </div>

                  <div class="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 divide-y divide-gray-100 focus:outline-none dropdown-content" role="menu" aria-orientation="vertical" aria-labelledby="rename-menu">
                    <div class="py-1" role="none">
                      <a href="/insert" class="text-gray-700 block px-4 py-2 text-lg" role="menuitem">插入</a>
                      <a href="/replace" class="text-gray-700 block px-4 py-2 text-lg" role="menuitem">替换/删除</a>
                      <a href="/append_number" class="text-gray-700 block px-4 py-2 text-lg" role="menuitem">追加数字</a>
                    </div>
                  </div>
                </div>

                <a href="#" class="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-lg font-medium">使用方法介绍</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
    
    <router-view />

    
    <footer class="block">
      <div class="py-16 md:py-20 mx-auto w-full max-w-7xl px-5 md:px-10">
        <div class="flex-col flex items-center">
          <a href="#" class="mb-8 inline-block max-w-full text-slate-700">
            <img src="/logo_512_200.png" alt="rename files online" class="inline-block w-40" />
          </a>
          <div class="text-center font-semibold">
            <a href="#" class="inline-block px-6 py-2 font-normal text-slate-700 transition hover:text-blue-600"> About </a>
            <a href="#" class="inline-block px-6 py-2 font-normal text-slate-700 transition hover:text-blue-600"> Features </a>
            <a href="#" class="inline-block px-6 py-2 font-normal text-slate-700 transition hover:text-blue-600"> Works </a>
            <a href="#" class="inline-block px-6 py-2 font-normal text-slate-700 transition hover:text-blue-600"> Support </a>
            <a href="#" class="inline-block px-6 py-2 font-normal text-slate-700 transition hover:text-blue-600"> Help </a>
          </div>
          <div class="mb-8 mt-8 border-b border-gray-300 w-48"></div>
          <!-- <div class="mb-12 grid-cols-4 grid-flow-col grid w-full max-w-52 gap-3">
            <a href="#" class="mx-auto flex-col flex max-w-6 items-center justify-center text-slate-700">
              <img src="https://assets.website-files.com/6458c625291a94a195e6cf3a/6458c625291a945b4ae6cf7b_Vector-1.svg" alt="" class="inline-block" />
            </a>
            <a href="#" class="mx-auto flex-col flex max-w-6 items-center justify-center text-slate-700">
              <img src="https://assets.website-files.com/6458c625291a94a195e6cf3a/6458c625291a945560e6cf77_Vector.svg" alt="" class="inline-block" />
            </a>
            <a href="#" class="mx-auto flex-col flex max-w-6 items-center justify-center text-slate-700">
              <img src="https://assets.website-files.com/6458c625291a94a195e6cf3a/6458c625291a940535e6cf7a_Vector-3.svg" alt="" class="inline-block" />
            </a>
            <a href="#" class="mx-auto flex-col flex max-w-6 items-center justify-center text-slate-700">
              <img src="https://assets.website-files.com/6458c625291a94a195e6cf3a/6458c625291a9433a9e6cf88_Vector-2.svg" alt="" class="inline-block" />
            </a>
          </div> -->
          <p class="text-sm sm:text-base text-slate-700"> © Copyright 2021. All rights reserved. </p>
        </div>
      </div>
    </footer>
  </div>
</template>

<script>
export default {
  name: 'App',
  mounted() {
    var $ = window.$;

    $('.dropdown-content').toggleClass('hidden');

    $(document).ready(function() {
      // 当点击下拉菜单按钮时
      $('#rename-menu').click(function(e) {
        e.stopPropagation(); // 阻止事件冒泡
        $('.dropdown-content').toggleClass('hidden');
      });

      // 当点击下拉菜单选项时
      $('.dropdown-content a').click(function(e) {
        e.preventDefault(); // 阻止默认的链接行为
        var self = $(this);
        var selectedOption = self.text();
        $('#rename-menu').text(selectedOption);
        $('.dropdown-content').addClass('hidden');

        location.href = self.attr('href');
      });

      // 当点击页面其他地方时，关闭下拉菜单
      $(document).click(function() {
        $('.dropdown-content').addClass('hidden');
      });
    });
  }
};
</script>

<style>
/* Your styles here */
</style>

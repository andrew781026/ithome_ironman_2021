# [Day16] - 在 Vue 中引入現成的 Web Component

當我們拿到一個現有的 Web Component 時 , 如果直接在 Vue 專案中使用會抱錯

![抱錯圖片](https://i.imgur.com/e5rPERq.png)

今天來解決這個 issue 吧 !

----

![one](https://raw.githubusercontent.com/andrew781026/ithome_ironman_2021/master/day-06/number-icon/one.png) 利用 vue-cli 建立一個新專案

```shell script
$ vue create vue-web-component-project
```

![利用Vue CLI 3 , 建立 Vue 2](https://i.imgur.com/LP6N8oW.png)

![建立專案中...](https://i.imgur.com/mNuzsp9.png)

![two](https://raw.githubusercontent.com/andrew781026/ithome_ironman_2021/master/day-06/number-icon/two.png) 在 `public/index.html` 中引入要使用的 Web Component ( `word-count.js` )

```hmtl
<!-- public/index.html -->
<!DOCTYPE html>
<html lang="">
  <head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width,initial-scale=1.0">
    <link rel="icon" href="<%= BASE_URL %>favicon.ico">
    <title><%= htmlWebpackPlugin.options.title %></title>

    <!-- 引入 Web Component -->
    <!-- Web Components Polyfill -->
    <script src="https://cdnjs.cloudflare.com/ajax/libs/webcomponentsjs/1.0.13/webcomponents-lite.js"></script>
    <!-- Loading our component -->
    <link rel="import" href="./ticking-paragraph.html">
  </head>
  <body>
    <noscript>
      <strong>We're sorry but <%= htmlWebpackPlugin.options.title %> doesn't work properly without JavaScript enabled. Please enable it to continue.</strong>
    </noscript>
    <div id="app"></div>
    <!-- built files will be auto injected -->
  </body>
</html>
```

![three](https://raw.githubusercontent.com/andrew781026/ithome_ironman_2021/master/day-06/number-icon/three.png) 在專案中使用 custom element `<word-count>`


```js
// src/main.js
import Vue from 'vue';
import App from './App.vue';

// 將特定的 tag 做 ignore 處理 , 避免 Vue 將這些 tag 當作 Vue Componet 處理 , 而找不到元件
Vue.config.ignoredElements = [
  'word-count'
]

new Vue({
  el: '#app',
  render: h => h(App)
});
```


```html
<!-- src/App.vue -->
<template>
  <div id="app">
    <h1>Vue ❤ Web Components</h1>
    <div class="container">
      <word-count :limit="limit">
        <h3>個人自介</h3>
        <textarea class="needcount" rows="10" placeholder="請輸入您的個人描述...">
        </textarea>
      </word-count>
    </div>
  </div>
</template>

<script>
  export default {
    data(){

      return {
        limit : 100
      }
    }
  }
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Noto+Sans+TC:wght@100;300;400;500;700;900&display=swap');

    * {
      font-family: 'Noto Sans TC', sans-serif;
    }

    body {
      min-height: 100vh;
      display: flex;
      justify-content: center;
      align-items: center;
      flex-wrap: wrap;
      background-color: #64cfff;
      margin: 0;
    }

    .container{
      width: 550px;
      padding: 0 40px;
      background-color: #e3f2fd;
      box-shadow: 0 5px 15px rgba(0,0,0,0.1);
    }

    .container textarea{
      border-radius: 4px;
      position: relative;
      resize: none;
      padding: 10px;
      width: 95%;
      border: none;
      outline: none;
    }

    .container textarea:focus{
      border: 2px solid black;
    }
</style>
```

![four](https://raw.githubusercontent.com/andrew781026/ithome_ironman_2021/master/day-06/number-icon/four.png) 利用 `npm run serve` 查看使用情況

```shell script
$ npm run build
```

## 成果

![word-count](https://i.imgur.com/SHKqvKV.gif)


## 參考資料

- [Integrate Web Components with Your Vue.js App](https://www.digitalocean.com/community/tutorials/vuejs-vue-integrate-web-components)
- [youtube - Live Character Counter using CSS & Javascript | Mini Project](https://www.youtube.com/watch?v=uMxvRVfqyc8)

# [Day19] - 打包 Element-UI 的 Vue Component to Web Component

[day-15](https://ithelp.ithome.com.tw/articles/10267876) 我們說明了 , 如何將 Vue 的 Component 轉換成 Web Component

[day-18](https://ithelp.ithome.com.tw/articles/10270127) 說明了 , 如何在 React 專案中 , 引用 Web Component

今天我們來個大翻轉吧 !

將 Element-UI 中的元件 , 在 React 中做使用

## 內文

![one](https://raw.githubusercontent.com/andrew781026/ithome_ironman_2021/master/day-06/number-icon/one.png) 利用 vue-cli 建立一個新專案

```shell script
$ vue create element-ui-web-component
```

![利用Vue CLI 3 , 建立 Vue 2](https://i.imgur.com/LP6N8oW.png)

![建立專案中...](https://i.imgur.com/mNuzsp9.png)

![two](https://raw.githubusercontent.com/andrew781026/ithome_ironman_2021/master/day-06/number-icon/two.png) 安裝 [element-UI](https://element.eleme.io/#/zh-CN)

```shell script
$ npm i element-ui -S
```

![three](https://raw.githubusercontent.com/andrew781026/ithome_ironman_2021/master/day-06/number-icon/three.png) 利用 `build` 指令建立 web component

```shell
$ vue-cli-service build --target wc --name my-custom-element [entry]
```

解說一下上方的一些參數

- --target : wc 代表建立 Web-Component
- --name : Web-Component 的名稱 ( tag-name )
- [entry] : 入口 , 可以是一个 .js 或一个 .vue 檔案。如果没有指定入口，預設使用 src/App.vue。

執行上述指令後 , 我們就會在 dist 資料夾中 , 得到 `demo.html` 跟 `my-custom-element.js` 這兩個檔案

![](https://i.imgur.com/CXwbcsW.png)

如果想要在 html 中使用建立出來的 component , 只要跟 `demo.html` 相同 , 引入 `vue` 跟 `my-custom-element.js` 即可使用

```html
<!-- 引入 vue -->
<script src="https://unpkg.com/vue"></script>

<!-- 引入 web component -->
<script src="./my-custom-element.js"></script>

<!-- 使用建立出來的 web component -->
<my-custom-element></my-custom-element>
```

如果不想要產出的 web component 需要使用者引入 vue 才能用 ,

可以利用 `--inline-vue` 這個參數將 Vue 放到你的 web component 中

```shell
$ vue-cli-service build --target wc --name my-custom-element [entry] --inline-vue
```

> ### 注意对 Vue 的依赖
>
> 在 Web Components 模式中，Vue 是外置的。
> 这意味着包中不会有 Vue，即便你在代码中导入了 Vue。
> 这里的包会假设在页面中已经有一个可用的全局变量 Vue。
> 要避免此行为，可以在 build 命令中添加 --inline-vue 标志。

### 備註

雖然我們知道如何在 React 專案中使用 Vue Component 不過不建議這樣混和使用 , 這樣容易提升專案的複雜性 

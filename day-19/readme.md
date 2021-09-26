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

![three](https://raw.githubusercontent.com/andrew781026/ithome_ironman_2021/master/day-06/number-icon/three.png) 利用 `@vue/web-component-wrapper` 來包裝 web component

```javascript
// in scr/main.js
import Vue from 'vue'
import 'element-ui/lib/theme-chalk/index.css';
import wrap from '@vue/web-component-wrapper'
import {Button} from 'element-ui';

const CustomElement = wrap(Vue, Button)

window.customElements.define('el-button', CustomElement)
```

`element-UI` 的 css 是獨立單檔 , 因此需要將 `element-ui/lib/theme-chalk/index.css` 在 web component 中引用

因此我們可以需要建立一個中間 vue 來 extends el-button 

並在 style 上引用之

```html
<script>
  import {Button} from "element-ui";

  export default {
    extends: Button,
  };
</script>

<!-- 引用 element-ui 的 css -->
<style scoped src="element-ui/lib/theme-chalk/index.css"/>
```


只要在 build 的時候 , 加上參數 `--enable-shadow-dom false` 就可以關閉了 !

之後 引入 `element-UI` 的 css , 我們就可以得到跟 element-UI 官網相同長相的 `el-button`

```html
  <link rel="stylesheet" href="https://unpkg.com/element-ui/lib/theme-chalk/index.css">
```

![four](https://raw.githubusercontent.com/andrew781026/ithome_ironman_2021/master/day-06/number-icon/four.png) 利用 `build` 指令建立 web component

```shell
$ vue-cli-service build --target wc --name el-button ./src/main.js --inline-vue
```

編譯完成後 , 你可以在 dist 資料夾中 , 看到 `el-button.js` , 那就是產生的 web-component

![](https://i.imgur.com/K6g6wLe.png)

之後你就可以在 html 中自由使用 `<el-button>` 了 ~~

![five](https://raw.githubusercontent.com/andrew781026/ithome_ironman_2021/master/day-06/number-icon/five.png) 在 html 中使用建立出來的 el-button

```html
<!-- demo.html -->
<meta charset="utf-8">
<title>el-button demo</title>
<script src="./el-button.js"></script>

<el-button type="warning">警告按钮</el-button>
```

## 成果

![](https://i.imgur.com/vYNeShT.png)

### 備註

雖然我們知道如何在 React 專案中使用 Vue Component 不過不建議這樣混和使用 , 這樣容易提升專案的複雜性 

## 參考資料

- [Create and Publish Web Components With Vue CLI 3](https://dzone.com/articles/create-amp-publish-web-components-with-vue-cli-3)
- [Vue style里面使用 @import 引入外部 css](https://segmentfault.com/a/1190000012728854)

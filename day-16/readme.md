# [Day16] - 利用 Vue CLI 3 來建立 Web Components 的 JS 檔

昨天解說 Vue 如何製作 Web-Component 今天來說明一下 , 

React 如何製作 Web-Component , 

----

![one](https://raw.githubusercontent.com/andrew781026/ithome_ironman_2021/master/day-06/number-icon/one.png) 利用 [create-react-app](https://github.com/facebook/create-react-app) 建立 react 專案 

```shell script
$ npx create-react-app my-app
$ cd my-app
$ npm start
```

![create react app](https://camo.githubusercontent.com/b275c108e1c9e2d1c732a66ca1e0b6ecb1ae260824fb5d6ca4c4e46ee85d1ca0/68747470733a2f2f63646e2e6a7364656c6976722e6e65742f67682f66616365626f6f6b2f6372656174652d72656163742d61707040323762343261633765666130313866323534313135336162333064363331383066356661333965302f73637265656e636173742e737667)

![two](https://raw.githubusercontent.com/andrew781026/ithome_ironman_2021/master/day-06/number-icon/two.png) 安裝 [react-web-component](https://github.com/LukasBombach/react-web-component) 套件

```shell script
$ yarn add react-web-component
```

![three](https://raw.githubusercontent.com/andrew781026/ithome_ironman_2021/master/day-06/number-icon/three.png) 

```jsx
import React from 'react';
import ReactWebComponent from 'react-web-component';

class App extends React.Component {
  render() {
    return <div>Hello World!</div>;
  }
}

ReactWebComponent.create(<App />, 'my-component');
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

## 參考資料 

- [React Web Component](https://github.com/LukasBombach/react-web-component)

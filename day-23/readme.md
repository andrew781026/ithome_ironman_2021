# [Day23] - 介紹 Stencil.js 如何使用(一) - 利用 CLI 建立新專案

今天我們來介紹一下 , 昨天說明的 Web Component 框架中的其中之一 - [stencil.js](https://lit-element.polymer-project.org/guide)

特別拿出來介紹 , 是因為如果你想要用 TypeScript 來管理你的 Web Component ,

[Stencil.js](https://lit-element.polymer-project.org/guide) 是一個不錯的選擇

## [Stencil.js](https://lit-element.polymer-project.org/guide)

![stencil.js LOGO](https://i.imgur.com/zz2J7lI.png)

## 內文

![one](https://raw.githubusercontent.com/andrew781026/ithome_ironman_2021/master/day-06/number-icon/one.png) 利用 Stencil Cli 建立 Stencil 的新專案

```shell
npm init stencil
```

![](https://i.imgur.com/OT8G87d.png)

![](https://i.imgur.com/fReYuxn.png)

![two](https://raw.githubusercontent.com/andrew781026/ithome_ironman_2021/master/day-06/number-icon/two.png) 觀察專案內容

當你利用  Stencil Cli 建立新專案後 , 它會幫你產生如下結構的專案內容

```
test-comp
├── .editorconfig
├── .gitignore
├── .prettierrc.json
├── LICENSE
├── package-lock.json
├── package.json
├── readme.md
├── src
│   ├── components
│   │   └── my-component
│   │       ├── my-component.css
│   │       ├── my-component.tsx
│   │       └── readme.md
│   ├── components.d.ts
│   ├── index.html
│   ├── index.ts
│   └── utils
│       ├── utils.spec.ts
│       └── utils.ts
├── stencil.config.ts
└── tsconfig.json
```

我們可以發現有一個 `src/components` 的資料夾 , 那就是我們放 Web Component 的地方


![three](https://raw.githubusercontent.com/andrew781026/ithome_ironman_2021/master/day-06/number-icon/three.png) 利用 `stencil build` 建立 Web Component 

```bash
npm run build
```

我們可以看到多出一個 www/build 的資料夾

![](https://i.imgur.com/bpsJepC.png)

將資料夾中的所有檔案 copy 出來

![four](https://raw.githubusercontent.com/andrew781026/ithome_ironman_2021/master/day-06/number-icon/four.png) 引用建立出來的 Web Component

利用 script 引入 `[專案名稱].js` 跟 `[專案名稱].esm.js` 這兩個檔案 

```html
<script type="module" src="./test-comp.esm.js"></script>
<script nomodule="" src="./test-comp.js"></script>
```

我們就可以在 html 中使用我們產出的 web component

```html
<!doctype html>
<html dir="ltr" lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0, minimum-scale=1.0, maximum-scale=5.0">
  <title>Stencil Component Starter</title>
  <script type="module" src="./test-comp.esm.js"></script>
  <script nomodule="" src="./test-comp.js"></script>
</head>
<body>
<my-component first="Stencil" last="'Don't call me a framework' JS"></my-component>
</body>
</html>
```

## 參考資料

- [stencil.js 官方 docs](https://stenciljs.com/docs/getting-started)
- [利用 Stencil 建構 Web Component](https://blog.techbridge.cc/2020/03/30/stencil-claps-web-component/)
- [Mike Hartington: Stencil.js and the future of components](https://www.youtube.com/watch?v=erpXdoupIl0&list=PLw5h0DiJ-9PAKKPjF0GBgJfcAuTXw3i7h)
- [發佈 npm 套件 - 從手動到自動（2）：手動 publish 篇](https://pjchender.blogspot.com/2020/02/guide-npm-2.html)
- [Creating Web Components with Stencil](https://auth0.com/blog/creating-web-components-with-stencil/)

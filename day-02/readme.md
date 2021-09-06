# [Day02] - 旅途開始前的行前解說

昨天提到了 `Web Component` , 今天先初步了解一下什麼是 WebComponent 跟他能做什麼吧 !

------

## WebComponent 能做什麼 ?

這時我們可以先看一下 , 現成的 WebComponent - [Wired Elements](https://wiredjs.com/) 

在我們的 Web 中需要如何引用 ?

步驟一 > 將 Wired Elements 的 JS 檔在 Html 中引用

```html
<script type="module" src="https://unpkg.com/wired-elements?module"></script>
```

步驟二 > 在我們的頁面中使用 `wired-input` . `wired-button` ...等 , 特別的 Html Tag 使用 Wired Elements 定義好的元件

```html
<wired-input placeholder="Enter name"></wired-input>
<wired-button>Click Me</wired-button>
```

## 有趣的 WebComponent 

- [Wired Elements](https://wiredjs.com/) - 手繪感十足的原件

![](https://i.imgur.com/GOM4RIt.png)

如果我們需要將上方看到的原件 , 在我們的 Web 專案中做使用 , 我們只需要引用 JS 檔即可

```html
<script type="module" src="https://unpkg.com/wired-elements?module"></script>
```

不需要引用其他

## WebComponent

他是一個你可以自訂定義 HTML Tag 來做出想要的 HTML 元件

舉例來說 : 

我想要將

![](https://i.imgur.com/cm5OUGj.png)

WebComponent 由 3 個主要的部份所構成

- Custom elements: 利用 `customElements.define` 我們可以定義出特別的 html-tag

範例 : 
```javascript
// 定義
class MyTag extends HTMLElement  {
  constructor() {
    // Always call super first in constructor
    super();

    // Element functionality written in here
  }
}

customElements.define('my-tag', MyTag);
```

```html
<!-- 使用剛剛定義的 html -->
<my-tag></my-tag>
```


- Shadow DOM: A set of JavaScript APIs for attaching an encapsulated "shadow" DOM tree to an element — which is rendered separately from the main document DOM — and controlling associated functionality. In this way, you can keep an element's features private, so they can be scripted and styled without the fear of collision with other parts of the document.

- HTML templates: The <template> and <slot> elements enable you to write markup templates that are not displayed in the rendered page. These can then be reused multiple times as the basis of a custom element's structure.


### 有趣的 WebComponent

- [Wired Elements](https://wiredjs.com/) - 手繪感十足的原件



## 參考資料 :

- [Udemy 課程 - Web Components & Stencil.js - Build Custom HTML Elements](https://www.udemy.com/course/web-components-stenciljs-build-custom-html-elements/)
- [webcomponents 官方網站](https://www.webcomponents.org/)
- [MDN - webcomponents 介紹](https://developer.mozilla.org/en-US/docs/Web/Web_Components)

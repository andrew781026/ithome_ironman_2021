# [Day02] - 旅途開始前的行前解說

昨天提到了 `Web Component` , 今天深入來研究一下 WebComponent 究竟是什麼 ?

------

> 需要多加潤色此篇文字 

## WebComponent

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

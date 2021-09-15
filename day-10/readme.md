# [Day10] - Tab頁籤切換效果 - Web Component 的樣式設定

在 Web Component 中有些特別的 css styling 可以設定 ,

ex : 如果我們想要設定元件根元素 (Root Element) 的底色時 , 可以使用 :host 來做設定

如果我們想要設定 根元素之下的第一層 div 的底色時 , 可以使用 :host(> div) 來做設定

shadow-dom 提供將樣式內外隔離的方式 , 但是當我們真的需要設定一些內外都要有的樣式時 ,

我們可以用 my-tab::part(tab-head) 來做設定 , 它會穿過 shadow-dom 將我們想設定的樣式給設定上去

如果想要指定 slot 的底色 , 舉例想要設定 day-08 的 modal-body 它的底色 , 可以用 ::slotted(*) 來做設定

以下整理跟 Web Component 相關的 styling 有哪些

| pseudo-classes | 說明 |
|---|---|
| :defined | 所有使用 CustomElementRegistry.define() 的 Tag 內容都設定的樣式 |
| :host | 設定元件的根樣式 |
| :host(.bg-red) | 根據原件上的屬性 , 設定不同的根樣式 |
| :host-context(.dark-wrap) | 根據原件外層的情況 , 設定不同的根樣式 |
| ::part | 設定可以穿過 shadow-dom 的樣式 |
| ::slotted(*) | 設定所有 slot 都共用的樣式 |

下面我們就使用常用的 Tab 頁籤 , 來學習 Web Component 中有哪些特別的 css 設定吧 !

------

## 簡易範例

> 下面我們用一些範例來說明上面表列的那些樣式設定吧 !

![one](https://raw.githubusercontent.com/andrew781026/ithome_ironman_2021/master/day-06/number-icon/one.png) :host 相關設定的解說


```html
<div class="dark-wrap">
    <x-foo class="foo">
      <"shadow tree">
        <link rel="stylesheet" href="./inner.css">
        <div class="foo">...</div>
      </>
    </x-foo>
</div>
```

在 inner.css 中設定以下內容 , 將會設定對應的樣式

- :host matches the <x-foo> element.
- x-foo matches nothing.
- .foo matches only the <div> element.
- .foo:host matches nothing
- :host(.foo) matches the <x-foo> element.

![two](https://raw.githubusercontent.com/andrew781026/ithome_ironman_2021/master/day-06/number-icon/two.png) ::slotted() 相關設定的解說


```html
<link rel="stylesheet" href="./outer.css">
<x-foo>
  <div id="one" slot="foo" class="foo">...</div>
  <div id="two" slot="foo">...</div>
  <div id="three" class="foo">
    <div id="four" slot="foo">...</div>
  </div>
  <"shadow tree">
    <div id="five" part="bar">...</div>
    <div id="six">...</div>
    <slot name="foo"></slot>
  </"shadow tree">
</x-foo>
```

在 outer.css 中設定以下內容 , 將會設定對應的樣式

-  a selector like ::slotted(*) is equivalent to *::slotted(*), where the * selects many more elements than just the slot element. However, since only the slot elements are slots, they’re the only elements with a ::slotted() pseudo-element as well.
- A selector like ::slotted(.foo), on the other hand, will only select #one, as it matches .foo, but #two doesn’t.
- x-foo::part(bar) matches the #five element.

## 實作開始

![one](https://raw.githubusercontent.com/andrew781026/ithome_ironman_2021/master/day-06/number-icon/one.png) 建立 tab.css

```css
*, *::before, *::after {
  box-sizing: border-box;
}

.tab-head {
  color: #000;
  background-color: #f1f1f1;
  border-bottom: 1px solid #ccc;
  display: flex;
}

.tab-head .item {
  cursor: pointer;
  font-size: 20px;
  padding: 8px 16px;
  height: 100%;
  display: flex;
  align-items: center;
}

.tab-head .item:hover {

  background-color: #ccc;
}

.tab-head .item.active {

  color: #fff;
  background-color: #616161;
}

/* 所有使用 CustomElementRegistry.define() 的 Tag 都上色 */
:defined {
  border-left: 2px solid rebeccapurple;
}

/* component 的根 styling */
:host {

  width: 1000px;
  border: 1px solid #ccc;
  box-shadow: 8px 8px 10px 2px rgba(0,0,0,0.5);
}

/* 根據 tag 上的屬性來設定 :host 的樣式 */
:host(.bg-light-green) {
  background-color: #66ff16;
}

/* 根據外部的 dom 來設定 :host 的樣式 */
:host-context(.thin) {
  width: 700px;
  box-shadow: none;
}

/* Selects any <span> placed inside a slot */
::slotted(div) {
  font-weight: 900;

  padding: 8px 24px;
  background-color: #ffffff;
  animation: fadeIn 0.5s ease-in-out;
}
```

![two](https://raw.githubusercontent.com/andrew781026/ithome_ironman_2021/master/day-06/number-icon/two.png) 建立 tab.js

```javascript
// tab.js
class MyTab extends HTMLElement {

  connectedCallback() {

    const tabHeaders = [...this.querySelectorAll('.item')]

    const tabBodies = [...this.querySelectorAll('[slot]')]

    const tabBodyStr = tabBodies
      .map(tabContent => `<slot name="${tabContent.getAttribute('slot')}" class="city tab-body"></slot>`)
      .join('')

    const styleStr = `<link rel="stylesheet" href="./tab.css">`

    const htmlStr = `
        <div class="tab-head" part="tab-head">
          ${tabHeaders.map(head => head.outerHTML).join('')}
        </div>
        ${tabBodyStr}
    `

    this.attachShadow({mode: 'open'}).innerHTML = styleStr + htmlStr;

    const items = this.shadowRoot.querySelectorAll('.item');
    [...items].map(item => item.addEventListener('click', e => this._tabClick(e)))
  }

  _tabClick(e) {

    const tabName = e.target.innerText;
    const shadowRoot = this.shadowRoot;
    const tabBodies = this.querySelectorAll(".tab-body");
    const items = shadowRoot.querySelectorAll(".tab-head .item");

    tabBodies.forEach(content => (content.slot === tabName) ? content.style.display = "block" : content.style.display = "none")
    items.forEach(item => (item.innerText === tabName) ? item.classList.add('active') : item.classList.remove('active'))
  }

}

window.customElements.define('my-tab', MyTab);
```

![two](https://raw.githubusercontent.com/andrew781026/ithome_ironman_2021/master/day-06/number-icon/two.png) 在 show-wc.html 中引用

```html
// show-wc.html
<!DOCTYPE html>
<html lang="zh-TW">
<head>
  <meta charset="UTF-8">
  <title>顯示自訂的 WC 元件</title>
  <style>
    body {
      display: flex;
      gap: 40px;
      margin: 50px;
      flex-wrap: wrap;
      background-color: #ebf5fc;
    }

    @keyframes fadeIn {
      0% {
        opacity: 0;
      }
      100% {
        opacity: 1;
      }
    }

    /* 利用 part 屬性 , 可以穿過 shadow-dom 做設定 */
    my-tab::part(tab-head) {
      color: rgba(254, 8, 8, 0.93);
      font-weight: 900;
    }

    my-tab::part(tab-head):hover {
      transform: skewX(-20deg) translateX(8px);
    }
  </style>

</head>
<body>

<my-tab class="bg-light-green">
  <div class="item">London</div>
  <div class="item">Paris</div>
  <div class="item">Tokyo</div>

  <div slot="London" class="tab-body" id="tabs">
    <h2>London</h2>
    <p>London is the capital of England.</p>
  </div>
  <div slot="Paris" class="tab-body" style="display:none">
    <h2>Paris</h2>
    <p>Paris is the capital of France.</p>
  </div>
  <div slot="Tokyo" class="tab-body" style="display:none">
    <h2>Tokyo</h2>
    <p>Tokyo is the capital of Japan.</p>
  </div>
</my-tab>

<div class="thin">
  <my-tab>
    <div class="item">London</div>
    <div class="item">Paris</div>
    <div class="item">Tokyo</div>

    <div slot="London" class="tab-body" id="tabs">
      <h2>London</h2>
      <p>London is the capital of England.</p>
    </div>
    <div slot="Paris" class="tab-body" style="display:none">
      <h2>Paris</h2>
      <p>Paris is the capital of France.</p>
    </div>
    <div slot="Tokyo" class="tab-body" style="display:none">
      <h2>Tokyo</h2>
      <p>Tokyo is the capital of Japan.</p>
    </div>
  </my-tab>
</div>


<script src="./tab.js"></script>
</body>
</html>
```

完成 !!

## 成果

![](https://i.imgur.com/3pCURJE.gif)


如果想直接體驗成果 , 請到 [web-component-pseudo-classes.html](https://andrew781026.github.io/ithome_ironman_2021/day-10/show-wc.html) 查看


## 參考資料 :

- [Udemy 課程 - Web Components & Stencil.js - Build Custom HTML Elements](https://www.udemy.com/course/web-components-stenciljs-build-custom-html-elements/)
- [MDN 文件 - :host](https://developer.mozilla.org/en-US/docs/Web/CSS/:host)
- [W3C 文件 - CSS Scoping Module Level 1](https://drafts.csswg.org/css-scoping/#host-selector)

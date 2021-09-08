# [Day04] - 新擬物風按鈕(二) - shadow dom 介紹

昨天我們做了一個不能點的 `neuomorphic-button` 

今天我們把他可以點擊 & 加上 shadow-dom 讓元件內外的 styling 區隔開來吧 !

------

## 回顧昨天進度

昨天我們做了一個不能點的 `neuomorphic-button` 元件

```javascript
// neuomorphic-button.js
class NeuomorphicButton extends HTMLElement {

  // as Component mounted to page
  constructor() {

    // Always call super first in constructor
    super();

    // Element functionality written in here
    const div = document.createElement('div')
    div.classList.add('icon-box')
    div.innerHTML = `<i class="fas fa-wifi"></i>`

    this.append(div)
  }
}

window.customElements.define('neuomorphic-button', NeuomorphicButton);
```

首先我們先補上 `checkbox` 讓其可以被點擊 , 

因為我們要客製化 `checkbox` 的樣式 , 因此會需要設定 `checkbox` 的樣式為 `display:none` 把它隱藏起來

這時我們可以請出 `label` 這個 Html tag , 用 `label` 將 `input` 元素包住 , 將 onclick 事件轉送到 `input[type="checkbox"]` 上 

```javascript
// neuomorphic-button.js
class NeuomorphicButton extends HTMLElement {

  // as Component mounted to page
  constructor() {

    // Always call super first in constructor
    super();

    // Element functionality written in here
    const div = document.createElement('div')
    div.classList.add('icon-box')
    div.innerHTML = `<i class="fas fa-wifi"></i>`

    const label = document.createElement('label')
    label.innerHTML = `<input type="checkbox">`
    label.append(div)

    this.append(label)
  }
}

window.customElements.define('neuomorphic-button', NeuomorphicButton);
```

當然在 html 中我們需要補上一些樣式設定

```html
<style>
    /* neuomorphic-button 的樣式 */
    label input[type='checkbox'] {
      display: none;
    }

    label .icon-box {
      width: 60px;
      height: 60px;
      position: relative;
      background-color: #ebf5fc;
      box-shadow: 8px 8px 16px #bcbcbc,
      -8px -8px 16px #ffffff;
      display: flex;
      justify-content: center;
      align-items: center;
      border-radius: 10px;
      cursor: pointer;
    }

    label .icon-box::before {
      position: absolute;
      left: -1px;
      top: -1px;
      content: '';
      width: 101%;
      height: 101%;
      background-color: rgba(0, 0, 0, 0.1);
      opacity: 0;
      transition: opacity 0.5s;
      border-radius: 10px;
    }

    label .icon-box:hover::before {
      opacity: 1;
    }

    label .icon-box i {
      font-size: 2em;
      color: #6a9bd8;
    }

    label input[type='checkbox']:checked ~ .icon-box {
      box-shadow: inset -2px -2px 5px rgba(255, 255, 255, 1),
      inset 3px 3px 5px rgba(0, 0, 0, 0.1);
    }

    label input[type='checkbox']:checked ~ .icon-box i {
      transform: scale(0.95);
      filter: hue-rotate(90deg);
    }

  </style>
```

之後我們得到了一個可點擊的 `neuomorphic-button`

![](https://i.imgur.com/BbtbHHl.gif)

目前我們的 `style` 是定義在 html 的 header 中 , 如果有其他的 css 設定可能會造成互相影響

這時我們就可以請出 `shadow dom` 來 ~~~

```javascript
const shadowRoot = this.attachShadow({mode: 'open'})
```

既然我們都改用 `shadow dom` 那當然需要將掛在 this 上的那些 HTML 元素 , 改掛在 `shadowRoot` 的上面


```javascript
// neuomorphic-button.js
class NeuomorphicButton extends HTMLElement {

  // as Component mounted to page
  constructor() {

    ...跟之前相同的設定

    // 將 label 改 append 到 shadowRoot 上面
    const shadowRoot = this.attachShadow({mode: 'open'})
    shadowRoot.append(label)
  }
}

window.customElements.define('neuomorphic-button', NeuomorphicButton);
```

改後我們會獲得以下截圖

![](https://i.imgur.com/QwOf46o.png)

奇怪 , 外部有定義樣式阿 ~ , 那 `neuomorphic-button` 元件內的樣式為何會沒有吃到呢 ? 

原來 `shadow dom` 也就是 `this.attachShadow({mode: 'open'})` 會將 shadowRoot 中的樣式跟外部 Html 的樣式做一個區隔

所以 , 我們需要在 `shadowRoot` 的內部再定義一次樣式

```diff
// neuomorphic-button.js
class NeuomorphicButton extends HTMLElement {

  // as Component mounted to page
  constructor() {

    ...跟之前相同的設定

     // 將樣式相關的部分 , 定義在此
+    const fontAwesomeStyle = `<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.1/css/all.min.css">`
+    const styleStr =  'neuomorphic-button 的樣式'

    // 將 label 改 append 到 shadowRoot 上面
    const shadowRoot = this.attachShadow({mode: 'open'})
+    shadowRoot.innerHTML = fontAwesomeStyle + styleStr  // 將定義出來的樣式 , 掛載到 shadowRoot 內部
    shadowRoot.append(label)
  }
}

window.customElements.define('neuomorphic-button', NeuomorphicButton);
```

太棒了 ! 按鈕吃到我們設定的樣式了 （＾∀＾●）ﾉｼ

![](https://i.imgur.com/7MxFSz1.png)

如果想查看實際頁面 , 請到 [shadow-dom.html](https://andrew781026.github.io/ithome_ironman_2021/day-04/show-wc.html) 查看


## 補充的小貼士 

### 1. label 的特點

> 下方情況 label 會將 onclick 事件做一個轉送 , 傳給對應的元素觸發 onclick

A. for 對應的那個 name HTML 元素

```html
<div class="preference">
    <label for="cheese">Do you like cheese?</label>
    <input type="checkbox" name="cheese" id="cheese">
</div>
```

B. 包在 label 內的 input 元素

```html
<label>
  <input type="checkbox">
  I agree to the Terms and Conditions
</label>
```

### 2. checkbox 無法用 css 直接設定底色 & 邊框樣式

## 參考資料 :

- [Udemy 課程 - Web Components & Stencil.js - Build Custom HTML Elements](https://www.udemy.com/course/web-components-stenciljs-build-custom-html-elements/)
- [webcomponents 官方網站](https://www.webcomponents.org/)
- [MDN - label 介紹](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/label)

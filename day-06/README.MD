# [Day06] - 新擬物風按鈕(四) - 事件處理 

昨天文末時 , 請 `邦友` 設定的 3 項屬性不知道各位做出來了嗎 ?

如果沒有 , 可以到 [neuomorphic-button-05.js](https://andrew781026.github.io/ithome_ironman_2021/day-06/neuomorphic-button.js) 這裡來參考其他作法之一

如果有  `邦友` 有其他作法 , 歡迎大家到昨天的留言區 , 留言分享您的作法 O(∩_∩)O

------

HTML 按鈕 <button> 上會有一個 onclick 事件 , 用來設定點擊後 , 會觸發何種事件

我們做的 `neuomorphic-button` 也是一個按鈕 , 當然我們需要有一個 onclick 事件 , 放到我們的 `neuomorphic-button` 上喽 !

今天 , 我們就將 onclick 事件 , 追加到 `neuomorphic-button` 元件上吧 !

## 常用的點擊事件

開始實作之前 , 我們可能需要先釐清 , 在 JS / HTML 中有那些是 "click" 事件常做的設定 ? 

在我們實作完成後 , 需要確保功能正常的地方

1.  <button> 的 `onclick` 屬性

```html
<button onclick="clickHandler()" />
```

2.  EventTarget.addEventListener()

```html
button.addEventListener('click', clickHandler )
```

也就是今天完成時 , 我們可以將上方 2 種事件 都在 `neuomorphic-button` 元件上使用

## 實作開始

![one](https://raw.githubusercontent.com/andrew781026/ithome_ironman_2021/master/day-06/number-icon/one.png) 將昨天的進度取出 

```javascript
class NeuomorphicButton extends HTMLElement {

  constructor() {

    super();

    const fontAwesomeStyle = `<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.1/css/all.min.css">`

    // neumorphism 產生器 : https://neumorphism.io/#e0e0e0
    const styleStr = `neumorphism 按鈕樣式`;

    const icon = this.getAttribute('icon') || 'fas fa-wifi'
    const size = this.getAttribute('size') || 70
    const color = this.getAttribute('color') || '#6a9bd8'
    const bgColor = this.getAttribute('bg-color') || '#ebf5fc'

    const htmlStr = `
        <label>
          <input type="checkbox" name="">
          <div class="icon-box" style="width: ${size}px;height: ${size}px;background-color:${bgColor}">
              <i class="${icon}" style="font-size: ${size * 0.6}px;color:${color}"></i>
          </div>
        </label>
    `

    this.attachShadow({mode: 'open'}).innerHTML = fontAwesomeStyle + styleStr + htmlStr
  }
}

window.customElements.define('neuomorphic-button', NeuomorphicButton);
```

![two](https://raw.githubusercontent.com/andrew781026/ithome_ironman_2021/master/day-06/number-icon/two.png) 在 checkbox 加上 `addEventListener` 監聽 checkbox 的變化

```javascript
const checkbox = label.querySelector('input[type="checkbox"]')
checkbox.addEventListener('change', function (e) {

  console.log('checkbox 被點到')
});
```

![three](https://raw.githubusercontent.com/andrew781026/ithome_ironman_2021/master/day-06/number-icon/three.png) 產生一個新的 Event 並將其 dispatch 到元素上

```javascript
const self = this

const checkbox = label.querySelector('input[type="checkbox"]')
checkbox.addEventListener('change', function (e) {

  // detail 就是 CustomEvent 內的參數
  const clickEvent = new CustomEvent('check', {composed: true, detail: {check: this.checked}});
  self.dispatchEvent(clickEvent)
});
```

之後我們註冊 `addEventListener('check'` 到元素上 , 我們就可以看到事件的觸發 

```javascript
// 註冊範例 
document.querySelector('wc-08').addEventListener('check', e => console.log('註冊 & 監聽 check 事件 !!!', e.detail.check))
```

![](https://i.imgur.com/YjeNtTa.png)


如果想直接體驗成果 , 請到 [web-component-addEventListener.html](https://andrew781026.github.io/ithome_ironman_2021/day-06/show-wc.html) 查看


## 參考資料 :

- [Udemy 課程 - Web Components & Stencil.js - Build Custom HTML Elements](https://www.udemy.com/course/web-components-stenciljs-build-custom-html-elements/)
- [webcomponents 官方網站](https://www.webcomponents.org/)

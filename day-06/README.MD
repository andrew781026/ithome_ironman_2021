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

也就是今天完成時 , 我們可以將上方 2 種 onclick 都在 `neuomorphic-button` 元件上使用

## 實作開始

![book](https://i.imgur.com/nuC5GEv.png) Step 1. 將昨天的進度取出 

```html
<!-- 將我們要顯示的圖標放的 icon 屬性的文字當中 -->
<neuomorphic-button icon="fas fa-lightbulb" />
```

![book](https://i.imgur.com/nuC5GEv.png) Step 2. 在元件上的 `icon` 接收下來 , 並將其寫到 i 的 class 上面


```javascript
// neuomorphic-button.js
class NeuomorphicButton extends HTMLElement {

  constructor() {

    super();

    const iconName = this.getAttribute('icon')    
    

    ...照舊處理
  }
}

window.customElements.define('neuomorphic-button', NeuomorphicButton);
```

![book](https://i.imgur.com/nuC5GEv.png) Step 3. 將接收到的 iconName 寫到 i 的 class 上面

```javascript
// neuomorphic-button.js
class NeuomorphicButton extends HTMLElement {

  constructor() {

        super();
    
        const fontAwesomeStyle = `<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.1/css/all.min.css">`
    
        const styleStr = 'neuomorphic-button 的樣式';

        // 取得原件上的 icon 屬性
+        const iconName = this.getAttribute('icon')       

        const div = document.createElement('div')
        div.classList.add('icon-box')

        // 將取到的 iconName 設定給 i 
+        div.innerHTML = `<i class="${iconName}"></i>`
    
        const label = document.createElement('label')
        label.innerHTML = `<input type="checkbox">`
        label.append(div)
    
        const shadowRoot = this.attachShadow({mode: 'open'})
        shadowRoot.innerHTML = fontAwesomeStyle + styleStr
        shadowRoot.append(label)
  }
}

window.customElements.define('neuomorphic-button', NeuomorphicButton);
```

之後我們就可以到 `font-awesome` 官網查出我們想要的小圖示 , 並修改 `icon` 屬性


### 追加其他屬性

我們可以利用以上手法 , 將 

- size : 按鈕大小
- color : 小圖示顏色
- bgColor : 按鈕底色

這些常見的按鈕控制項 , 給設定出來 , 這些設定就留給 邦友 自行實作了 ! 

## 參考資料 :

- [Udemy 課程 - Web Components & Stencil.js - Build Custom HTML Elements](https://www.udemy.com/course/web-components-stenciljs-build-custom-html-elements/)
- [webcomponents 官方網站](https://www.webcomponents.org/)

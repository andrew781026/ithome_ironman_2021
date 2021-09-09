# [Day05] - 新擬物風按鈕(三) - 參數設定

昨天我們利用 `shadow-dom` 將元件內外的樣式區隔開來

不過 , 目前的 `neuomorphic-button` 有個奇怪之處

我們沒有辦法直接指定按鈕要用哪一個 icon , 只能用第三天的那招 `document.querySelector`
 
```javascript
var myTagName = 'neuomorphic-button';
document.querySelector(`${myTagName} .icon-box i`).className = 'fas fa-lightbulb'
```
 
用 JS 事後對 dom 做修改 , 對於健忘的人 (比如說我) 就很容易忘記加上 JS 修改的那段 , 或是忘記自己有設定過替換的 JS

然後 , 在 JS 中寫一大堆修改 , Dedug 時又會頭痛得要命 (所以這 icon 最後會變成啥樣啊 !?)

```javascript
// 看到的程式碼可能長這樣 , 然後你不知道最後 icon 變成啥樣
1    var myTagName = 'neuomorphic-button';
2    document.querySelector(`${myTagName} .icon-box i`).className = 'fas fa-lightbulb'

.......一些程式碼

      const changeFn = () =>{

101      var myTagName = 'neuomorphic-button';
102      document.querySelector(`${myTagName} .icon-box i`).className = 'fas fa-lightbulb'

      }
```

今天 , 我們先來接收外部傳入的參數 , 將 icon 相關的設定 , 統一放在 `neuomorphic-button` 元件上 \(￣︶￣*\))

------

## 設定屬性

### 追加 icon 屬性到 `neuomorphic-button` 元件上 , 更改小圖示

![book](https://i.imgur.com/nuC5GEv.png) Step 1. 在 `<neuomorphic-button />` 上加上屬性 `icon`

```html
<!-- 將我們要顯示的圖標放的 icon 屬性的文字當中 -->
<neuomorphic-button icon="fas fa-lightbulb" />
```

![book](https://i.imgur.com/nuC5GEv.png) Step 2. 在元件上的 `icon` 接收下來 , 並將其寫到 i 的 class 上面

![Pink Tree](https://i.imgur.com/CsLf78s.png)  利用 `this.getAttribute('icon')` 取得原件上的屬性 `icon` 

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

![book](https://i.imgur.com/nuC5GEv.png) Step 3. 並接收到的 iconName 寫到 i 的 class 上面


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

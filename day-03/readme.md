# [Day03] - 第一個 WebComponent 元件

昨天借用了 `Wired Elements` 來說明什麼是 WebComponent 跟它有什麼特點

今天我們來製作一個 MyElement 吧 !

------

## 素材準備

我們利用 font-awesome 製作一個 `擬物型按鈕(neuomorphic button)` 吧 \(￣︶￣*\))

- [擬物型按鈕](https://andrew781026.github.io/daliy-web-ui/neuomorphic-checkbox-button-design/index.html) 

 [![](https://i.imgur.com/TiQdroo.png)](https://www.youtube.com/watch?v=EQVXzwTilkY)   
 [ 圖片來源 : [youtube 影片 - CSS3 Neumorphism](https://www.youtube.com/watch?v=EQVXzwTilkY) ]


首先 , 當然是建立一個 JS 檔案 , 我們叫做 `neuomorphic-button.js` 吧 !

```javascript
// neuomorphic-button.js
```

建立一下我們的 Custom Html Tag 

```javascript
// neuomorphic-button.js
class NeuomorphicButton extends HTMLElement {

  // as Component mounted to page 
  constructor() {

    // Always call super first in constructor
    super();

    // Element functionality written in here
  }
}

window.customElements.define('neuomorphic-button', NeuomorphicButton);
```

跟昨天一樣 , 用自製的 Tag 於 Html 中引用

```html
<!-- use-wc.html -->
<!DOCTYPE html>
<html lang="zh-TW">
<head>
  <meta charset="UTF-8">
  <script src="./neuomorphic-button.js"></script>
</head>
<body>

<neuomorphic-button></neuomorphic-button>
</body>
</html>
```

我們先塞一些東西到 <neuomorphic-button/> 看看吧 !

```javascript
// neuomorphic-button.js
class NeuomorphicButton extends HTMLElement {

  // as Component mounted to page 
  constructor() {

    // Always call super first in constructor
    super();

    // Element functionality written in here
    const img = document.createElement('img')
    img.src = 'https://raw.githubusercontent.com/andrew781026/ithome_ironman_2021/master/day-03/cat.png'
    
    this.append(img)
  }
}

window.customElements.define('neuomorphic-button', NeuomorphicButton);
```

回到 `use-wc.html` 我們可以看到一隻可愛的小貓咪 (*￣3￣)╭

![](https://i.imgur.com/fbqKWOd.png)

之後 , 我們將 img 改成 font-awesome 的 icon

```javascript
// neuomorphic-button.js
class NeuomorphicButton extends HTMLElement {

  // as Component mounted to page 
  constructor() {

    // Always call super first in constructor
    super();

    // Element functionality written in here
    const div = document.createElement('div')
    div.innerHTML = `<i class="fas fa-wifi"></i>`
    
    this.append(div)
  }
}

window.customElements.define('neuomorphic-button', NeuomorphicButton);
```

別忘了在 `use-wc.html` 中引入 font-awesome 的樣式檔

```diff
<!-- use-wc.html -->
<!DOCTYPE html>
<html lang="zh-TW">
<head>
  <meta charset="UTF-8">
+ <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.1/css/all.min.css">
  <script src="./neuomorphic-button.js"></script>
</head>
<body>

<neuomorphic-button></neuomorphic-button>
</body>
</html>
```

之後再補上 NeuomorphicButton 的邊框樣式 . 底色...等

```html
<!-- use-wc.html -->
<!DOCTYPE html>
<html lang="zh-TW">
<head>
  <meta charset="UTF-8">
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.1/css/all.min.css">

  <style>
 
      .icon-box {
       width: 60px;
       height: 60px;
       position:relative;
       background-color: #ebf5fc;
       box-shadow:  8px 8px 16px #bcbcbc,
                   0 0 8px 20px #dfe9f3,
                   -8px -8px 16px #ffffff;
       display: flex;
       justify-content: center;
       align-items: center;
       border-radius: 10px;
       cursor: pointer;
     }
 
      .icon-box i {
       font-size: 2em;
       color: #6a9bd8;
     }
 
   </style>

  <script src="./neuomorphic-button.js"></script>
</head>
<body>

<neuomorphic-button></neuomorphic-button>
</body>
</html>
```

我們的 `neuomorphic-button` 就顯示出來啦 

![](https://i.imgur.com/VLfz7xc.png)

如果想查看實際頁面 , 請到 [first-web-component.html](https://andrew781026.github.io/ithome_ironman_2021/day-03/show-wc.html) 查看


## 參考資料 :

- [Udemy 課程 - Web Components & Stencil.js - Build Custom HTML Elements](https://www.udemy.com/course/web-components-stenciljs-build-custom-html-elements/)
- [webcomponents 官方網站](https://www.webcomponents.org/)
- [MDN - webcomponents 介紹](https://developer.mozilla.org/en-US/docs/Web/Web_Components)
- [wired-button 的 JS 定義](https://unpkg.com/wired-elements@3.0.0-rc.6/lib/wired-button.js?module)

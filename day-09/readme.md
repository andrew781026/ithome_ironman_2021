# [Day09] - 未知網址的彈跳視窗 - :is 設定

有時 客制化元件時 , 我們只是想在 HTML 基礎 Tag 上加一個小功能

那我們可以使用 `is` 這個屬性來處理


網頁元件中 , 常會使用 Modal 這種類型的元件

![](https://i.imgur.com/DUd4ZuT.png)

如果我們將其製作成一個 `<Modal>` 的 WebComponent , 之後在使用時 , 應該會輕鬆不少吧 !

下面我們來製作 `<Modal>` 吧 !

------

## 前期準備

![one](https://raw.githubusercontent.com/andrew781026/ithome_ironman_2021/master/day-06/number-icon/one.png) 我們先到 [CodePen 下載今天的 Modal 範本](https://codepen.io/andrew781026/pen/jOmKgzg)

- [Modal 範例](https://codepen.io/andrew781026/pen/jOmKgzg) > ![](https://i.imgur.com/JMtYrkx.png) > export .zip

![](https://i.imgur.com/z7UpgrE.png)

![two](https://raw.githubusercontent.com/andrew781026/ithome_ironman_2021/master/day-06/number-icon/two.png) 解壓縮後 , 觀察 html 中的 pop-up-container 結構

我們可以發現 `Modal` 的大致結構如下

```html
<div class="pop-up-container" style="display: none;">
  <div class="pop-up-container-root">
    <div class="pop-up-box">
      <div class="pop-up-title">
        <h3>Title</h3>
        <close-icon/>
      </div>
      <div class="pop-up-content">
      </div>
      <div class="pop-up-action">
        <button onclick='closeModal()'>取消</button>
        <button onclick='closeModal()'>確定送出</button>
      </div>
    </div>
  </div>
</div>
```

| 區塊名稱 | 描述 |
|---|---|
| pop-up-container | Modal 的容器 , 黑底遮罩放在這 , 不會改變 |
| pop-up-container-root | Modal 的捲動區塊 , 不會改變 |
| pop-up-box | Modal 的內容放在其中 , 不會改變 |
| pop-up-title | 標題區塊 , 可能會修改其內容 |
| pop-up-content | 內文區塊 , 可能會修改其內容  |
| pop-up-action | 按鈕區域 , 可能會修改其內容 |

有 `pop-up-title` . `pop-up-content` . `pop-up-action` 這 3 個區塊需要塞入 html 內容

在 [Day02](https://ithelp.ithome.com.tw/articles/10261965) 介紹 `wired-element` 時 , 我們了解到 slot 可以塞入 html 內容

不過 , 需要區分 `pop-up-title` . `pop-up-content` . `pop-up-action` 3 個區塊的 slot 要如何製作呢 ?

![three](https://raw.githubusercontent.com/andrew781026/ithome_ironman_2021/master/day-06/number-icon/three.png) Name Slot 的介紹

我們可以在 `shadow-dom` 中設定 `<slot name="modal-body">` 在使用 `<Modal>` 時設定 `slot="modal-body"` , 

```html
<Modal>
  <h2 slot="modal-body">
    這是內文...這是內文...這是內文...這是內文...
  </h2>
</Modal>
``` 

## 實作開始

![one](https://raw.githubusercontent.com/andrew781026/ithome_ironman_2021/master/day-06/number-icon/one.png) 建立 customElements - `my-modal`

```js
class Modal extends HTMLElement {

}

window.customElements.define('my-modal', Modal);
```

![two](https://raw.githubusercontent.com/andrew781026/ithome_ironman_2021/master/day-06/number-icon/two.png) 開啟 `shadow-dom` & 將 html 結構複製到 class 中

```js
class Modal extends HTMLElement {

  connectedCallback() {

    const styleStr = `<link rel="stylesheet" href="./modal.css">`

    const htmlStr = `
        <div class="pop-up-container" style="display: none;">
          <div class="pop-up-container-root">
            <div class="pop-up-box">
              <div class="pop-up-title flex justifyContent">
               <h3>這是 Modal 的 Title</h3>
                <img class='close' src="./close.png" />
              </div>
              <div class="pop-up-content">
                這是 Modal 的 Body
              </div>
              <div class="pop-up-action flex justifyContent">
                  <button class='close'>取消</button>
                  <button class='confirm'>確定送出</button>
              </div>
            </div>
          </div>
        </div>
    `

    this.attachShadow({mode: 'open'}).innerHTML = styleStr + htmlStr
  }

}

window.customElements.define('my-modal', Modal);
```

![three](https://raw.githubusercontent.com/andrew781026/ithome_ironman_2021/master/day-06/number-icon/three.png) 將 Name Slot 設定到 html 中

- 將右側的 3 區塊 `pop-up-title` . `pop-up-content` . `pop-up-action` 設定對應的 slot

| 區塊名稱 | Slot 名稱 |
|---|---|
| pop-up-title | modal-title |
| pop-up-content | modal-body |
| pop-up-action | modal-action |

```html
<div class="pop-up-box">
  <div class="pop-up-title flex justifyContent">
+   <slot name="modal-title"><h3>這是 Modal 的 Title</h3></slot>
    <img class='close' src="" />
  </div>
  <div class="pop-up-content">
+    <slot name="modal-body">這是 Modal 的 Body</slot>
  </div>
  <div class="pop-up-action flex justifyContent">
+    <slot name="modal-action">
       <button class='close'>取消</button>
       <button class='confirm'>確定送出</button>
+    </slot>
  </div>
</div>
```

![four](https://raw.githubusercontent.com/andrew781026/ithome_ironman_2021/master/day-06/number-icon/four.png) 設定 Modal 的 open . close 事件

```javascript
class Modal extends HTMLElement {

  connectedCallback() {

    this.attachShadow({mode: 'open'}).innerHTML = styleStr + htmlStr

    this.shadowRoot.querySelector('.close:nth-child(1)').addEventListener('click', () => this._close())
    this.shadowRoot.querySelector('.close:nth-child(2)').addEventListener('click', () => this._close())
    this.shadowRoot.querySelector('.confirm').addEventListener('click', () => this._confirm())
  }

  _open() {

    const shadowRoot = this.shadowRoot;
    const modalWrap = shadowRoot.querySelector('.pop-up-container');
    const popup = modalWrap.querySelector('.pop-up-box');

    modalWrap.style.display = 'flex';
    popup.style.transform = 'scale(0)';

    setTimeout(() => popup.style.transform = 'scale(1)', 0)
  }

  _close() {

    const shadowRoot = this.shadowRoot;
    const modalWrap = shadowRoot.querySelector('.pop-up-container');
    const popup = modalWrap.querySelector('.pop-up-box');

    popup.style.transform = 'scale(0)';

    setTimeout(() => modalWrap.style.display = 'none', 300)
  }
  
}

window.customElements.define('my-modal', Modal);

```

![five](https://raw.githubusercontent.com/andrew781026/ithome_ironman_2021/master/day-06/number-icon/five.png) 在頁面中使用 `my-modal`

```html
<body>
<my-modal @confirm="() => console.log('確定送出 !')">
  <h2 slot="modal-title">
    表頭寫入
  </h2>
  <h2 slot="modal-body">
    這是內文...這是內文...這是內文...這是內文...
  </h2>
</my-modal>

<script src="./modal-wc.js"></script>
</body>
</html>
```

![six](https://raw.githubusercontent.com/andrew781026/ithome_ironman_2021/master/day-06/number-icon/six.png) 建立按鈕來開啟今天製作的 Modal

```html
<button onclick='showModal()'>
  開啟 Modal
</button>
<script>
  function showModal() {
    document.querySelector('my-modal')._open()
  }
</script>
```

完成 !!

## 成果

![](https://i.imgur.com/bsrYtQX.gif)


如果想直接體驗成果 , 請到 [web-component-modal.html](https://andrew781026.github.io/ithome_ironman_2021/day-08/show-wc.html) 查看


## 參考資料 :

- [Udemy 課程 - Web Components & Stencil.js - Build Custom HTML Elements](https://www.udemy.com/course/web-components-stenciljs-build-custom-html-elements/)
- [webcomponents 官方網站 - Using templates and slots](https://developer.mozilla.org/en-US/docs/Web/Web_Components/Using_templates_and_slots)

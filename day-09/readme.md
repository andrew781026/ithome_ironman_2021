# [Day09] - 未知網址的彈跳視窗 - :is 設定

> 早上查看文章時 , 發現貼到昨天的資料 ![/images/emoticon/emoticon04.gif](/images/emoticon/emoticon04.gif)
> 本魯立馬作文章修改 , 如造成 `邦友` 的不便 , 請各位海涵 ![/images/emoticon/emoticon41.gif](/images/emoticon/emoticon41.gif)

有時 客制化元件時 , 我們只是想在 HTML 基礎 Tag 上加一個小功能

那我們可以使用 `is` 這個屬性來處理

下面我們來將 `<a>` 這個 HTML Tag 追加一個詢問是否離開頁面的 popup 吧 !

![](https://i.imgur.com/eHu90De.gif)

------

## 實作開始

![one](https://raw.githubusercontent.com/andrew781026/ithome_ironman_2021/master/day-06/number-icon/one.png) 找出對應的 HTML Class 名稱

由於我們是要延伸基礎的 HTML 元素 , 因此需要 extend 的對象不是 HTMLElement , 而是 Tag 對應的那個 DOM interface

我們可以到 [MDN 文件 去查出來](https://developer.mozilla.org/zh-TW/docs/Web/HTML/Element/a)

以今天要用的 `<a>` 為例 , 對應的 DOM interface 是 `HTMLAnchorElement`

![](https://i.imgur.com/PbAf6cL.png)


下方表列一些常用的 Tag 跟其對應的 DOM interface

| Tag Name | Class Name |
|---|---|
| `<a>` | HTMLAnchorElement |
| `<span>` | HTMLSpanElement |
| `<div>` | HTMLDivElement |
| `<ul>` | HTMLUListElement |
| `<li>` | HTMLLIElement |


![two](https://raw.githubusercontent.com/andrew781026/ithome_ironman_2021/master/day-06/number-icon/two.png) 在 defined 元件時 , 補上要 extend 的 DOM interface

```javascript
window.customElements.define('wavy-link', WavyLink, {extends: 'a'});
```

![three](https://raw.githubusercontent.com/andrew781026/ithome_ironman_2021/master/day-06/number-icon/three.png) 參考昨天的 Modal 設定 , 將其加到 wavy-link 上面

```javascript
window.addEventListener('DOMContentLoaded', (event) => {

  /*
 'beforebegin': 在 element 之前。
 'afterbegin': 在 element 裡面，第一個子元素之前。
 'beforeend': 在 element 裡面，最後一個子元素之後。
 'afterend': 在 element 之後。
  */

  const head = document.querySelector('head')

  head.insertAdjacentHTML('beforeend', `<link rel="stylesheet" href="./modal.css">`);
  head.insertAdjacentHTML('beforeend', `
        <style>
         .wave-link{
            display: inline-block;
            position:relative;
            background: url(http://i.imgur.com/HlfA2is.gif) bottom repeat-x;
         }
       </style>
    `);

});

function createElementFromHTML(htmlString) {
  var div = document.createElement('div');
  div.innerHTML = htmlString.trim();

  // Change this to div.childNodes to support multiple top-level nodes
  return div.firstChild;
}

class WavyLink extends HTMLAnchorElement {

  connectedCallback() {

    this.classList.add('wave-link')

    this.addEventListener('click', event => {

      event.preventDefault() // 停止 <a> 的預設行為 "跳轉頁面" 
      this._open()
    })

  }

  _open() {

    // append popupbox to body

    const href = this.getAttribute('href')

    const htmlStr = `
        <div class="pop-up-container">
          <div class="pop-up-container-root">
            <div class="pop-up-box">
              <div class="pop-up-title flex justifyContent">
                <h3 class="mr-30">您要離開此頁嗎 ?</h3>
                <img class='close' src="./close.svg" />
              </div>
              <div class="pop-up-content">
                你將會前往 <span class="wave-link url">${href}</span>
              </div>
              <div class="pop-up-action flex justifyContent">
               <slot name="modal-action">
                  <button class='close'>取消</button>
                  <button class='confirm'>確定</button>
                </slot>
              </div>
            </div>
          </div>
        </div>
    `

    const popupEl = createElementFromHTML(htmlStr)
    popupEl.querySelector('.pop-up-action .close').addEventListener('click', () => this._close())
    popupEl.querySelector('.pop-up-title .close').addEventListener('click', () => this._close())
    popupEl.querySelector('.pop-up-action .confirm').addEventListener('click', () => this._confirm())
    this._popupEl = popupEl

    document.querySelector('body').appendChild(popupEl);
  }

  _close() {

    const popup = this._popupEl.querySelector('.pop-up-container .pop-up-box');
    popup.style.transform = 'scale(0)';

    setTimeout(() => this._popupEl.remove(), 300)
  }

  _confirm() {

    this._close()
    setTimeout(() => location.href = this.getAttribute('href'), 400)
  }
}

window.customElements.define('wavy-link', WavyLink, {extends: 'a'});
```

完成 !!

## 成果

![](https://i.imgur.com/eHu90De.gif)


如果想直接體驗成果 , 請到 [web-component-modal.html](https://andrew781026.github.io/ithome_ironman_2021/day-09/show-wc.html) 查看


## 參考資料 :

- [Udemy 課程 - Web Components & Stencil.js - Build Custom HTML Elements](https://www.udemy.com/course/web-components-stenciljs-build-custom-html-elements/)
- [MDN 文件 - interfaces](https://developer.mozilla.org/en-US/docs/Web/API#interfaces)
- [MDN 文件 - Element.insertAdjacentHTML()](https://developer.mozilla.org/zh-TW/docs/Web/API/Element/insertAdjacentHTML)

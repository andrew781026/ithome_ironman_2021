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
<h3>Enter Your Nick Name：</h3>
<div>
  <wired-input placeholder="Enter name"></wired-input>
  <wired-button>確定</wired-button>
</div>
<button>進入遊戲</button>
```

這時我們可以觀察到 WebComponent 的第一個特性 : Custom Html Tag 

在頁面中 , 我們多加設定 button 的 styling , 

```html
<style>
button {
      background-color: #15aacb;
      border-radius: 4px;
      padding: 10px 25px;
      color: white;
      margin: 8px;
    }
</style>
```
![](https://i.imgur.com/RKeooY1.png)

我們可以觀察到 , 這並不會影響到 `wired-button` 這個元件的樣式

元件內外的樣式定義是分開的 , 這就是  WebComponent 的第二個特性 : Shadow Dom

這可以避免一些定義 button 樣式時 , 互相干擾的一些麻煩事 

有時 , 我們需要在我們定義的 Html Tag 中使用到原生的 Html Tag 

我們只需要將其放到我們的元件中即可

```html
<wired-card elevation="4" fill="darkred" style="color: lightyellow;" class="wired-rendered">
<h4>Colored Card</h4>
<p>
  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore
  magna aliqua.
  Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
</p>
</wired-card>
```

這就是  WebComponent 的第三個特性 : Slot

-----

下方整理一下 , 今天討論到的 WebComponent 三特性

| 專有名詞 | 說明 | 
|---|---|
| Custom Html Tag  | 產生自定義的 Tag 當作自身的元件使用 ex: `<wired-button/>` |
| Shadow Dom  | 將元件內外的樣式設定分隔開來 , 互不影響 |
| Slot  | 將元件內可以加上一些原生的 Html Tag |

![](https://i.imgur.com/cm5OUGj.png)

上述這些 , 不知道學過 `Vue` 的邦友們有沒有種很熟悉的感覺 ?

聽說 Vue 的作者在製作 Vue 時 , 有參考那時的 WebComponent 定義去製作 Vue 的

## 參考資料 :

- [Udemy 課程 - Web Components & Stencil.js - Build Custom HTML Elements](https://www.udemy.com/course/web-components-stenciljs-build-custom-html-elements/)
- [webcomponents 官方網站](https://www.webcomponents.org/)
- [MDN - webcomponents 介紹](https://developer.mozilla.org/en-US/docs/Web/Web_Components)
- [wired-button 的 JS 定義](https://unpkg.com/wired-elements@3.0.0-rc.6/lib/wired-button.js?module)


-------------





如果想要觀察 `wired-button` 如何定義 , 可到

在網頁中 , 有時會需要定義 button 之類的全局 styling , 當有 2 個 button 定義時 , 常常會有 button 設定互相干擾的情況 , 在 WebComponent 有個特別的東西 Shadow Dom , 讓其避免此類問題



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
- [Wired Elements](https://wiredjs.com/) - 手繪感十足的原件


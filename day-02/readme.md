# [Day02] - 旅途開始前的行前解說

昨天提到了 `Web Component` , 今天先初步了解一下什麼是 WebComponent 跟他能做什麼吧 !

------

## WebComponent 能做什麼 ?

這時我們可以先觀察一下 , 現成的 WebComponent - [Wired Elements](https://wiredjs.com/) 

如何在頁面中使用 Wired Elements 呢 ?

> [ 步驟一 ] 將 Wired Elements 的 JS 檔在 Html 中引用

```html
<script type="module" src="https://unpkg.com/wired-elements?module"></script>
```

> [ 步驟二 ] 在我們的頁面中使用 `wired-input` . `wired-button` ...等 , 特別的 Html Tag 使用 Wired Elements 定義好的元件

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

### 成果圖

![](https://i.imgur.com/EFalrcJ.png)

如果想查看實際頁面 , 請到 [import-wired-element.html](https://andrew781026.github.io/ithome_ironman_2021/day-02/import-wired-element.html) 查看

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

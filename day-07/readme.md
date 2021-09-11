# [Day07] - 新擬物風按鈕(五) - 參數改變 & 監聽變化

[Day05](https://ithelp.ithome.com.tw/articles/10261965) 時 , 我們製作了一個可傳入參數的 `neuomorphic-button` 

```html
<neuomorphic-button icon="fas fa-wifi"></neuomorphic-button>
```

不知道有沒有 `邦友` 改變過那個 icon 的參數值 ? 

![](https://i.imgur.com/PQCRkg0.gif)

上方 gif 中我將 `icon="fas fa-wifi"` 改成 `icon="fas fa-phone"` , 不過按鈕裡面的圖示並沒有跟著改變

- font-awesome 圖示對照表 

| icon 名稱 | 對應圖示 |
|---|---|
| fas fa-wifi | ![](https://i.imgur.com/3OA3iF9.png) |
| fas fa-phone | ![](https://i.imgur.com/eYLbS8u.png)  |

這是怎麼一回事呢 ?

------

## Web Component 的生命週期

Web Component 跟 React . Vue 相同有生命週期的存在 , 不過只有 5 個

生命週期的順序如下圖所示

![](https://i.imgur.com/I1Fi15z.png)

| 生命週期 | 描述 |
|---|---|
| constructor | 建立元件時觸發 |
| connectedCallback | 元件 append 到畫面中觸發 |
| disconnectedCallback | 移除元件時觸發  |
| adoptedCallback | 移動元件時觸發 , [有 iframe 時才會用到](https://stackoverflow.com/questions/50995139/when-does-webcomponent-adoptedcallback-fire) |
| attributeChangedCallback | 元件上屬性改變時觸發  |

根據上表 , 我們需要在 `icon` 發生變化時 , 利用 `attributeChangedCallback` 來更改實際顯示的 icon 

## 實作開始

![one](https://raw.githubusercontent.com/andrew781026/ithome_ironman_2021/master/day-06/number-icon/one.png) 註冊 `attributeChangedCallback` 事件

```javascript
class NeuomorphicButton extends HTMLElement {

  constructor() {

    ...如昨天所示之內容
  }

  attributeChangedCallback(name, oldValue, newValue) {
  
      console.table({name, oldValue, newValue})
  }
}

window.customElements.define('neuomorphic-button', NeuomorphicButton);
```

![two](https://raw.githubusercontent.com/andrew781026/ithome_ironman_2021/master/day-06/number-icon/two.png) 設定要監聽的屬性在 `observedAttributes` 中

```javascript
class NeuomorphicButton extends HTMLElement {

  constructor() {

    ...如昨天所示之內容
  }

+  static get observedAttributes() {
+    return ['icon']
+  }

  attributeChangedCallback(name, oldValue, newValue) {
  
      console.table({name, oldValue, newValue})
  }
}

window.customElements.define('neuomorphic-button', NeuomorphicButton);
```

![three](https://raw.githubusercontent.com/andrew781026/ithome_ironman_2021/master/day-06/number-icon/three.png) 監聽到 icon 屬性改變時 , 將內部的 `<i>` 上的 class 也一同改變

```javascript
attributeChangedCallback(name, oldValue, newValue) {

  const shadowRoot = this.shadowRoot;

  if (name === 'icon'){

    const i = shadowRoot.querySelector('i');
    i.className = newValue;
  }
  
}
```

之後圖示就會跟著我們的 icon 屬性一起變化

![](https://i.imgur.com/0dbEG6Z.gif)


如果想直接體驗成果 , 請到 [web-component-attributeChangedCallback.html](https://andrew781026.github.io/ithome_ironman_2021/day-07/show-wc.html) 查看


## 參考資料 :

- [Udemy 課程 - Web Components & Stencil.js - Build Custom HTML Elements](https://www.udemy.com/course/web-components-stenciljs-build-custom-html-elements/)
- [webcomponents 官方網站 - 使用生命周期回调函数](https://developer.mozilla.org/zh-CN/docs/Web/Web_Components/Using_custom_elements#%E4%BD%BF%E7%94%A8%E7%94%9F%E5%91%BD%E5%91%A8%E6%9C%9F%E5%9B%9E%E8%B0%83%E5%87%BD%E6%95%B0)

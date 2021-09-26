# [Day22] - 介紹 [LitElement](https://lit-element.polymer-project.org/guide) 如何使用

今天我們來介紹一下 , 昨天說明的 Web Component 框架中的其中之一 - [LitElement](https://lit-element.polymer-project.org/guide)

特別拿出來介紹 , 是因為你可以不需要 compile ,

就直接將你的 web component 加上 render with data 的 MVVM 模式的功能

## 內文

- [LitElement](https://lit-element.polymer-project.org/guide) - Google 製作的 Web Component 框架

```javascript
import {LitElement, html, css} from 'https://unpkg.com/lit-element/lit-element.js?module';

class MyElement extends LitElement {

  static get properties() {
    return {
      mood: {type: String}
    }
  }

  static get styles() {
    return css`.green-txt {
      color: green;
    }`;
  }

  render() {
    return html`Web Components are <span class="green-txt">${this.mood}</span>!`;
  }

}

customElements.define('my-element', MyElement);
```



## 參考資料

- [lit-element 官方 docs](https://lit-element.polymer-project.org/guide/lifecycle)
- [codepen - lit-element 範例](https://codepen.io/sorvell/pen/RYQyoe)

# [Day21] - 製作 Web component 的一些工具

前幾天我們花費心力 , 說明 Web Component 如何製作 ,

與當資料變換時 , 我們需要使用的 _render

還有就是全部更新太耗效能 , 而需要採取的分區塊 _render 的機制 ,

進而提出 vNode 與 Html String to AST 的技巧 ,

其實這些東西我們可以不用自己處理 ,

已經有框架幫我們處理好 Web Component 的 render 那些事 ,

因此我們可以用 MVVM 的思考方式 + 下述的框架 , 來輕鬆製作 Web Component

當然 , 每個技術用不同的方式實現 , 大體分為 2 類

## Libraries

> extend 設定好的 HTMLElement 來建立 Web Component

- [LitElement](https://lit-element.polymer-project.org/guide) - Google 製作的 Web Component 框架

```javascript
export class MyElement extends LitElement { ... } 

customElements.define('my-element', MyElement);
```

![LitElement LOGO](https://i.imgur.com/YOQCHXq.png)

- [alpine.js](https://alpinejs.dev/)

![alpine.js LOGO](https://i.imgur.com/emCpGJN.png)

- [omi.js](https://github.com/Tencent/omi#getting-started) - Tencent 製作的 Web Component 框架

![omi.js LOGO](https://i.imgur.com/KlS4C4v.png)

```javascript
class MyElement extends WeElement{ ... } 

customElements.define('my-element', MyElement);
```

## Compiler

> 通過 Build 編譯出對應的 Web Component

- [stencil.js](https://stenciljs.com/docs/getting-started) - ionic 團隊製作的 Compiler 框架

![stencil.js LOGO](https://i.imgur.com/zz2J7lI.png)

- [Svelte.js](https://svelte.dev/)

![Svelte.js LOGO](https://i.imgur.com/r4lHGAM.png)

之後的幾天 , 我們就來接觸這些工具如何使用

### 備註

其實 [alpine.js](https://alpinejs.dev/) 已經有邦友詳細介紹過了 ,

如果想了解 [alpine.js](https://alpinejs.dev/) 詳細如何使用 ,

請參考 [Day30-鐵人三十天回顧Alpine.js總整理](https://ithelp.ithome.com.tw/articles/10253523)

## 參考資料

- [9 Web Components UI Libraries You Should Know in 2021](https://blog.bitsrc.io/9-web-component-ui-libraries-you-should-know-in-2019-9d4476c3f103)
- [WebComponents.dev](https://webcomponents.dev/)

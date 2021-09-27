# [Day22] - 介紹 [LitElement](https://lit-element.polymer-project.org/guide) 如何使用

今天我們來介紹一下 , 昨天說明的 Web Component 框架中的其中之一 - [LitElement](https://lit-element.polymer-project.org/guide)

特別拿出來介紹 , 是因為你可以不需要 compile ,

就直接將你的 web component 加上 render with data 的 MVVM 模式的功能

## 內文

- [LitElement](https://lit-element.polymer-project.org/guide) - Google 製作的 Web Component 框架

```javascript
import {LitElement, html, css} from 'https://unpkg.com/lit-element/lit-element.js?module';

class MyCircle extends LitElement {

  static get properties() {
    return {
      color1: {type: String},
      color2: {type: String},
      percent: {type: Number},
    }
  }


  get myStyles() {

    const middleDegrees = parseInt(this.percent) / 100 * 360

    return html`
      <style>
        .pie {
        width: 100px;
        height:100px;
        border-radius:50%;
        background: conic-gradient(${this.color1} 0deg ${middleDegrees}deg, ${this.color2} ${middleDegrees}deg 360deg);
        }
      </style>
    `;
  }

  render() {
    return html`${this.myStyles}<div class="pie"></div>`;
  }

}

customElements.define('my-circle', MyCircle);
```

```html
<html>
<head>
</head>
<body>
<!-- Works only on browsers that support Javascript modules like
     Chrome, Safari, Firefox 60, Edge 17 -->
<script type="module" src="./my-element.js"></script>

<my-circle color1="red" color2="yellow" percent="0"></my-circle>
<input type="range" value="0" min="0" max="100">
<label>0 %</label>

<script>
  document.addEventListener('DOMContentLoaded', () => {

    const $label = document.querySelector('label')
    const $range = document.querySelector('input[type="range"]')
    const $circle = document.querySelector('my-circle')

    $range.addEventListener('input', () => {

      console.log('change , $range.value=', $range.value)

      const value = $range.value;
      $label.innerText = value + ' %';
      $circle.setAttribute('percent', value)
    })
  })
</script>
</body>
</html>
```

## 成果

![](https://i.imgur.com/Qwu4E3K.gif)

## 參考資料

- [lit-element 官方 docs](https://lit-element.polymer-project.org/guide/lifecycle)
- [codepen - lit-element 範例](https://codepen.io/sorvell/pen/RYQyoe)
- [oninput Event](https://www.w3schools.com/jsref/event_oninput.asp)
- [conic-gradient](https://developer.mozilla.org/en-US/docs/Web/CSS/gradient/conic-gradient())

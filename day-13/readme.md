# [Day13] - 利用 Button 範例 - 解說 render 函式

昨天我們解說了 , Jquery 跟 Vue 兩種處理 Dom 的模式

在文末 , 提到了 Web Component 中沒有 Vue 可用 , 

不過我們可以建立 _render 函式 , 來達到資料的單向綁定

今天我們來建立 _render 函式 , 並利用 [day-11]() 提到的 Proxy 來觸發 _render 函式

達成資料的單向綁定

----

![one](https://raw.githubusercontent.com/andrew781026/ithome_ironman_2021/master/day-06/number-icon/one.png) 將昨天的 button 範例轉換成 Web Component

> 將昨天的 `my-button.vue` 中的 style . script . template 三個區塊放到相對應的位置

- style 區塊 , 在 class 上建立 style 屬性 , 並將 this.styles 設定成 style 區塊的內容
- template 區塊 , 建立一個 _render() 函式 , 將 template 區塊的內容放這 , 並覆蓋 rootDiv 的 innerHTML
- methods 區塊 , 直接放入 class 的內部 , 當成 class 的函式
- computed 區塊 , 直接放入 class 的內部 , 當成 class 的函式

![](https://i.imgur.com/K6hqCSi.png)

```javascript
// my-button.js
class MyButton01 extends HTMLElement {

  // style 的內容放這
  styles = `
    <style>
      button.btn {
        padding: 10px 20px;
        border-radius: 8px;
        font-size: 16px;
        color: white;
      }

      button:disabled {
        cursor: not-allowed;
      }
    </style>
  `

  connectedCallback() {

    this.attachShadow({mode: 'open'}).innerHTML = this.styles + `<div></div>`;
    this._render()
  }

  _render() {

    const rootDiv = this.shadowRoot.querySelector('div')

    // template 的內容放這
    rootDiv.innerHTML = `
        <div>
          <h2>目前有 <span class="left">{{left}}</span> 點數</h2>
          <h2>預計花費 <span class="cost">{{cost}}</span> 點數</h2>
          <button class="btn" :style="{backgroundColor:bgColor}" :disabled="disabled" @click="buy">
            購買
          </button>
          <h2></h2>
          <button @click="login">登入</button>
          <button @click="logout">登出</button>
          <h2></h2>
          <button @click="addCost(100)">加買法帳( 100 點 )</button>
          <button @click="minusCost(100)" :disabled="cost === 0">減買法帳( 100 點 )</button>
        </div>
    `
  }

  // computed . methods 的內容放在這裡

}

window.customElements.define('my-button-01', MyButton01);
```

![two](https://raw.githubusercontent.com/andrew781026/ithome_ironman_2021/master/day-06/number-icon/two.png) 將 [day-11] 學到的 Proxy 建立 

> this.data = new Proxy 

```javascript
  data = new Proxy(
    // 將預設設定到 target 中
    {
      cost: 0,
      left: 500,
      isLogin: false
    },
    // handler set 資料後 , 執行 render 函式
    {
      get: (target, property) => target[property],
      set: (target, property, value) => {
        target[property] = value;
        this._render()
        return true
      },
    })
```

![three](https://raw.githubusercontent.com/andrew781026/ithome_ironman_2021/master/day-06/number-icon/three.png) 將 :XXX 的屬性改成 ${} 的區塊

```javascript
  _render() {
  
    const rootDiv = this.shadowRoot.querySelector('div')
  
    // template 的內容放這
    rootDiv.innerHTML = `
        <h2>目前有 <span class="left">${this.data.left}</span> 點數</h2>
        <h2>預計花費 <span class="cost">${this.data.cost}</span> 點數</h2>
        <button class="btn" style="background-color: ${this.bgColor()};" ${this.disabled() ? 'disabled':'' } @click="buy">
          購買
        </button>
        <h2></h2>
        <button @click="login">登入</button>
        <button @click="logout">登出</button>
        <h2></h2>
        <button @click="addCost(100)">加買法帳( 100 點 )</button>
        <button @click="minusCost(100)" ${this.data.cost === 0 ? 'disabled':'' }>減買法帳( 100 點 )</button>
    `
  }
```

![four](https://raw.githubusercontent.com/andrew781026/ithome_ironman_2021/master/day-06/number-icon/four.png) 將 @click 的事件綁定到 dom 上

> 建立 vOn 函式

```javascript
// the :params resolve
  vOn() {

    // 特殊字元 ( @ : ) 在 querySelector 的處理 - https://stackoverflow.com/questions/45110893/select-elements-by-attributes-with-colon
    const onClickEls = this.shadowRoot.querySelectorAll('button[\\@click]')

    onClickEls.forEach(el => {

      const onclickStr = el.getAttribute('@click')

      if (onclickStr.indexOf('(') > -1) {

        const fn = this[onclickStr.split('(')[0]]

        // 取得 () 中的參數設定

        const paramStrs = onclickStr.split('(')[1].replace(')', '').split(',')
        const param = paramStrs.map(param => {

          const numberReg = /^[\+\-]?\d*\.?\d+(?:[Ee][\+\-]?\d+)?$/

          if (param === 'true') return true
          else if (param === 'false') return false
          else if (param === 'false') return false
          else if (numberReg.test(param)) return parseFloat(param)
          else if (this.data[param]) return this.data[param]
          else return param
        })

        el.addEventListener('click', e => fn.call(this, ...param))

      } else {

        const fn = this[onclickStr]
        el.addEventListener('click', e => fn.call(this, e))
      }

    })
  }
``` 

> 每次 _render 時 , 呼叫 vOn() , 綁定 @click 事件

```javascript
 _render() {

    // ...之前的 Code

    this.vOn()
  }
```

大功告成 ~~~~~

## 成果

![](https://i.imgur.com/jx0Ngjd.gif)
 

如果想直接體驗成果 , 請到 [web-component-render.html](https://andrew781026.github.io/ithome_ironman_2021/day-13/show-wc.html) 查看

## 參考資料 :

- [Udemy 課程 - Web Components & Stencil.js - Build Custom HTML Elements](https://www.udemy.com/course/web-components-stenciljs-build-custom-html-elements/)
- [Virtual DOM | 為了瞭解原理，那就來實作一個簡易 Virtual DOM 吧！](https://medium.com/%E6%89%8B%E5%AF%AB%E7%AD%86%E8%A8%98/build-a-simple-virtual-dom-5cf12ccf379f)

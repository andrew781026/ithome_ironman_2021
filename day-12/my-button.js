class MyTab extends HTMLElement {

  data = new Proxy(
    {
      cost: 0,
      left: 500,
      isLogin: false
    },
    {

      get: (target, property) => target[property],
      set: (target, property, value) => {
        target[property] = value;
        this._render()
        return true
      },
    })

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

  html = `
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

  connectedCallback() {

    this.attachShadow({mode: 'open'}).innerHTML = this.styles + this.html;
  }

  // the :params resolve
  vBind() {

    let el = `<button @click="minusCost(100)" :disabled="cost === 0">減買法帳( 100 點 )</button>`
    const attrs = el.attributes
      .filter(attr => attr.name.startsWith(':'))
      .reduce((pre, curr) => {

        return {
          ...pre,
          [curr.name]: curr.value
        }

      }, {});
    const temp = (el, attr, data) => {

      const f = new Function(...Object.keys(data), `return ${attrs[attr]}`)
      const attrVal = f(...Object.values(data))
      el.setAttribute(attr, attrVal)
      return attrVal
    };
    temp(el, attr, this.data)

  }

  _render() {


  }

}

window.customElements.define('my-tab', MyTab);

class MyButton extends HTMLElement {

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

  listFn = () => Object.getOwnPropertyNames(this)

  connectedCallback() {

    this.attachShadow({mode: 'open'}).innerHTML = this.styles + `<div></div>`;
    this._render()
  }

  static get observedAttributes() {
    return ['left', 'cost', 'isLogin']
  }

  attributeChangedCallback(name, oldValue, newValue) {

    this.data[name] = newValue
  }

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

  login() {
    this.data.isLogin = true
  }

  logout() {
    this.data.isLogin = false
  }

  buy() {
    this.data.left -= this.data.cost
    this.data.cost = 0
  }

  addCost(amount) {
    this.data.cost += amount
    // console.log(`追加消費 ${amount} 點，預計花費 ${this.cost} 點`)
  }

  minusCost(amount) {
    this.data.cost -= amount
    // console.log(`減少花費 ${amount} 點，預計花費 ${this.cost} 點`)
  }

  notLogin() {
    return !this.data.isLogin
  }

  disabled() {
    if (this.notLogin()) return true
    else if (this.data.cost > this.data.left) return true
    else return false
  }

  bgColor() {
    if (this.notLogin()) return 'gray'
    else if (this.data.cost > this.data.left) return 'gray'
    else if (this.data.cost === this.data.left) return 'orange'
    else return 'green'
  }

  _render() {

    console.log('this.data=', this.data)
    const rootDiv = this.shadowRoot.querySelector('div')

    rootDiv.innerHTML = `
        <h2>目前有 <span class="left">${this.data.left}</span> 點數</h2>
        <h2>預計花費 <span class="cost">${this.data.cost}</span> 點數</h2>
        <button class="btn" style="background-color: ${this.bgColor()};" disabled="${this.disabled()}" @click="buy">
          購買
        </button>
        <h2></h2>
        <button @click="login">登入</button>
        <button @click="logout">登出</button>
        <h2></h2>
        <button @click="addCost(100)">加買法帳( 100 點 )</button>
        <button @click="minusCost(100)" ${this.data.cost === 0 ? 'disabled':'' }>減買法帳( 100 點 )</button>
    `

    this.vOn()
  }

}

window.customElements.define('my-button', MyButton);

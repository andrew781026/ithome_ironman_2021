class WordCount extends HTMLElement {

  data = new Proxy(
    // 將預設設定到 target 中
    {
      count: 0,
      limit: 100
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

  styles = `
    <style>
      p > em {
        color: red;
        font-size: 2em;
      }

      :host{
        width: 100%;
        height: 100%;
      }

    </style>
  `

  listFn = () => Object.getOwnPropertyNames(this)

  constructor() {
    super();

    this.attrToData();
  }

  attrToData() {

    const attrs = this.attributes;
    for (let i = 0; i < attrs.length; i++) {
      const attr = attrs[i]
      this.data[attr.name] = attrs.value
    }
  }

  connectedCallback() {

    const htmlStr = `
      <div>
        <slot></slot>
        <p>您目前輸入 <em>${this.data.count}</em> 個字 , 字數上限為 ${this.data.limit} 字</p>
      </div>
    `

    this.attachShadow({mode: 'open'}).innerHTML = this.styles + htmlStr;
    this.wordCount()
    this._render()
  }

  static get observedAttributes() {
    return ['limit']
  }

  attributeChangedCallback(name, oldValue, newValue) {

    this.data[name] = newValue
  }

  wordCount() {

    const inpurEl = this.querySelector('.needcount')

    inpurEl.addEventListener('keyup', e => {


      const value = e.currentTarget?.value;
      const length = value?.length;

      if (length > this.data.limit) e.currentTarget.value = value.substr(0, length - 1)
      else this.data.count = length
    })
  }

  _render() {

    const shadowRoot = this.shadowRoot

    if (shadowRoot) {

      const pEL = this.shadowRoot.querySelector('div > p')
      pEL.outerHTML = `<p>您目前輸入 <em>${this.data.count}</em> 個字 , 字數上限為 ${this.data.limit} 字</p>`
    }
  }

}

window.customElements.define('word-count', WordCount);

class WebComponent08 extends HTMLElement {

  constructor() {

    super();

    const fontAwesomeStyle = `<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.1/css/all.min.css">`

    // neumorphism 產生器 : https://neumorphism.io/#e0e0e0
    const styleStr = `
    <style>
       label input[type='checkbox'] {
        display: none;
      }

      label .icon-box {
          width: 60px;
          height: 60px;
          position:relative;
          background-color: #d1e5d1;
             box-shadow:  8px 8px 16px #bcbcbc,
             -8px -8px 16px #ffffff;
          display: flex;
          justify-content: center;
          align-items: center;
          border-radius: 10px;
          cursor: pointer;
      }

      label .icon-box::before {
         position: absolute;
         left: -1px;
         top: -1px;
         content: '';
         width: 101%;
         height: 101%;
         background-color: rgba(0,0,0,0.1);
         opacity: 0;
         transition: opacity 0.5s;
         border-radius: 10px;
      }

       label .icon-box:hover::before {
        opacity: 1;
      }

      label .icon-box i {
          font-size: 2em;
          color: #2ad7bd;
      }

      label input[type='checkbox']:checked ~ .icon-box {
          box-shadow: inset -2px -2px 5px rgba(255, 255, 255, 1),
          inset 3px 3px 5px rgba(0, 0, 0, 0.1);
      }

      label input[type='checkbox']:checked ~ .icon-box i {
          transform: scale(0.95);
          filter: hue-rotate(90deg);
      }

      </style>`;

    // 取得原件上的 icon 屬性
    const iconName = this.getAttribute('icon') || 'fas fa-wifi'

    const div = document.createElement('div')
    div.classList.add('icon-box')

    // 將取到的 iconName 設定給 i
    div.innerHTML = `<i class="${iconName}"></i>`

    const label = document.createElement('label')
    label.innerHTML = `<input type="checkbox">`
    label.append(div)

    const shadowRoot = this.attachShadow({mode: 'open'})
    shadowRoot.innerHTML = fontAwesomeStyle + styleStr
    shadowRoot.append(label)

    const self = this

    const checkbox = label.querySelector('input[type="checkbox"]')
    checkbox.addEventListener('change', function (e) {

      const oncheck = self.getAttribute('oncheck')

      // detail 就是 CustomEvent 內的參數
      const clickEvent = new CustomEvent('check', {composed: true, detail: {check: this.checked}});
      self.dispatchEvent(clickEvent)
      eval(oncheck)
    });
  }
}

window.customElements.define('wc-08', WebComponent08);

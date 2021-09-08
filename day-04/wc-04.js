class WebComponent04 extends HTMLElement {

  // as Component mounted to page
  constructor() {

    // Always call super first in constructor
    super();

    // Element functionality written in here
    const div = document.createElement('div')
    div.classList.add('icon-box')
    div.innerHTML = `<i class="fas fa-wifi"></i>`

    const label = document.createElement('label')
    label.innerHTML = `<input type="checkbox">`
    label.append(div)

    const shadowRoot = this.attachShadow({mode: 'open'})
    shadowRoot.append(label)
  }
}

window.customElements.define('wc-04', WebComponent04);

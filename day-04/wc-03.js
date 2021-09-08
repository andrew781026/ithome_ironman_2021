class WebComponent03 extends HTMLElement {

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

    this.append(label)
  }
}

window.customElements.define('wc-03', WebComponent03);

class WebComponent02 extends HTMLElement {

  // as Component mounted to page
  constructor() {

    // Always call super first in constructor
    super();

    // Element functionality written in here
    const div = document.createElement('div')
    div.classList.add('icon-box')
    div.innerHTML = `<i class="fas fa-wifi"></i>`

    this.append(div)
  }
}

window.customElements.define('wc-02', WebComponent02);

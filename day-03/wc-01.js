class WebComponent01 extends HTMLElement {

  // as Component mounted to page
  constructor() {

    // Always call super first in constructor
    super();

    // Element functionality written in here
    const img = document.createElement('img')
    img.src = 'https://raw.githubusercontent.com/andrew781026/ithome_ironman_2021/master/day-03/cat.png'

    this.append(img)
  }
}

window.customElements.define('wc-01', WebComponent01);

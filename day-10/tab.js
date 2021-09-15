function createElementFromHTML(htmlString) {
  var div = document.createElement('div');
  div.outerHTML = htmlString.trim();

  // Change this to div.childNodes to support multiple top-level nodes
  return div;
}

class MyTab extends HTMLElement {

  connectedCallback() {

    const tabHeaders = [...this.querySelectorAll('.item')]


    const tabBodies = [...this.querySelectorAll('[slot]')]

    const tabBodyStr = tabBodies
      .map(tabContent => `<slot name="${tabContent.getAttribute('slot')}" class="city tab-body"></slot>`)
      .join('')

    const styleStr = `<link rel="stylesheet" href="./tab.css">`

    const htmlStr = `
        <div class="tab-head">
          ${tabHeaders.map(head => head.outerHTML).join('')}
        </div>
        ${tabBodyStr}
    `

    this.attachShadow({mode: 'open'}).innerHTML = styleStr + htmlStr;

    const items = this.shadowRoot.querySelectorAll('.item');
    [...items].map(item => item.addEventListener('click', e => this._tabClick(e)))
  }

  _tabClick(e) {

    console.log(e)
    const tabName = e.target.innerText;
    const shadowRoot = this.shadowRoot;
    const tabBodies = shadowRoot.querySelectorAll(".tab-body");
    const items = shadowRoot.querySelectorAll(".tab-head .item");

    tabBodies.forEach(content => (content.id === tabName) ? content.style.display = "block" : content.style.display = "none")
    items.forEach(item => (item.innerText === tabName) ? item.classList.add('active') : item.classList.remove('active'))
  }

}

window.customElements.define('my-tab', MyTab);

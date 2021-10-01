class MyNavbar extends HTMLElement {

  getStyle() {

    return `
        <style>
            .root{
              background-color: #15c424;
              font-weight: 900;
              font-size: 40px;
              width: 20vw;
              min-height: 100%;
              display: flex;
              justify-content: center;
              align-items: center;
             }
        </style>
    `
  }

  // mounted
  connectedCallback() {

    this.attachShadow({mode: 'open'}).innerHTML = `${this.getStyle()}<div class="root">Navbar</div>`
  }
}

window.customElements.define('my-navbar', MyNavbar)

class MyNavigation extends HTMLElement {

  getStyle() {

    return `
        <style>
            .root{
              background-color: #0df1f1;
              font-weight: 900;
              font-size: 40px;
              min-width: 100vw;
              min-height: 130px;
              display: flex;
              justify-content: center;
              align-items: center;
             }
        </style>
    `
  }

  // mounted
  connectedCallback() {

    this.attachShadow({mode: 'open'}).innerHTML = `${this.getStyle()}<div class="root">Navigation</div>`
  }
}

window.customElements.define('my-navigation', MyNavigation)

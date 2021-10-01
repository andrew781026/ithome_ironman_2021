class MyFriendlist extends HTMLElement {

  getStyle() {

    return `
        <style>
            .root{
              background-color: #c653ee;
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

    this.attachShadow({mode: 'open'}).innerHTML = `${this.getStyle()}<div class="root">Friendlist</div>`
  }
}

window.customElements.define('my-friendlist', MyFriendlist)

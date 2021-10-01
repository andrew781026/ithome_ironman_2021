class CreateStory extends HTMLElement {

  getStyle() {

    return `
        <style>
            :host{
              flex-grow: 1;
            }

            .root{
              background-color: #de9f2a;
              font-weight: 900;
              font-size: 40px;
              height: 100%;
              width: 100%;
              display: flex;
              justify-content: center;
              align-items: center;
             }
        </style>
    `
  }

  // mounted
  connectedCallback() {

    this.attachShadow({mode: 'open'}).innerHTML = `${this.getStyle()}<div class="root">CreateStory</div>`
  }
}

window.customElements.define('create-story', CreateStory)

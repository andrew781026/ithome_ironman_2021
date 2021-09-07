function createElementFromHTML(htmlString) {
  var div = document.createElement('div');
  div.innerHTML = htmlString.trim();

  // Change this to div.childNodes to support multiple top-level nodes
  return div.firstChild;
}

class CatCheckbox extends HTMLElement {
  constructor() {
    // Always call super first in constructor
    super();

    // Element functionality written in here

    const styles = `

      <style>
    body {
      margin: 0;
      min-height: 100vh;
      display: flex;
      justify-content: center;
      align-items: center;
    /*  background-color: #0df1f1; */
    }

    .wrap {
      position: relative;
      height: 100px;
      width: 100px;
    }

    .wrap * {
      position: absolute;
      width: 100%;
      height: 100%;
      margin: auto;
      cursor: pointer;
      user-select: none;
      transition: all 0.3s;
    }

    .wrap *:hover {
      transform: scale(1.1);
      transform-origin: bottom center;
      filter: drop-shadow(0 0 5px rgba(0, 0, 0, 0.5));
    }

    .cat {
      background-size: cover;
      background-image: url("data:image/png;base64,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");
    }

    .cat-outline {
      background-size: cover;
      background-image: url("data:image/png;base64,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");
    }

    .hide {
      display: none;
    }
  </style>`

    document.querySelector('body').insertAdjacentHTML('afterbegin', styles);

  }

  connectedCallback(){

    const htmlStr = `
    <div class="wrap">
      <div class="cat"></div>
      <div class="cat-outline hide"></div>
      </div>
    `

    const div = createElementFromHTML(htmlStr)
    this.appendChild(div)

    div.addEventListener('click', e => {

      const first = div.querySelector(':first-child')
      const last = div.querySelector(':last-child')

      if (first.classList.contains('hide')) {
        first.classList.remove('hide')
        last.classList.add('hide')
      } else {
        first.classList.add('hide')
        last.classList.remove('hide')
      }
    })
  }
}

window.customElements.define('cat-checkbox', CatCheckbox);

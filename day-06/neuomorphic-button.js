document.addEventListener('DOMContentLoaded', (event) => {

  function loadCSSIfNotAlreadyLoadedForSomeReason(cssLink = "/path/to.css") {
    const ss = document.styleSheets;
    for (var i = 0, max = ss.length; i < max; i++) {
      if (ss[i].href === cssLink)
        return;
    }

    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = cssLink;

    document.getElementsByTagName("head")[0].appendChild(link);
  }

  loadCSSIfNotAlreadyLoadedForSomeReason('https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.1/css/all.min.css');
});

class NeuomorphicButton extends HTMLElement {

  connectedCallback() {

    // Create some CSS to apply to the shadow dom
    // let style = document.createElement('style');

    const fontAwesomeStyle = `<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.1/css/all.min.css">`

    // neumorphism 產生器 : https://neumorphism.io/#e0e0e0
    const styleStr = `
    <style>
       label input[type='checkbox'] {
        display: none;
      }

      label .icon-box {
         /* width: 60px;
          height: 60px; */
          position:relative;
          background-color: #ebf5fc;
             box-shadow:  8px 8px 16px #bcbcbc,
             -8px -8px 16px #ffffff;
          display: flex;
          justify-content: center;
          align-items: center;
          border-radius: 10px;
          cursor: pointer;
      }

      label .icon-box::before {
         position: absolute;
         left: -1px;
         top: -1px;
         content: '';
         width: 101%;
         height: 101%;
         background-color: rgba(0,0,0,0.1);
         opacity: 0;
         transition: opacity 0.5s;
         border-radius: 10px;
      }

       label .icon-box:hover::before {
        opacity: 1;
      }

      label .icon-box i {
          font-size: 2em;
          color: #6a9bd8;
      }

      label input[type='checkbox']:checked ~ .icon-box {
          box-shadow: inset -2px -2px 5px rgba(255, 255, 255, 1),
          inset 3px 3px 5px rgba(0, 0, 0, 0.1);
      }

      label input[type='checkbox']:checked ~ .icon-box i {
          transform: scale(0.95);
          filter: hue-rotate(90deg);
      }

      </style>`;

    const icon = this.getAttribute('icon') || 'fas fa-wifi'
    const size = this.getAttribute('size') || 70
    const color = this.getAttribute('color') || '#6a9bd8'
    const bgColor = this.getAttribute('bg-color') || '#ebf5fc'

    const htmlStr = `
        <label>
          <input type="checkbox" name="">
          <div class="icon-box" style="width: ${size}px;height: ${size}px;background-color:${bgColor}">
              <i class="${icon}" style="font-size: ${size * 0.6}px;color:${color}"></i>
          </div>
        </label>
    `

    this.attachShadow({mode: 'open'}).innerHTML = fontAwesomeStyle + styleStr + htmlStr
  }
}

window.customElements.define('neuomorphic-button', NeuomorphicButton);

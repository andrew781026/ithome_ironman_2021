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

  lightenDarkenColor(col, amt) {

    var usePound = false;

    if (col[0] === "#") {
      col = col.slice(1);
      usePound = true;
    }

    var num = parseInt(col, 16);

    var r = (num >> 16) + amt;

    if (r > 255) r = 255;
    else if (r < 0) r = 0;

    var b = ((num >> 8) & 0x00FF) + amt;

    if (b > 255) b = 255;
    else if (b < 0) b = 0;

    var g = (num & 0x0000FF) + amt;

    if (g > 255) g = 255;
    else if (g < 0) g = 0;

    return (usePound ? "#" : "") + (g | (b << 8) | (r << 16)).toString(16);

  }

  connectedCallback() {

    // Create some CSS to apply to the shadow dom
    // let style = document.createElement('style');

    const fontAwesomeStyle = `<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.1/css/all.min.css">`

    const styleStr = `
    <style>
       label input[type='checkbox'] {
        position: absolute;
        opacity: 0;
      }

      label .icon-box {
         /* width: 60px;
          height: 60px; */
          position:relative;
          background-color: #ebf5fc;
          box-shadow: -2px -2px 5px rgba(255, 255, 255, 1),
          3px 3px 5px rgba(0, 0, 0, 0.1);
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

/*

// 參考資料 : https://stackoverflow.com/questions/54546007/why-doesnt-font-awesome-work-in-my-shadow-dom#answer-55360574
let template = `
<style>
:host {
  display: block;
}
</style>
<link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.7.1/css/all.css" integrity="sha384-fnmOCqbTlWIlj8LyTjo7mOUStjsKC4pOpQbqyi7RrhN7udi9RwhKkMHpvLbHG9Sr" crossorigin="anonymous">
<header>
  <h1>DreamLine</h1>
  <nav>
    <ul>
      <li><a href="#0">Tour</a></li>
      <li><a href="#0">Blog</a></li>
      <li><a href="#0">Contact</a></li>
      <li><a href="#0">Error</a></li>
      <li><a href="#0"><i class="fa fa-search"></i> Search</a></li>
    </ul>
  </nav>
</header>
`;

class MyEl extends HTMLElement {
  connectedCallback() {
    this.attachShadow({mode: 'open'}).innerHTML = template;
  }
}

customElements.define("blog-header", MyEl);

 */

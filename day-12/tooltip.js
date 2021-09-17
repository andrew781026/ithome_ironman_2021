function listAllEventListeners() {
  const allElements = Array.prototype.slice.call(document.querySelectorAll('*'));
  allElements.push(document);
  allElements.push(window);

  const types = [];

  for (let ev in window) {
    if (/^on/.test(ev)) types[types.length] = ev;
  }

  let elements = [];
  for (let i = 0; i < allElements.length; i++) {
    const currentElement = allElements[i];
    for (let j = 0; j < types.length; j++) {
      if (typeof currentElement[types[j]] === 'function') {
        elements.push({
          "node": currentElement,
          "type": types[j],
          "func": currentElement[types[j]].toString(),
        });
      }
    }
  }

  return elements.sort(function (a, b) {
    return a.type.localeCompare(b.type);
  });
}

// 參考資料 : https://medium.com/@westbrook/your-content-in-shadow-dom-portals-b964578a2e74
class TooltipBody extends HTMLElement {

  connectedCallback() {

    const styleStr = `<link rel="stylesheet" href="./tooltip.css">`

    const htmlStr = `<slot name="tooltip"/>`

    this.attachShadow({mode: 'open'}).innerHTML = styleStr + htmlStr;
  }
}

class MyTooltip extends HTMLElement {

  _tooltipBodys = []

  connectedCallback() {

    const styleStr = `<link rel="stylesheet" href="./tooltip.css">`

    const htmlStr = `<slot></slot>`

    this.attachShadow({mode: 'open'}).innerHTML = styleStr + htmlStr;

    this.addEventListener('mouseenter', e => this._open(e))
    this.addEventListener('mouseleave', e => this._close(e))
    this._open()
  }

  _open(e) {

    const body = document.body
    // let template = document.getElementById('my-paragraph');
    // let templateContent = template.content;
    // document.body.appendChild(templateContent);

    // slot = 'tooltip'

    const tooltipBody = document.createElement('tooltip-body')
    tooltipBody.innerHTML = this.querySelector('[slot="tooltip"]').outerHTML

    this._tooltipBodys.push(tooltipBody)
    body.append(tooltipBody)
  }

  _close(e) {

    this._tooltipBodys.pop().remove()
  }
}

window.customElements.define('my-tooltip', MyTooltip);
window.customElements.define('tooltip-body', TooltipBody);

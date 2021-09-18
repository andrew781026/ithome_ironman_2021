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

  data = new Proxy({}, {

    get: (target, property) => target[property],
    set: (target, property, value) => {
      target[property] = value;
      this._render()
      return true
    },
  })

  connectedCallback() {

    this.attachShadow({mode: 'open'})
    this.data.open = this.getAttribute('open')
  }

  static get observedAttributes() {
    return ['open']
  }

  attributeChangedCallback(name, oldValue, newValue) {

    this.data[name] = newValue
  }

  _render() {

    const styleStr = `<link rel="stylesheet" href="./tooltip-body.css">`
    const htmlStr = `<slot name="tooltip"/>`
    if (this.shadowRoot) this.shadowRoot.innerHTML = styleStr + htmlStr;

    this.className = `${this.data.open ? 'enter' : 'leave'}`
  }

}

class MyTooltip extends HTMLElement {

  connectedCallback() {

    const styles = `
      <style>
      :host{
        align-self: flex-start;
      }
      </style>
    `;

    const htmlStr = `<slot></slot>`

    this.attachShadow({mode: 'open'}).innerHTML = styles + htmlStr;

    this.addEventListener('mouseenter', e => this._open(e))
    this.addEventListener('mouseleave', e => this._close(e))

    const body = document.body
    const tooltipBody = document.createElement('tooltip-body')
    this.tooltipBody = tooltipBody
    tooltipBody.innerHTML = this.querySelector('[slot="tooltip"]').outerHTML

    const rect = this.getBoundingClientRect()

    tooltipBody.style.left = `${rect.left}px`
    tooltipBody.style.top = `${rect.bottom + 15}px`

    body.append(tooltipBody)

    /*
    // slot change 往這丟
    let slots = this.shadowRoot.querySelectorAll('slot');
    slots[1].addEventListener('slotchange', function (e) {
      let nodes = slots[1].assignedNodes();
      console.log('Element in Slot "' + slots[1].name + '" changed to "' + nodes[0].outerHTML + '".');
    });

     */
  }

  _open(e) {

    this.tooltipBody.setAttribute('open', 'true')
  }

  _close(e) {

    this.tooltipBody.removeAttribute('open')
  }
}

window.customElements.define('my-tooltip', MyTooltip);
window.customElements.define('tooltip-body', TooltipBody);

import {LitElement, html, css} from './lit-element.js';

class MyElement extends LitElement {

  static get properties() {
    return {
      mood: {type: String}
    }
  }

  static get styles() {
    return css`.green-txt {
      color: green;
    }`;
  }

  render() {
    return html`Web Components are <span class="green-txt">${this.mood}</span>!`;
  }

}

customElements.define('my-element', MyElement);

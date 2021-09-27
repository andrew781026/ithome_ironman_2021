import {LitElement, html, css} from 'https://unpkg.com/lit-element/lit-element.js?module';

class MyCircle extends LitElement {

  static get properties() {
    return {
      color1: {type: String},
      color2: {type: String},
      percent: {type: Number},
    }
  }


  get myStyles() {

    const middleDegrees = parseInt(this.percent) / 100 * 360

    return html`
      <style>
        .pie {
          width: 100px;
          height:100px;
          border-radius:50%;
          background: conic-gradient(${this.color1} 0deg ${middleDegrees}deg, ${this.color2} ${middleDegrees}deg 360deg);
        }
      </style>
    `;
  }

  render() {
    return html`${this.myStyles}<div class="pie"></div>`;
  }

}

customElements.define('my-circle', MyCircle);

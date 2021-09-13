window.addEventListener('DOMContentLoaded', (event) => {

  /*
 'beforebegin': 在 element 之前。
 'afterbegin': 在 element 裡面，第一個子元素之前。
 'beforeend': 在 element 裡面，最後一個子元素之後。
 'afterend': 在 element 之後。
  */

  const head = document.querySelector('head')

  head.insertAdjacentHTML('beforeend', `<link rel="stylesheet" href="./modal.css">`);
  head.insertAdjacentHTML('beforeend', `
        <style>
         .wave-link{
            display: inline-block;
            position:relative;
            background: url(http://i.imgur.com/HlfA2is.gif) bottom repeat-x;
         }
       </style>
    `);

});

function createElementFromHTML(htmlString) {
  var div = document.createElement('div');
  div.innerHTML = htmlString.trim();

  // Change this to div.childNodes to support multiple top-level nodes
  return div.firstChild;
}

class WavyLink extends HTMLAnchorElement {

  connectedCallback() {

    this.classList.add('wave-link')

    this.addEventListener('click', event => {

      event.preventDefault()
      this._open()
    })

  }

  _open() {

    // append popupbox to body

    const href = this.getAttribute('href')

    const htmlStr = `
        <div class="pop-up-container">
          <div class="pop-up-container-root">
            <div class="pop-up-box">
              <div class="pop-up-title flex justifyContent">
                <h3 class="mr-30">您要離開此頁嗎 ?</h3>
                <img class='close' src="./close.svg" />
              </div>
              <div class="pop-up-content">
                你將會前往 <span class="wave-link url">${href}</span>
              </div>
              <div class="pop-up-action flex justifyContent">
               <slot name="modal-action">
                  <button class='close'>取消</button>
                  <button class='confirm'>確定</button>
                </slot>
              </div>
            </div>
          </div>
        </div>
    `

    const popupEl = createElementFromHTML(htmlStr)
    popupEl.querySelector('.pop-up-action .close').addEventListener('click', () => this._close())
    popupEl.querySelector('.pop-up-action .confirm').addEventListener('click', () => this._confirm())
    this._popupEl = popupEl

    document.querySelector('body').appendChild(popupEl);
  }

  _close() {

    const popup = this._popupEl.querySelector('.pop-up-container .pop-up-box');
    popup.style.transform = 'scale(0)';

    setTimeout(() => this._popupEl.remove(), 300)
  }

  _confirm() {

    this._close()
    setTimeout(() => location.href = this.getAttribute('href'), 400)
  }
}

window.customElements.define('wavy-link', WavyLink, {extends: 'a'});

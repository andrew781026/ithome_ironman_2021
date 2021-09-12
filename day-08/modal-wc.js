class Modal extends HTMLElement {

  connectedCallback() {

    const styleStr = `<link rel="stylesheet" href="./modal.css">`

    const htmlStr = `
        <div class="pop-up-container" style="display: none;">
          <div class="pop-up-container-root">
            <div class="pop-up-box">
              <div class="pop-up-title flex justifyContent">
                <slot name="modal-title"><h3>這是 Modal 的 Title</h3></slot>
                <img class='close' src="data:image/svg+xml;base64,PHN2ZyBoZWlnaHQ9IjUxMS45OTJwdCIgdmlld0JveD0iMCAwIDUxMS45OTIgNTExLjk5MiIgd2lkdGg9IjUxMS45OTJwdCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cGF0aCBkPSJtNDE1LjQwMjM0NCA0OTUuNDIxODc1LTE1OS40MDYyNS0xNTkuNDEwMTU2LTE1OS40MDYyNSAxNTkuNDEwMTU2Yy0yMi4wOTc2NTYgMjIuMDkzNzUtNTcuOTIxODc1IDIyLjA5Mzc1LTgwLjAxOTUzMiAwLTIyLjA5Mzc1LTIyLjA5NzY1Ni0yMi4wOTM3NS01Ny45MjE4NzUgMC04MC4wMTk1MzFsMTU5LjQxMDE1Ny0xNTkuNDA2MjUtMTU5LjQxMDE1Ny0xNTkuNDA2MjVjLTIyLjA5Mzc1LTIyLjA5NzY1Ni0yMi4wOTM3NS01Ny45MjE4NzUgMC04MC4wMTk1MzIgMjIuMDk3NjU3LTIyLjA5Mzc1IDU3LjkyMTg3Ni0yMi4wOTM3NSA4MC4wMTk1MzIgMGwxNTkuNDA2MjUgMTU5LjQxMDE1NyAxNTkuNDA2MjUtMTU5LjQxMDE1N2MyMi4wOTc2NTYtMjIuMDkzNzUgNTcuOTIxODc1LTIyLjA5Mzc1IDgwLjAxOTUzMSAwIDIyLjA5Mzc1IDIyLjA5NzY1NyAyMi4wOTM3NSA1Ny45MjE4NzYgMCA4MC4wMTk1MzJsLTE1OS40MTAxNTYgMTU5LjQwNjI1IDE1OS40MTAxNTYgMTU5LjQwNjI1YzIyLjA5Mzc1IDIyLjA5NzY1NiAyMi4wOTM3NSA1Ny45MjE4NzUgMCA4MC4wMTk1MzEtMjIuMDk3NjU2IDIyLjA5Mzc1LTU3LjkyMTg3NSAyMi4wOTM3NS04MC4wMTk1MzEgMHptMCAwIiBmaWxsPSIjZTc2ZTU0Ii8+PC9zdmc+" />
              </div>
              <div class="pop-up-content">
                <slot name="modal-body">這是 Modal 的 Body</slot>
              </div>
              <div class="pop-up-action flex justifyContent">
               <slot name="modal-action">
                  <button class='close'>取消</button>
                  <button class='confirm'>確定送出</button>
                </slot>
              </div>
            </div>
          </div>
        </div>
    `

    this.attachShadow({mode: 'open'}).innerHTML = styleStr + htmlStr

    this.shadowRoot.querySelector('.close:nth-child(1)').addEventListener('click', () => this._close())
    this.shadowRoot.querySelector('.close:nth-child(2)').addEventListener('click', () => this._close())
    this.shadowRoot.querySelector('.confirm').addEventListener('click', () => this._confirm())
  }

  _open() {

    const shadowRoot = this.shadowRoot;
    const modalWrap = shadowRoot.querySelector('.pop-up-container');
    const popup = modalWrap.querySelector('.pop-up-box');

    modalWrap.style.display = 'flex';
    popup.style.transform = 'scale(0)';

    setTimeout(() => popup.style.transform = 'scale(1)', 0)
  }

  _close() {

    const shadowRoot = this.shadowRoot;
    const modalWrap = shadowRoot.querySelector('.pop-up-container');
    const popup = modalWrap.querySelector('.pop-up-box');

    popup.style.transform = 'scale(0)';

    setTimeout(() => modalWrap.style.display = 'none', 300)
  }

  _confirm() {

    this._close()

    if (typeof this.getAttribute('@confirm') === 'function') {

      eval(this.getAttribute('@confirm'))
    }
  }
}

window.customElements.define('my-modal', Modal);

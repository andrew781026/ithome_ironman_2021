class Dropdown extends HTMLElement {

  // 設定下拉選單
}


class FilterSelect extends HTMLElement {

  state = new Proxy(
    // 將預設設定到 target 中 , 預設值
    {
      count: 0,
      limit: 100
    },
    // handler set 資料後 , 執行 render 函式
    {

      get: (target, property) => target[property],
      set: (target, property, value) => {
        target[property] = value;
        this._render()
        return true
      },
    })

  connectedCallback() {

    this._render()
  }

  _render() {

    // get element attrs

    /**
     * 1. parent 的 attr 要 copy 下來 , 除了 id , data-json , data-value
     * 2. 剛剛 copy 的要刪除 class='filter-select' ?
     * 3. setSelectorInputText($selector[0])
     * 4. if ($selector.is('[disabled]')) myTooltip.detach($selector)
     * 5. if ($selector[0].afterInit) $selector[0].afterInit.call($selector[0])  // 呼叫註冊的 afterInit
     * 6. 避免 enter 時 , 觸發 button click => $input.on('keypress', e => (e.keyCode === 13) ? e.returnValue = false : '')
     */

    this.innerHTML = `
        <div class="filter-select">
            <input type='text' autocomplete='off'>
            <i class='close'></i>
            <i class='arrow'></i>
            <i class='corner'></i>
        </div>
    `
  }

  static get observedAttributes() {
    return ['left', 'cost', 'isLogin']
  }

  attributeChangedCallback(name, oldValue, newValue) {

    this.data[name] = newValue
  }

}

window.customElements.define('my-button-01', FilterSelect);

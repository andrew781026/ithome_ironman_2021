/*
$(function () {

  // 將 fri-dropdown 的基礎框 append 到 body 最後面
  $('body').append(`
    <div class='fri-dropdown'>
      <div class='fri-select-dropdown__wrap fri-scrollbar__wrap'>
        <ul class='fri-select-dropdown__list'>
        </ul>
      </div>
    </div>
  `)

  // 追加單個 item 到 dropdownList 中
  const appendItemToListFn = ({$selector, $dropdown}) => ({text, value}) => {

    const filterStr = $selector.find('input').val()
    const selectedValue = $selector.attr('data-value')

    const $li = $(`<li class='fri-select-dropdown__item' data-value='${value}' data-text='${text}'></li>`)

    const $textWrap = $(`<span>${text}</span>`)
    $textWrap.html(text.replace(/\S/g, '<font>$&</font>'))
    $textWrap.children().each(function () {

      const $font = $(this)
      const char = $font.text()
      if (filterStr.indexOf(char) > -1) $font.addClass('text-red font-900')
    })

    $li.append($textWrap)
    $li.click(() => {

      $selector.attr('data-value', $li.attr('data-value'))
      $selector.find('input').val($li.attr('data-text'))
      myTooltip.close()
    })

    if (value === selectedValue) $li.addClass('selected')
    $dropdown.append($li)
  }

  // 將 dropDown 掛到 .filter-select 上面
  const myTooltip = new jBox('Tooltip', {
    pointer: false,
    offset: {x: 0, y: 8},
    attach: '.filter-select',
    content: $('.fri-dropdown'),
    trigger: 'click',
    adjustPosition: true,
    outside: 'y',
    closeOnClick: true,
    closeOnEsc: true,
    position: {
      y: 'bottom',
    },
    addClass: 'select-dropdown',
    onCreated: function () {

      const myTooltip = this

      registerScrollPosition($('#right-side > .header-wrapper + .content'), myTooltip)

      myTooltip.content.on('scroll', function (e) {

        // -----------  一堆要用的參數  --------------
        const $selector = myTooltip.target
        const $scrollWrap = $(this)
        const $input = $selector.find('input')
        const $dropdownList = $scrollWrap.find('.fri-select-dropdown__list')
        const data = JSON.parse($selector.attr('data-json') || '[]')
        const filterStr = $input.val()
        const filteredData = data.filter((obj) => obj.text.indexOf(filterStr) > -1)

        const isLoading = $selector.attr('is-loading')
        const notLoading = !isLoading
        const currentPage = parseInt($selector.attr('current-page')) || 1
        const nextPage = currentPage + 1
        const scrollTop = e.currentTarget.scrollTop
        const listHeight = $dropdownList.height()
        const wrapperHeight = $scrollWrap.height()
        const isScrollBottom = listHeight <= scrollTop + wrapperHeight
        const hasMoreData = $selector.is('[has-more-data]') || filteredData.length > nextPage * 20
        const $dropdown = myTooltip.content.find('.fri-select-dropdown__list')

        // -----------  一堆要用的參數  --------------

        if (notLoading && isScrollBottom && hasMoreData) {

          const $loader = $(`
            <li class='fri-select-dropdown__item info loader-item'>
              <i class='loader'></i>
              <span style='margin-left: 5px'>資料載入中...</span>
            </li>
        `)

          // scroll 到下面時 , 再 append
          $dropdownList.append($loader)
          $selector.attr('is-loading', 'is-loading')
          $selector.attr('current-page', currentPage + 1)
          $input.attr('disabled', 'disabled')

          const onLoadEnd = (filterSelect, appendData) => {

            // 防止 onLoadEnd 時資料灌到其他的 filter-select 上面
            if (myTooltip.target.get(0) === filterSelect) {

              $selector.removeAttr('is-loading')
              $loader.get(0).remove() // 刪除 loader
              $input.removeAttr('disabled')
              $input.get(0).focus()

              if (appendData) {

                const dataJson = JSON.parse($selector.attr('data-json'))
                $selector.attr('data-json', JSON.stringify([...dataJson, ...appendData]))

              } else {

                // 加上第 n 頁的資料
                const startNum = currentPage * 20
                const endNum = nextPage * 20
                const pagedFilteredData = (filteredData.length > endNum) ? filteredData.slice(startNum, endNum) : filteredData.slice(startNum)

                // 只塞 20 筆資料
                pagedFilteredData.forEach(appendItemToListFn({$selector, $dropdown}))
              }
            }
          }

          $selector.get(0).on('loading-end', onLoadEnd)
          $selector.get(0).trigger('loading-start')
        }

      })
    },
    onOpen: function () {

      const $currentSelector = this.target
      const dataMode = $currentSelector.attr('data-mode')

      // 如果是 create-mode 就直接回傳
      if (dataMode === 'create') return myTooltip.detach($currentSelector).close()

      const maxHeight = $currentSelector.attr('scroll-height')
      // this.setHeight(scrollHeight) // 設定 undefined = 清除之前的設定
      this.content.css({maxHeight})

      // 切換到其他欄位時 , 將 DataValue 的值 塞到 input 中
      this.attachedElements.forEach(selector => {

        const $selector = $(selector)
        if ($selector.hasClass('opened') && selector !== $currentSelector.get(0)) $selector.attr('data-mode', 'view')
      })

      $currentSelector.attr('data-mode', 'edit')
    },
    onClose: function () {
      const $selector = this.target
      $selector && ($selector.attr('data-mode') !== 'create') && $selector.attr('data-mode', 'view')
    },
  })

  const getDataText = ($selector, value) => {

    const jsonData = JSON.parse($selector.attr('data-json') || '[]')
    const dataValue = value || $selector.attr('data-value')
    const dataTextObj = jsonData.find(item => dataValue === item.value)
    return dataTextObj ? dataTextObj.text : ''
  }

  // 如果 selector 有預設值時 , 將對應 text 設定給 input
  const setSelectorInputText = (selector) => {
    // 將 data-value 對應的 data-json 上的 text 值設定到 target 上
    const placeholder = $(selector).attr('placeholder') || ''
    const dataText = getDataText($(selector))
    if (dataText) selector.querySelector('input').value = dataText
    else {
      selector.setAttribute('data-value', '')
      selector.querySelector('input').value = ''
      selector.querySelector('input').setAttribute('placeholder', placeholder)
    }
  }

  const renderSingleSelector = (selector) => {

    const notEqual = (a, b) => (a && a.toLowerCase()) !== (b && b.toLowerCase())

    const $selector = $(selector)
    const $input = $(`<input type='text' autocomplete='off'>`) // create input element
    $input.attr('placeholder', $selector.attr('placeholder'))
    $input.on('keypress', e => {

      // 避免 enter 時 , 觸發 button click
      if (e.keyCode === 13) e.preventDefault()
    })

    // clone all attrs , without id , data-json & data-value
    const attributes = $selector.prop('attributes')
    $.each(attributes, function () {
      if (
        notEqual('id', this.name) &&
        notEqual('data-json', this.name) &&
        notEqual('data-value', this.name)
      )
        $input.attr(this.name, this.value)
    })
    $input.removeClass('filter-select') // 不能讓 $input 有 .filter-select 不然 dropdown 的顯示運作會異常

    $selector.append($input)
    $selector.append(`<i class='close'></i>`)
    $selector.append(`<i class='arrow'></i>`)
    $selector.append(`<div class='corner'></div>`)
    setSelectorInputText($selector[0])
    if ($selector.is('[disabled]')) myTooltip.detach($selector)

    // console.log('$selector[0].afterInit=', $selector[0].afterInit)
    // console.log("%c-------------------","color: blue; font-family:serif; font-size: 20px");
    if ($selector[0].afterInit) $selector[0].afterInit.call($selector[0])  // 呼叫註冊的 afterInit
  }

  function dropdownListMutation(mutationList) {
    mutationList.forEach(function (mutation) {

      // console.log('mutation=', mutation)

      if (mutation.type === 'attributes') {

        const dataJsonFn = () => {

          const $selector = $(mutation.target)

          // 將 data-value 對應的 data-json 上的 text 值設定到 target 上
          const dataText = getDataText($selector)
          if (dataText) $selector.find('input').val(dataText)

          // 目前 myTooltip 的 selector 跟目前 focus 的是同一個 , 才做 renderDropdownList
          if (!myTooltip.target) return null
          else if (!document.activeElement) return null
          else if (myTooltip.target.get(0) === document.activeElement || myTooltip.target.get(0) === document.activeElement.parentElement) {

            // render dropdownList 的資料
            const $dropdownList = myTooltip.content.find('.fri-select-dropdown__list')
            renderDropdownList($dropdownList, $selector.get(0))
          }
        }

        const dataModeFn = () => {

          const setValueToPlaceholder = $selector => {

            const dataJson = JSON.parse($selector.attr('data-json') || '[]')
            const dataValue = $selector.attr('data-value')
            const text = dataJson.find(obj => obj.value === dataValue)?.text
            const $input = $selector.find('input')
            $input.val('')
            $input.removeAttr('readonly')
            $input.attr('placeholder', text)
          }

          const setDataValueToInput = $selector => {

            const dataJson = JSON.parse($selector.attr('data-json') || '[]')
            const dataValue = $selector.attr('data-value')
            const text = dataJson.find(obj => obj.value === dataValue)?.text
            $selector.find('input').val(text)
            $selector.find('input').attr('readonly', '')
          }

          // mode : edit . view . nodata 三種模式
          const $selector = $(mutation.target)
          const $input = $selector.find('input')
          const mode = $selector.attr('data-mode')
          const attributeOldValue = mutation.oldValue
          const getDropdownList = () => myTooltip.content[0].querySelector('.fri-select-dropdown__list')

          switch (mode) {

            case 'edit':

              // 清空 input 內容 , 將 data-value 改成 placeholder 值
              setValueToPlaceholder($selector)
              $selector.addClass('opened')

              // render dropdownList 的資料
              renderDropdownList($(getDropdownList()), $selector.get(0))

              break

            // 切換到 view mode 時 , 將 data-value 塞到 input 的 value 中
            case 'view':

              setDataValueToInput($selector)
              $selector.removeClass('opened')
              $selector.removeAttr('is-loading')
              $selector.removeAttr('current-page')
              $input.removeAttr('disabled')
              if (attributeOldValue === 'create') myTooltip.attach($selector, 'click')
              // myTooltip.close()
              break

            // 切換到 create mode 時 , 將
            case 'create':

              $input.attr('placeholder', $selector.attr('create-mode-text') || '請自由鍵入資料')  // 設定新的 placeholder
              $input.val('')
              $selector.attr('preDataValue', $selector.attr('data-value')).removeClass('opened')
              myTooltip.detach($selector)
              myTooltip.close()
              break

            case 'nodata':

              $selector.removeClass('has-data')
              $selector.attr('data-value', '')
              $input.attr('placeholder', $selector.attr('placeholder') || '')  // 將 placeholder 設定回原本的
              $input.val('')
              if (attributeOldValue === 'create') myTooltip.attach($selector, 'click')
              else myTooltip.close()
              break
          }
        }

        const disabledFn = () => {

          const $selector = $(mutation.target)
          const $input = $selector.find('input')
          const isDisabled = Boolean($selector.attr('disabled'))

          if (isDisabled) {

            $input.attr('disabled', isDisabled)
            myTooltip.detach($selector)

          } else {

            $input.removeAttr('disabled')
            myTooltip.attach($selector, 'click')
          }
        }

        const dataValueFn = () => {
          const $selector = $(mutation.target)
          $selector.find('input').trigger('change')
        }

        const handlerMap = {
          'data-json': dataJsonFn,
          'data-mode': dataModeFn,
          'data-value': dataValueFn,
          'disabled': disabledFn,
        }

        const fn = handlerMap[mutation.attributeName]
        if (fn) fn()
      }
    })
  }

  function renderDropdownList(div, selector) {
    const $selector = $(selector)
    const data = JSON.parse($selector.attr('data-json') || '[]')
    const $input = $selector.find('input')
    const filterStr = $input.val()
    const isRemoteLoading = $selector.attr('remote-loading')

    div.html('')

    const filteredData = data.filter((obj) => obj.text.indexOf(filterStr) > -1)

    const appendCreateItem = () => {

      const $li = $(`<li class='fri-select-dropdown__item' data-value='@@新增@@' data-text='新增'><span>新增</span></li>`)
      $li.click(() => $selector.attr('data-mode', 'create'))
      div.append($li)
    }

    // 載入中
    if (isRemoteLoading) {

      const $li = $(`
          <li class='fri-select-dropdown__item info loader-item'>
            <i class='loader'></i>
            <span style='margin-left: 5px'>資料載入中...</span>
          </li>
        `)

      div.append($li)

      // 沒有預設選項 : 資料尚未載入
    } else if (data.length === 0) {

      if ($selector.is('[allow-create]')) appendCreateItem()
      else div.append($(`<li class='fri-select-dropdown__item info'><span>資料尚未載入</span></li>`))

      // 篩選條件沒資料 : 無對應資料
    } else if (filteredData.length === 0) {

      div.append($(`<li class='fri-select-dropdown__item info'><span>無對應資料</span></li>`))

      // 有資料
    } else {

      if ($selector.is('[allow-create]')) appendCreateItem()

      const currentPage = parseInt($selector.attr('current-page')) || 1
      const nextPage = currentPage + 1

      // 加上第 n 頁的資料
      const endNum = nextPage * 20
      const pagedFilteredData = (filteredData.length > endNum) ? filteredData.slice(0, endNum) : filteredData

      pagedFilteredData.forEach(appendItemToListFn({$selector, $dropdown: $(div)}))
    }

    myTooltip.position(selector) // Recalculates your jBoxes position.
  }

  function bindFilterSelectEvents(filterSelect) {

    // Object.getOwnPropertyNames( HTMLElement ) => 取得物件上設定的 function & property
    filterSelect.listFn = () => Object.getOwnPropertyNames(filterSelect)

    filterSelect.selectItem = ({value} = {}) => {

      if (!value) {
        return console.warn('param { value } is required 😫')
      }

      const $selector = $(filterSelect)
      const dataText = getDataText($selector, value)
      if (dataText) {
        $selector.attr('data-value', value)
        $selector.attr('data-mode', 'view')
        myTooltip.close()

      } else return console.warn(`[ value = ${value} ] is not in data-json 😥`)
    }

    if (!filterSelect.loadingMethod) {

      filterSelect.loadingMethod = async query => {

        await wait(1000)
        return null
      }
    }

    if (!filterSelect.remoteMethod) {

      filterSelect.remoteMethod = async query => {

        await wait(1000)
        return null
      }
    }

    // 設定 eventEmitter
    filterSelect.emitters = {}
    filterSelect.on = (eventName, listener) => filterSelect.emitters[eventName] = listener
    filterSelect.trigger = (eventName, ...params) => filterSelect.emitters[eventName].call(filterSelect, filterSelect, params[0])

    // 註冊 filterSelect 的捲動處理
    filterSelect.on('loading-start', () => {

      const query = $(filterSelect).find('input').val()
      filterSelect.loadingMethod(query)
        .then(result => filterSelect.trigger('loading-end', result))
        .catch(err => {
          console.error('[loading] selector = ', filterSelect, 'in filterSelect.loadingMethod happen Error !! \n', err)
        })
    })

    const observer = new MutationObserver(dropdownListMutation)
    observer.observe(filterSelect, {
      attributes: true,
      attributeOldValue: true,
    })

    // 進入時 , 確認有沒有資料
    $(filterSelect).on('mouseenter', function (e) {
      const $selector = $(this)
      if ($selector.find('input').val()) {
        $selector.addClass('has-data')
      }
    })

    // 離開時 , 永遠顯示 i.arrow
    $(filterSelect).on('mouseleave', function (e) {
      $(e.currentTarget).removeClass('has-data')
    })

    // 避免 focus 時 , 再次點擊讓 tooltip 關閉
    $(filterSelect).on('click', 'input', function (e) {

      const isFocus = (this === document.activeElement)
      const isEditMode = (filterSelect.getAttribute('data-mode') === 'edit')
      if (isFocus && isEditMode) {

        e.preventDefault()
        e.stopPropagation()
      }
    })

    $(filterSelect).on('keyup', 'input', function (e) {

      const $selector = $(this).parent()

      if ($selector.attr('data-mode') === 'create') {

        $selector.attr('data-value', $(this).val())

      } else {

        // 觸發 remote-loading
        if ($selector.is('[can-remote]')) {

          $selector.attr('remote-loading', 'remote-loading')

          getDebounceFunc('filter-select-remote-fetch', 500)(() => {

            const query = $(filterSelect).find('input').val()

            filterSelect.remoteMethod(query)
              .then(result => {

                $selector.removeAttr('remote-loading')

                if (result) {

                  const dataJson = (typeof result === 'string') ? result : JSON.stringify(result)
                  $selector.attr('data-json', dataJson)
                }
              })
              .catch(err => {
                $selector.removeAttr('remote-loading')
                console.error('[remote] selector = ', filterSelect, 'in filterSelect.remoteMethod happen Error !! \n', err)
              })

          })
        }

        const dropdownList = myTooltip.content[0].querySelector('.fri-select-dropdown__list')
        renderDropdownList($(dropdownList), $selector.get(0))
      }
    })

    // i.close - 清除資料...
    $(filterSelect).on('click', 'i.close', function (e) {
      e.stopPropagation()  // 停止將 click event 向外傳出
      const $selector = $(this).parent()

      // 如果是 create mode 需要將上一次的資料 , 帶回來
      const isCreateMode = (filterSelect.getAttribute('data-mode') === 'create')
      const preDataValue = $selector.attr('preDataValue')

      if (isCreateMode) $selector.attr('data-value', preDataValue).attr('data-mode', 'view')
      else $selector.attr('data-mode', 'nodata')
    })
  }

  const $filterSelect = $('.filter-select')

  $filterSelect.each(function () {
    const selector = $(this).get(0)
    renderSingleSelector(selector)
    bindFilterSelectEvents(selector)
  })

  window.cloneFilterSelector = (filterSelect, target) => {

    // clone 時會如何處理
    const newSelector = $(filterSelect).clone().appendTo(target)
    bindFilterSelectEvents(newSelector.get(0))
    myTooltip.attach(newSelector, 'click')
  }

  window.initFilterSelector = ($filterSelect) => {

    renderSingleSelector($filterSelect.get(0))
    bindFilterSelectEvents($filterSelect.get(0))
    $filterSelect.find('input').val('')
    myTooltip.attach($filterSelect, 'click')
  }

  // 將傳入的 jquery 物件轉換成 filter-select
  window.convertToFilterSelector = ($filterSelect) => {

    bindFilterSelectEvents($filterSelect.get(0))
    $filterSelect.find('input').val('')
    myTooltip.attach($filterSelect, 'click')
  }
})
*/

import {wait, copyAttrToInput} from './utility.js';
import {DropdownList} from './dropdown-list.js';

class FilterSelect extends HTMLElement {

  container = null;  // the root container
  tooltip = null;
  state = new Proxy(
    // 將預設設定到 target 中 , 預設值
    {
      showClose: false,
      mode: 'view', // data-mode 有 edit . view . create
      value: '',
      json: [],
    },
    // handler set 資料後 , 執行 render 函式
    {

      get: (target, property) => target[property],
      set: (target, property, value) => {

        target[property] = value;
        if (property === 'open') this.tooltipCtrl(value);
        else if (property === 'showClose') this.closeCtrl(value);
        else this._render();
        return true
      },
    })

  static initRootContainer = (selector) => {

    const div = document.createElement('div');
    div.classList.add('filter-select');
    selector.container = div;
    selector.append(div);
  }

  // as Component mounted to page
  constructor() {

    // Always call super first in constructor
    super();

    // 建立一個下拉選單
    this.tooltip = DropdownList.getInstance();

    // 設定根 container
    FilterSelect.initRootContainer(this);
    this._render();
    this.setEvents();
  }

  // 設定相關 event listener
  setEvents() {

    // 註冊 filterSelect 的捲動處理
    this.on('loading-start', () => {

      const query = this.querySelector('input').value;
      this.loadingMethod(query)
        .then(result => this.trigger('loading-end', result))
        .catch(err => {
          console.error('[loading] selector = ', this, 'in filterSelect.loadingMethod happen Error !! \n', err)
        })
    })

    // mouseenter - 有值時 , arrow-icon 變成 close-icon
    this.container.addEventListener('mouseenter', e => {

      // console.log('mouseenter');
      this.state.showClose = Boolean(this.computed.dataText());

    }, false);

    // mouseleave - close-icon 變成 arrow-icon
    this.container.addEventListener('mouseleave', e => {

      //   mouseleave - 遇到子元素會觸發 / mouseout - 遇到子元素不會觸發

      // console.log('mouseleave');
      this.state.showClose = false;

    }, false);

    // selector 點擊的時候 , 控制 DropdownList 的顯示性
    this.container.addEventListener('click', e => {

      /*
        - target is the element that triggered the event (e.g., the user clicked on) 發生地
        - currentTarget is the element that the event listener is attached to. 事件實際處理的地方
       */

      const isCloseIcon = e.target.matches('i.close');
      const isInput = e.target.matches('input');

      // 目前 click 事件作用在 this.container 上面
      if (isInput) {

        const tooltipTarget = this.tooltip.state.filterSelector;

        if (this.state.mode === 'create') this.state.open = false;
        else if (tooltipTarget === this) this.state.open = false;
        else this.state.open = true;
      }

      // 目前 click 事件作用在 i.close 上面
      else if (isCloseIcon) {

        // 點擊 close , 清空 value 值
        this.state.value = '';
      }

    }, true);  // 第三個參數 useCapture = true , 代表子元素的 bubble event 也處理
  }

  // Object.getOwnPropertyNames( HTMLElement ) => 取得物件上設定的 function & property
  listFn = () => Object.getOwnPropertyNames(this)

  // 需要設定 , 選擇某個項目後 , 會執行的事情
  selectItem = ({value} = {}) => {

    if (!value) {
      return console.warn('param { value } is required 😫')
    }

    const $selector = $(filterSelect)
    const dataText = getDataText($selector, value)
    if (dataText) {
      $selector.attr('data-value', value)
      $selector.attr('data-mode', 'view')
      myTooltip.close()

    } else return console.warn(`[ value = ${value} ] is not in data-json 😥`)
  }

  // 設定 eventEmitter
  emitters = {}
  on = (eventName, listener) => this.emitters[eventName] = listener
  trigger = (eventName, ...params) => this.emitters[eventName].call(this, this, params[0])

  loadingMethod = async query => await wait(1000);
  remoteMethod = async query => await wait(1000);


  bindFilterSelectEvents(filterSelect) {

    const observer = new MutationObserver(dropdownListMutation)
    observer.observe(filterSelect, {
      attributes: true,
      attributeOldValue: true,
    })

    // 避免 focus 時 , 再次點擊讓 tooltip 關閉
    $(filterSelect).on('click', 'input', function (e) {

      const isFocus = (this === document.activeElement)
      const isEditMode = (filterSelect.getAttribute('data-mode') === 'edit')
      if (isFocus && isEditMode) {

        e.preventDefault()
        e.stopPropagation()
      }
    })

    $(filterSelect).on('keyup', 'input', function (e) {

      const $selector = $(this).parent()

      if ($selector.attr('data-mode') === 'create') {

        $selector.attr('data-value', $(this).val())

      } else {

        // 觸發 remote-loading
        if ($selector.is('[can-remote]')) {

          $selector.attr('remote-loading', 'remote-loading')

          getDebounceFunc('filter-select-remote-fetch', 500)(() => {

            const query = $(filterSelect).find('input').val()

            filterSelect.remoteMethod(query)
              .then(result => {

                $selector.removeAttr('remote-loading')

                if (result) {

                  const dataJson = (typeof result === 'string') ? result : JSON.stringify(result)
                  $selector.attr('data-json', dataJson)
                }
              })
              .catch(err => {
                $selector.removeAttr('remote-loading')
                console.error('[remote] selector = ', filterSelect, 'in filterSelect.remoteMethod happen Error !! \n', err)
              })

          })
        }

        const dropdownList = myTooltip.content[0].querySelector('.fri-select-dropdown__list')
        renderDropdownList($(dropdownList), $selector.get(0))
      }
    })

    // i.close - 清除資料...
    $(filterSelect).on('click', 'i.close', function (e) {
      e.stopPropagation()  // 停止將 click event 向外傳出
      const $selector = $(this).parent()

      // 如果是 create mode 需要將上一次的資料 , 帶回來
      const isCreateMode = (filterSelect.getAttribute('data-mode') === 'create')
      const preDataValue = $selector.attr('preDataValue')

      if (isCreateMode) $selector.attr('data-value', preDataValue).attr('data-mode', 'view')
      else $selector.attr('data-mode', 'nodata')
    })
  }

  getDataText = (selector, value) => {

    const jsonData = JSON.parse(selector.getAttribute('data-json') || '[]');
    const dataValue = value || selector.getAttribute('data-value');
    const dataTextObj = jsonData.find(item => dataValue === item.value);
    return dataTextObj ? dataTextObj.text : '';
  }

  tooltipCtrl(open) {

    const arrowIcon = this.container.querySelector('i.arrow');

    if (open) {
      this.tooltip.open(this);
      arrowIcon.classList.add('rotate');
    } else {
      this.tooltip.close();
      arrowIcon.classList.remove('rotate');
    }
  }

  closeCtrl = (showClose) => {

    const arrowIcon = this.container.querySelector('i.arrow')
    const closeIcon = this.container.querySelector('i.close')

    if (showClose) {
      arrowIcon.style.display = 'none';
      closeIcon.style.display = 'inline';
    } else {
      arrowIcon.style.display = 'inline';
      closeIcon.style.display = 'none';
    }
  }

  computed = {

    placeholder: () => (this.state.mode === 'edit') ? this.state.placeholder : this.getAttribute('placeholder'),
    dataText: () => this.getDataText(this),
  }


  // 需要計算出 placeholder

  // 需要計算出 dataText

  // 每次 this.state.mode 改變時 , 都需要重新 render 一次
  _render() {

    // get element attrs

    /** TODO 以下為待辦事項 -
     * ✔ ✖ 口
     * ✔ 1. parent 的 attr 要 copy 下來 , 除了 id , data-json , data-value
     * 口 3. setSelectorInputText($selector[0])
     * 口 4. if ($selector.is('[disabled]')) myTooltip.detach($selector) - disabled 後就不會有反應
     * 口 5. if ($selector[0].afterInit) $selector[0].afterInit.call($selector[0])  // 呼叫註冊的 afterInit
     * 口 6. 避免 enter 時 , 觸發 button click => $input.on('keypress', e => (e.keyCode === 13) ? e.returnValue = false : '')
     */

    // 不同的情況顯示不同的 UI 呈現

    // A. create mode
    if (this.state.mode === 'create') {

      this.container.innerHTML = `
        <input type='text' autocomplete='off'>
        <i class='close'></i>
        <i class='corner'></i>
      `

      return copyAttrToInput(this, this.container.querySelector('input'))
    }

    // B. view mode
    else if (this.state.mode === 'view') {

      this.container.innerHTML = `
        <input type='text' autocomplete='off'>
        <i class='close' style="display: none"></i>
        <i class='arrow'></i>
      `

      return copyAttrToInput(this, this.container.querySelector('input'))
    }


    this.container.innerHTML = `
      <input type='text' autocomplete='off'>
      <i class='close'></i>
      <i class='arrow'></i>
    `

  }

}

window.customElements.define('filter-select', FilterSelect);
window.customElements.define('dropdown-list', DropdownList);

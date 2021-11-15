
// 參考來源 =Summer。桑莫。夏天= : https://cythilya.github.io/2017/03/12/uuid/
export function _uuid() {
  var d = Date.now();
  if (typeof performance !== 'undefined' && typeof performance.now === 'function') {
    d += performance.now(); //use high-precision timer if available
  }
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    var r = (d + Math.random() * 16) % 16 | 0;
    d = Math.floor(d / 16);
    return (c === 'x' ? r : (r & 0x3 | 0x8)).toString(16);
  });
}

export function getAttributes(el) {

  const attrs = el.attributes;
  return Object.values(attrs).reduce((prev, curr) => {

    prev[curr.name] = curr.value
    return prev;
  }, {});
}

export function setAttributes(el, attrs) {
  for (var key in attrs) {
    el.setAttribute(key, attrs[key]);
  }
}

// wait ms milliseconds
export const wait = ms => new Promise(r => setTimeout(r, ms));

// 需要控制 top . left 的位置
export const getPosition = (e, tooltip) => {

  const viewHeight = window.innerWidth || 0
  const viewWidth = window.innerHeight || 0
  const currentX = e.clientX || 0
  const currentY = e.clientY || 0

  return {
    left: (viewWidth > currentX + 500) ? currentX : currentX - tooltip.offsetWidth,
    top: (viewHeight > currentY + 500) ? currentY : currentY - tooltip.offsetHeight,
  }
}

export const copyAttrToInput = (selector, inputEl) => {

  // 取得 <filter-select /> 上面的 attr
  const attrs = getAttributes(selector);
  const {id, dataJson, dataValue, ...otherAttrs} = attrs;

  // 將 attr copy 到 input 上面
  setAttributes(inputEl, {...otherAttrs, value: selector.computed.dataText()});

  return selector;
}

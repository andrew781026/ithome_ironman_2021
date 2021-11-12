
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

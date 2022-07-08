/**
 * For our parser we're going to take our array of tokens and turn it into an
 * AST.
 *
 *   [{ type: 'tagStart', tagName: 'div' }, ...]   =>   { type: 'tag', tag:'div', children: [...] }
 * @param tagList {array} - [{ type: 'tagStart', tagName: 'div' }, ...]
 * @returns {object} { type: 'tag', tag:'div', children: [...] }
 */
const parser = tagList => {

  const result = {type: 'Root', children: []};

  // stack 控制目前的 element 的狀況
  const stack = [result];

  for (let i = 0; i < tagList.length; i++) {

    // 目前的 element 元素
    let current = tagList[i];

    if (current.type === 'tagStart') {

      const last = stack[stack.length - 1];
      const child = { type : 'tag' , tag : current.tagName };
      (last.children) ? last.children.push(child) : last.children = [child];
      stack.push(child);
    }

    // 直接跳出一個
    else if (current.type === 'tagEnd') {

      stack.pop();
    }

    // text 元素 , 必定是最底層 , 存後立即跳出
    else if (current.type === 'text') {

      const last = stack[stack.length - 1];
      const child = { type : 'text' , content : current.content };
      (last.children) ? last.children.push(child) : last.children = [child];
      stack.pop();
    }
  }

  return result;
}

const tagList01 = [
  { type: 'tagStart', tagName: 'div' },
  { type: 'text', content: 'Hello World' },
  { type: 'tagEnd', tagName: 'div' }
]

console.log(parser(tagList01));

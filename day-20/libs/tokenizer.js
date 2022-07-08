/**
 * transform a string into an array of tokens
 * @param htmlString {string} - html string. <div>Hello World</div>
 * @returns {array} tagList = [
 *   { type:'tagStart' , tagName:'div' },
 *   { type:'text' , content:'Hello World' },
 *   { type:'tagEnd' , tagName:'div' }
 * ]
 */
const tokenizer = (htmlString) => {

  const tagList = [];
  // 由 htmlString 拆分出 tag 和 text 元素 , 用一個字元一個字元來比對

  // the char pointer
  let current = 0;

  // last > char position
  let lastEndCharPosition = 0;

  const totalLength = htmlString.length;

  while (current < totalLength) {

    const char = htmlString[current];
    const nextChar = htmlString[current + 1];

    // 找到 tag 的開頭 <
    if (char === '<') {

      const last = tagList[tagList.length - 1];
      if (last?.position) throw new Error('[<<<<<] double < error !!');

      // text 元素如何取得？在 tagStart 時找一下中間是否有 text 元素（需要之前 > 的位置）
      // 需要確認中間是否有 text 元素
      if (lastEndCharPosition > 0) {

        const content = htmlString.substring(lastEndCharPosition + 1, current).trim();

        if (content.length > 0)
          tagList.push({type: 'text', content});
      }

      // tagStart
      if (nextChar !== '/') {

        // tag start
        tagList.push({
          type: 'tagStart',
          position: current + 1,
        });

        current += 1;
        continue;
      }

      // tagEnd
      else if (nextChar === '/') {

        // tag end
        tagList.push({
          type: 'tagEnd',
          position: current + 2,
        });

        current += 2;
        continue;
      }

    } else if (char === '>') {

      const last = tagList.pop();
      if (!last.position) throw new Error('[>>>>>] double > error !!');

      const inner = htmlString.substring(last.position, current);
      const tagName = inner.split(' ')[0];
      tagList.push({
        type: last.type,
        tagName,
      });

      // set lastEndCharPosition
      lastEndCharPosition = current;
      current += 1;
      continue;
    }

    // other char
    else current += 1;
  }

  return tagList;
}


const test01 = `<div id="ss">Hello World</div>`;
console.log(tokenizer(test01))

const test02 = `<div id="ss">Hello World</div>>`;

try {
  console.log(tokenizer(test02))
} catch (e) {
  console.error(e.message)
}

const test03 = `<<div id="ss">Hello World</div>`;

try {
  console.log(tokenizer(test03))
} catch (e) {
  console.error(e.message)
}

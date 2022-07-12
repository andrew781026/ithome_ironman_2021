// h 函式適用於建立 vnode 的函式
function h(tag, children) {
  return { tag, children }
}

const toString = ({ tag, children }) => {
  if (typeof children === "string") return `h("${tag}", [${children.tag}])`
  else if (Array.isArray(children)) return `h("${tag}", [${children.map(toString).join(', ')}])`
  else return 'h(' + tag + ', ' + toString(children) + ')'
}

h.prototype.toString = function () {
  return toString(this)
}

/**
 * transform the ast to vnode
 *
 *   { type: 'tag', tag:'div', children: [...] }   => h("ul", [...])
 * @param ast {object} - { type: 'tag', tag:'div', children: [...] }
 * @returns {object} vnode = h("ul", [...])
 */
const transformer = ast => {

  const getChildren = children => {

    if (!children) return undefined;
    else if (children.length === 0) return undefined;
    else if (children.length === 1) return transformer(children[0]);
    else return children.map(transformer);
  }

  if (ast.type === 'Root')
    return h('Root', getChildren(ast.children))

  else if (ast.type === 'tag')
    return h(ast.tag, getChildren(ast.children))

  else if (ast.type === 'text')
    return ast.content

  else throw new Error('[@@@@@@] unknown ast type !!')
}


const ast01 = {
  "type": "Root",
  "children": [
    {
      "type": "tag",
      "tag": "div",
      "children": [
        {
          "type": "text",
          "content": "Hello World"
        }
      ]
    }
  ]
}

const vnode01 = transformer(ast01)
console.log(vnode01.toString());
/*
  h("Root", [ h("div", "Hello World") ]);
 */

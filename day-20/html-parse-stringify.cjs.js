/**
 * 下方檔案為 html-parse-stringify 展開出來的結果
 */
// 不能有 end tag 的 html tag , void-elements : https://github.com/pugjs/void-elements/blob/master/index.js
const voidElements = {
  "area": true,
  "base": true,
  "br": true,
  "col": true,
  "embed": true,
  "hr": true,
  "img": true,
  "input": true,
  "link": true,
  "meta": true,
  "param": true,
  "source": true,
  "track": true,
  "wbr": true
};

/**
 * 將一個 html tag 轉換成一個物件
 * @param tag
 * @return {{children: *[], name: string, type: string, voidElement: boolean, attrs: {}}|{comment: (*|string), type: string}}
 */
var parseTag = function (tag) {
  const res = {
    type: 'tag',
    name: '',
    voidElement: false,
    attrs: {},
    children: [],
  }

  const tagMatch = tag.match(/<\/?([^\s]+?)[/\s>]/)
  if (tagMatch) {
    res.name = tagMatch[1]
    if (
      voidElements[tagMatch[1]] ||
      tag.charAt(tag.length - 2) === '/'
    ) {
      res.voidElement = true
    }

    // handle comment tag
    if (res.name.startsWith('!--')) {
      const endIndex = tag.indexOf('-->')
      return {
        type: 'comment',
        comment: endIndex !== -1 ? tag.slice(4, endIndex) : '',
      }
    }
  }

  const attrRE = /\s([^'"/\s><]+?)[\s/>]|([^\s=]+)=\s?(".*?"|'.*?')/g
  const reg = new RegExp(attrRE)
  let result = null
  for (; ;) {
    result = reg.exec(tag)

    if (result === null) {
      break
    }

    if (!result[0].trim()) {
      continue
    }

    if (result[1]) {
      const attr = result[1].trim()
      let arr = [attr, '']

      if (attr.indexOf('=') > -1) {
        arr = attr.split('=')
      }

      res.attrs[arr[0]] = arr[1]
      reg.lastIndex--
    } else if (result[2]) {
      res.attrs[result[2]] = result[3].trim().substring(1, result[3].length - 1)
    }
  }

  return res
}

// re-used obj for quick lookups of components
var empty = Object.create ? Object.create(null) : {}

function parse(html, options) {
  options || (options = {})
  options.components || (options.components = empty)
  var result = []
  var current
  var level = -1
  var arr = []
  var byTag = {}
  var inComponent = false

  if (html.indexOf('<') !== 0) {
    var end = html.indexOf('<')
    result.push({
      type: 'text',
      content: end === -1 ? html : html.substring(0, end),
    })
  }

  /*jshint -W030 */
  var tagRE = /<[a-zA-Z\-\!\/](?:"[^"]*"['"]*|'[^']*'['"]*|[^'">])*>/g

  html.replace(tagRE, function (tag, index) {
    if (inComponent) {
      if (tag !== '</' + current.name + '>') {
        return
      } else {
        inComponent = false
      }
    }
    var isOpen = tag.charAt(1) !== '/'
    var start = index + tag.length
    var nextChar = html.charAt(start)
    var parent

    if (isOpen) {
      level++

      current = parseTag(tag)
      if (current.type === 'tag' && options.components[current.name]) {
        current.type = 'component'
        inComponent = true
      }

      if (
        !current.voidElement &&
        !inComponent &&
        nextChar &&
        nextChar !== '<'
      ) {
        current.children.push({
          type: 'text',
          content: html.slice(start, html.indexOf('<', start)),
        })
      }

      byTag[current.tagName] = current

      // if we're at root, push new base node
      if (level === 0) {
        result.push(current)
      }

      parent = arr[level - 1]

      if (parent) {
        parent.children.push(current)
      }

      arr[level] = current
    }

    if (!isOpen || current.voidElement) {
      if (
        level > -1 &&
        (current.voidElement || current.name === tag.slice(2, tag.indexOf(' ')))
      ) {
        level--
      }

      if (!inComponent && nextChar !== '<' && nextChar) {
        // trailing text node
        // if we're at the root, push a base text node. otherwise add as
        // a child to the current node.
        parent = level === -1 ? result : arr[level].children

        // calculate correct end of the content slice in case there's
        // no tag after the text node.
        var end = html.indexOf('<', start)
        var content = html.slice(start, end === -1 ? undefined : end)
        // if a node is nothing but whitespace, no need to add it.
        if (!/^\s*$/.test(content)) {
          parent.push({
            type: 'text',
            content: content,
          })
        }
      }

      current = arr[level]
    }
  })

  return result
}

module.exports = parse

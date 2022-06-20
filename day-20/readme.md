# [Day20] - Vue 的 Html 字串處理 ( compiler 介紹 )

day-13 介紹 , 當資料改變時 , 我們可以利用 _render 來更新 dom

每次更新 isLogin 的資料時 , 就會用 innerHTML 更新 dom

目前 isLogin 資料只有跟 `<購買 BTN>` 是有相關的 , 但是我們資料變更時 , 都用 innerHTML 更新全部的 dom

因此我們在 devtool 中觀察時會發現與 isLogin 資料沒相關的 h2 也被重新 render 了！

![](https://raw.githubusercontent.com/andrew781026/ithome_ironman_2021/master/day-20/imgs/innerHTML-update.jpg) 

也就是說 , isLogin 資料改變時 , 會發生下圖的內容

![](https://raw.githubusercontent.com/andrew781026/ithome_ironman_2021/master/day-20/imgs/data-login-change-process-innerHTML.jpg)

如果 html 的結構再大一些 , 每次都需要重新 render 全部的 dom , 這種方式肯定會讓變更又慢又久

有沒有什麼方式 , 可以讓我們只重新 render 資料變動的部分呢 ?

這時就可以引入 Virtual DOM 的概念 , 追蹤變化的部分 , 只重新 render 變化的部分

![](https://raw.githubusercontent.com/andrew781026/ithome_ironman_2021/master/day-20/imgs/virtual-dom.png)

也就是說 , 在 htmlString -> innerHTML 中間有一個東東 , 讓我們可以比對 BEFORE 跟 AFTER 的資料差異 , 再根據差異的做變更

這個東東就是 模板_AST ( DOM Tree )

```js
const oldAst = {
  type: "tag",
  tag: "ul",
  attrs: {
    id: "list"
  },
  children: [
    {
      type: "tag",
      tag: "li",
      children: [
        {
          type: "text",
          text: "Item_1"
        }
      ]
    },
    {
      type: "tag",
      tag: "li",
      children: [
        {
          type: "text",
          text: "Item_2"
        }
      ]
    }
  ]
}
```

不過要如何將 htmlString 轉成 AST 呢 ?
這時我們就需要一個 `compiler` 出場了 ٩(๑•̀ω•́๑)۶

```javascript
/**
 * FINALLY! We'll create our `compiler` function. Here we will link together
 * every part of the pipeline.
 *
 *   1. input  => tokenizer   => tokens
 *   2. tokens => parser      => ast
 *   3. ast    => transformer => newAst
 *   4. newAst => generator   => output
 */

function compiler(input) {
  let tokens = tokenizer(input);
  let ast    = parser(tokens);
  let newAst = transformer(ast);
  let output = codeGenerator(newAst);

  // and simply return the output!
  return output;
}
```

根據 [the-super-tiny-compiler](https://github.com/jamiebuilds/the-super-tiny-compiler/blob/d8d40130459d1537f6117a927947cd46c83182b0/the-super-tiny-compiler.js#L555) 的程式碼 , 我們可能需要有以下的幾個步驟來組成 `compiler`
```
1. htmlString  => tokenizer   => tokens
2. tokens      => parser      => 模板_AST
3. 模板_AST     => transformer => JS_AST
4. JS_AST      => generator   => output
```

下面我們來一步一步組出 `compiler` 吧！(๑¯∀¯๑)

## 參考資料

- [書籍 - Vue.js 設計與實踐](https://www.tenlong.com.tw/products/9787115583864)
- [the-super-tiny-compiler](https://github.com/jamiebuilds/the-super-tiny-compiler/blob/master/the-super-tiny-compiler.js)
- [前端大概要的知道 AST](https://www.gushiciku.cn/pl/aEfc/zh-tw)
- [AST explorer](https://astexplorer.net/)

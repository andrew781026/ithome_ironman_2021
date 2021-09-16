# [Day12] - refactor 元件 to render 

// day 13 改造一下 eval => 讓其可以 $event 當作 event 參數

| 參數 | 說明 |
|---|---|
| this | 可以取得 this.props 的資料 , this.state , this.$event  |
| $event  | 可以省略 this 來直接取得資料 ( 會先取得對應的 params ) |

this => 傳入 component 本身 , 讓其可以取得內部函式 or 其他東西

- 利用 Function.call => 去設定 this 物件 

- 將 String 中有定義到的參數 , 從 this 中讀出 & 寫入到 function 的 params 中

> 需要先將 String 做一下解析
>
> ex : @click = " ss  "

如果有箭頭 , 可能需要當成 new Function , return 做處理

```javascript
// 下方為用字串 new Function 的範例
var x = 10;

function createFunction1() {
    var x = 20;
    return new Function('return x;'); // this |x| refers global |x|
}

function createFunction2() {
    var x = 20;
    function f() {
        return x; // this |x| refers local |x| above
    }
    return f;
}

var f1 = createFunction1();
console.log(f1());          // 10
var f2 = createFunction2();
console.log(f2());          // 20
```

![](https://i.imgur.com/xQUFVQC.png)



=== 佔位

## 參考資料 :

- [Udemy 課程 - Web Components & Stencil.js - Build Custom HTML Elements](https://www.udemy.com/course/web-components-stenciljs-build-custom-html-elements/)
- [Virtual DOM | 為了瞭解原理，那就來實作一個簡易 Virtual DOM 吧！](https://medium.com/%E6%89%8B%E5%AF%AB%E7%AD%86%E8%A8%98/build-a-simple-virtual-dom-5cf12ccf379f)

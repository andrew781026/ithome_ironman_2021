# [Day20] - Vue 的 Html 字串處理 ( Html String to Ast Object )

day-13 介紹 , 當資料改變時 , 我們可以利用 _render 來更新 dom

可是如果每次資料改變時 , 都需要 rootDiv.innerHTML 來重新設定整個 dom , 

當 Vue component 很多層時 , 資料一有變化 , 就需要等很久 ,

因此我們需要有 Virtual Dom ( Ast Object ) 用於比對變化 ,

再針對變化的部分 , 去更新對應的 element 即可 , 這樣在 render 時 , 也許可以加快速度

那在開始之前 , 我們先更深入了解一下 Html Element 吧 !

## Html Element 的類型

> Html Element 目前有 6 種類型 

- void elements : 沒有 end tag 的元素 ( ex : `<input>` . `<br>` ... ) 
- template element : `<template>` 用於放一些 HTML template , 不顯示在畫面中
- raw text elements : 在 HTML 檔案中 , 處理 JS . CSS 部分的元素 ( `<script>` . `<style>` )
- escapable raw text elements : textarea, title
- foreign elements : `MathML namespace` and `the SVG namespace`
- normal elements : 上述以外的 element 

## 建立轉換函式 parse

所有的 HTML 結構的開頭都是 `<xxx>` 而且結尾都是 `</xxx>` 

我們可以利用這個來解析 HTML string 

```javascript
var tagRE = /<[a-zA-Z\-\!\/](?:"[^"]*"['"]*|'[^']*'['"]*|[^'">])*>/g
```

抓出 tag name 後 , 就可以

## 參考資料

- [vue學習—Convert HTML string to AST，如何將html字串轉換為ast陣列結構](https://itw01.com/YCZ3HEN.html)
- [Vue learning – Convert HTML string to AST, how to convert HTML string to ast array structure](https://developpaper.com/vue-learning-convert-html-string-to-ast-how-to-convert-html-string-to-ast-array-structure/)
- [vue学习—Convert HTML string to AST，如何将html字符串转换为ast数组结构](https://segmentfault.com/a/1190000018277868)
- [html-parse-stringify](https://github.com/HenrikJoreteg/html-parse-stringify)
- [聊一聊 Javascript 中的 AST](https://juejin.cn/post/6844903960650711054)

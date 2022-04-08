# [Day26] - 自製 AST 分析器 - 深入解析 html-parse-stringify (一)

```javascript
/*jshint -W030 */
var tagRE = /<[a-zA-Z\-\!\/](?:"[^"]*"['"]*|'[^']*'['"]*|[^'">])*>/g
```

當我們有一個 html 字串時 , 我們可以利用 tagRE 將其中的 tag 都抓出來

```javascript
/*jshint -W030 */
var tagRE = /<[a-zA-Z\-\!\/](?:"[^"]*"['"]*|'[^']*'['"]*|[^'">])*>/g
```

得到的 match 結果如下 : 

```
root
  ├─ <input>
  ├─ <div>
  ├─ <p>
  ├─ [text-node] 小 7 店鋪 
  ├─ </p>
  ├─ [text-node] 歡迎光臨
  └─ </div>
```

可能有人會覺得奇怪 , 因為要分析結構時 , 

直覺是

1. 找出 startTag 跟其對應的 closeTag 
2. 取得對應的 startIndex . endIndex
3. 再找其內部的 children 元素

-----

可是第一步的 closeTag 尋找有諸多的麻煩 , 因此我們利用一個事實

```
如果下一個 tag 不是 void element 或是 closeTag
那下一個 tag 必定是前一個 tag 的子層
```


目標的 AST 結構

```
root
  ├─ <input>
  ├─ <div>
  │    ├─ <p>
  │    │   └─ [text-node] 小 7 店鋪 
  │    └─ [text-node] 歡迎光臨
```

今天原本想要介紹一下 Virtual DOM 結果忙一下 , 就沒時間研究 diff 演算法了 ![/images/emoticon/emoticon20.gif](/images/emoticon/emoticon20.gif)

diffAttrs(oldAttrs, newAttrs)
diffAttrs 比較簡單，主要就是在標籤上設定屬定跟刪除屬性。看到程式碼的第二行先宣告了一個空陣列 patches ，將會用於儲存屬性變動的 patch 函式。比較完所有的屬性後，會在 diff() 函式呼叫 patchAttrs($node)，將節點傳進來批次更新標籤上的屬性。

## 參考資料 :

- [Virtual DOM | 為了瞭解原理，那就來實作一個簡易 Virtual DOM 吧！](https://medium.com/%E6%89%8B%E5%AF%AB%E7%AD%86%E8%A8%98/build-a-simple-virtual-dom-5cf12ccf379f)
- [Building a Simple Virtual DOM from Scratch](https://dev.to/ycmjason/building-a-simple-virtual-dom-from-scratch-3d05)
- [Building a Simple Virtual DOM from Scratch - Jason Yu](https://www.youtube.com/watch?v=85gJMUEcnkc)
- [深度剖析：如何实现一个 Virtual DOM 算法](https://github.com/livoras/blog/issues/13)

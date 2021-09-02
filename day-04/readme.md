
```javascript
function replaceElementFromHTML(el,htmlString) {

  return el.outerhtml = htmlString.trim();
}
```


```javascript
function createElementFromHTML(htmlString) {
  var div = document.createElement('div');
  div.innerHTML = htmlString.trim();

  // Change this to div.childNodes to support multiple top-level nodes
  return div.firstChild;
}
```


## 參考資料 

- [create html from string](https://stackoverflow.com/questions/494143/creating-a-new-dom-element-from-an-html-string-using-built-in-dom-methods-or-pro)

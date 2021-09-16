# [Day11] - 利用 Proxy 來監聽資料的變化

在 `connectedCallback` 初始建立時 , 我們需要處理 html 如何呈現
在 `attributeChangedCallback` 屬性變更時 , 根據不同的屬性來做對應的處理

我們何不效仿 React 做出一個根據 data 的 render 函式 ,

建立 render 函式前 , 我們可能需要有一個元件的資料中心 ( React 是 this.state / Vue 是 )

然後資料變更時 , 會通知元件需要觸發 render 函式

剛好瀏覽器中有個 Proxy 物件 , 可以達到 observe 資料 & 觸發 render 的功能

下面我們先來認識一下 Proxy 物件吧 !

### 建構子

![](https://i.imgur.com/iXKtL0p.png)

- target : 需要 observe 的資料對象 ( 可以是 array . object 或 function )
- handler : 包括 getter 跟 setter 方法 , 當 target 的資料改變時 , 會對應觸發 handler 中的 getter . setter

### 範例

> 下面我們來舉例說明一下

```javascript
var handler = {

    // 取出資料時 , undefined 回傳 "資料未定義~~"
    get: function(obj, prop) {
        return obj[prop] || '資料未定義~~';
    },

    // 更新的數值都 * 2
    set: function(obj, prop, newValue) {
       if (newValue) obj[prop] = 2 * newValue;
    }
};

var p = new Proxy({}, handler);
p.a = 1;
p.b = undefined;

console.log(p.a, p.b); // 2, '資料未定義~~'
console.log('c' in p, p.c); // false, '資料未定義~~'
```

## 參考資料 :

- [Virtual DOM | 使用 ES6 Proxy 監聽資料的變化](https://medium.com/%E6%89%8B%E5%AF%AB%E7%AD%86%E8%A8%98/using-proxy-to-monitor-object-e57af6326d73)
- [MDN 文件 - Proxy](https://developer.mozilla.org/zh-TW/docs/Web/JavaScript/Reference/Global_Objects/Proxy)

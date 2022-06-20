# [Day11] - 利用 Proxy 來監聽資料的變化

在 `connectedCallback` 初始建立時 , 我們需要處理 html 如何呈現 在 `attributeChangedCallback` 屬性變更時 , 根據不同的屬性來做對應的處理

我們何不效仿 React 做出一個根據 data 的 render 函式 ,

建立 render 函式前 , 我們可能需要有一個元件的資料中心 ( React 是 this.state / Vue 是 vm )

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
const handler = {

  // 取出資料時 , undefined 回傳 "資料未定義~~"
  get: function (obj, prop) {
    return obj[prop] || '資料未定義~~';
  },

  // 更新的數值都 * 2
  set: function (obj, prop, newValue) {
    if (newValue) obj[prop] = 2 * newValue;
  }
};

const target = {};
const p = new Proxy(target, handler);
p.a = 1;
p.b = undefined;

console.log(p.a); // 2
console.log(target); // { a : 2 }
console.log(p.b); // '資料未定義~~'
console.log('c' in p, p.c); // false, '資料未定義~~'
```

### 圖解

下面我們用圖片來解說 , 上面的範例都發生了那些事情 ~

> p.a = 1

設定 p.a 的時候 , 我們會將數值丟給 handler.set 函式做處理

並且 set 函式接收到的參數如下 :

- obj = {} ( target 物件 )
- prop = a ( 目前要設定的屬性 )
- newValue = 1 ( 目前要設定的數值 )

因為 newValue 存在 , 因此 handler.set 會將  target 物件改成 `{ a : 2 }`

![img.png](https://raw.githubusercontent.com/andrew781026/ithome_ironman_2021/master/day-11/img.png)

> p.b = undefined

![img_1.png](https://raw.githubusercontent.com/andrew781026/ithome_ironman_2021/master/day-11/img_1.png)

> console.log(p.a)

取出 p.a 的時候 , Proxy 會透過 handler.get 函式做處理

並且 get 函式接收到的參數如下 :

- obj = { a : 2 } ( target 物件 )
- prop = a ( 目前要取出的屬性 )

因為 obj[a] 存在 , 因此 handler.get 回傳數值 2

![img_2.png](https://raw.githubusercontent.com/andrew781026/ithome_ironman_2021/master/day-11/img_2.png)

> console.log(p.b)

同理 , 取出 p.b 的時候 , Proxy 會透過 handler.get 函式做處理

並且 get 函式接收到的參數如下 :

- obj = { a : 2 } ( target 物件 )
- prop = b ( 目前要取出的屬性 )

因為 obj[b] 不存在 , 因此 handler.get 回傳字串 '資料未定義~~'

![img_4.png](https://raw.githubusercontent.com/andrew781026/ithome_ironman_2021/master/day-11/img_4.png)

## 參考資料 :

- [Virtual DOM | 使用 ES6 Proxy 監聽資料的變化](https://medium.com/%E6%89%8B%E5%AF%AB%E7%AD%86%E8%A8%98/using-proxy-to-monitor-object-e57af6326d73)
- [MDN 文件 - Proxy](https://developer.mozilla.org/zh-TW/docs/Web/JavaScript/Reference/Global_Objects/Proxy)
- [JavaScript Proxy](https://www.javascripttutorial.net/es6/javascript-proxy/)

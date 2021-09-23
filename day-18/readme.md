# [Day18] - 在 React 中引入現成的 Web Component

當我們拿到一個現有的 Web Component 時 , 如何在 React 專案中引用呢 ?

----

![one](https://raw.githubusercontent.com/andrew781026/ithome_ironman_2021/master/day-06/number-icon/one.png) 利用 [create]-react-app](https://github.com/facebook/create-react-app) 建立一個新專案 

```shell script
$ npx create-react-app my-app
```

![建立專案中...](https://camo.githubusercontent.com/b275c108e1c9e2d1c732a66ca1e0b6ecb1ae260824fb5d6ca4c4e46ee85d1ca0/68747470733a2f2f63646e2e6a7364656c6976722e6e65742f67682f66616365626f6f6b2f6372656174652d72656163742d61707040323762343261633765666130313866323534313135336162333064363331383066356661333965302f73637265656e636173742e737667)

![two](https://raw.githubusercontent.com/andrew781026/ithome_ironman_2021/master/day-06/number-icon/two.png) 在 `src/index.jsx` 中引入要使用的 Web Component ( `word-count.js` )

```diff
// src/index.jsx
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

+ // 只需要做全域 import , 之後你就可以使用定義的 custom element  
+ import './word-count.js';

ReactDOM.render(
  <React.StrictMode>
    <App/>
  </React.StrictMode>,
  document.getElementById('root')
);
```

![three](https://raw.githubusercontent.com/andrew781026/ithome_ironman_2021/master/day-06/number-icon/three.png) 在專案中使用 custom element `<word-count>`

```jsx
// src/App.jsx
import './App.css';

function App() {
  return (
    <div className="container">
      <word-count limit="100">
        <h3>個人自介</h3>
        <textarea className="needcount" rows="10" placeholder="請輸入您的個人描述...">
    </textarea>
      </word-count>
    </div>
  );
}

export default App;
```

![four](https://raw.githubusercontent.com/andrew781026/ithome_ironman_2021/master/day-06/number-icon/four.png) 利用 `npm run start` 查看引入成果

```shell script
$ npm run build
```

## 成果

![word-count](https://i.imgur.com/SHKqvKV.gif)


## 參考資料 

- [youtube - Live Character Counter using CSS & Javascript | Mini Project](https://www.youtube.com/watch?v=uMxvRVfqyc8)
- [React 官方文件 - Web Components](https://zh-hant.reactjs.org/docs/web-components.html)

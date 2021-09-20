# [Day16] - 利用 [direflow.io](https://github.com/Silind-Software/direflow) 來建立 Web Components 的 JS 檔

昨天解說 Vue 如何製作 Web-Component 今天來說明一下 , 

那 React 如何製作 Web-Component 呢 ? 可以利用 [direflow.io](https://github.com/Silind-Software/direflow)

![](https://camo.githubusercontent.com/5c2cbc9bda1c32e225f6487093d5b923e67663d62d0892508439cb3580f18d44/68747470733a2f2f73696c696e642d73332e73332e65752d776573742d322e616d617a6f6e6177732e636f6d2f64697265666c6f772f64697265666c6f772d636f6d706f6e656e742d6e65772d626173652e706e67)

----

![one](https://raw.githubusercontent.com/andrew781026/ithome_ironman_2021/master/day-06/number-icon/one.png) 利用 [direflow.io](https://github.com/Silind-Software/direflow) 的 `direflow create` 建立專案 

> 參考 [direflow.io - 官方網站](https://direflow.io/get-started)

```shell script
$ npm i -g direflow-cli
$ direflow create my-app
$ cd my-app
$ npm start
```

![create react app](https://miro.medium.com/max/700/1*BarMohttHm6rUB4NiiTsVg.gif)

![two](https://raw.githubusercontent.com/andrew781026/ithome_ironman_2021/master/day-06/number-icon/two.png) 利用 `npm run build` 建立 Web Component



![three](https://raw.githubusercontent.com/andrew781026/ithome_ironman_2021/master/day-06/number-icon/three.png) 利用 `npm run build` 建立 Web Component

```shell script
$ npm run build
```

我們看到 build 資料夾中多了一個 `direflowBundle.js` 的檔案

![]()



## 參考資料 

- [React and Web Components](https://itnext.io/react-and-web-components-3e0fca98a593)

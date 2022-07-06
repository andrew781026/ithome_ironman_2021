# [Day15] - 利用 [direflow.io](https://github.com/Silind-Software/direflow) 將 React Components 轉換成 Web Components

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

![two](https://raw.githubusercontent.com/andrew781026/ithome_ironman_2021/master/day-06/number-icon/two.png) 建立一個 React Component


```jsx
import React from 'react';
import PropTypes from 'prop-types';
import {Styled} from 'direflow-component';
import styles from './App.css';

class App extends React.Component {

  state = {timer: 10}

  constructor() {
    super();

    console.log(this.props)
    this.state.timer = this.props?.timer || 10
  }

  componentDidMount() {

    setInterval(() => this.setState({timer: this.state.timer - 1}), 1000)
  }

  render() {

    return (
      <Styled styles={styles}>
        <div className="box">
          <div className="circle circle1"></div>
          <div className="circle circle2"></div>
          <div className="number">{this.state?.timer}</div>
          <div className="niddle"></div>
        </div>
      </Styled>
    );
  }
}

App.defaultProps = {timer: 10,}

App.propTypes = {
  timer: PropTypes.number,
};

export default App;
```

![three](https://raw.githubusercontent.com/andrew781026/ithome_ironman_2021/master/day-06/number-icon/three.png) 利用 `DireflowComponent.create` 來設定要建立的 Web Component

```javascript
import { DireflowComponent } from 'direflow-component';
import App from './App.jsx';

export default DireflowComponent.create({
  component: App,
  configuration: {
    tagname: 'film-countdown',
  },
});
```

![four](https://raw.githubusercontent.com/andrew781026/ithome_ironman_2021/master/day-06/number-icon/four.png) 利用 `npm run build` 建立 Web Component

```shell script
$ npm run build
```

我們看到 build 資料夾中多了一個 `direflowBundle.js` 的檔案

![build-folder](https://raw.githubusercontent.com/andrew781026/ithome_ironman_2021/master/day-16/build-folder.png)

將建立出來的 `direflowBundle.js` 引入到 html 中 , 即可使用 `<film-countdown>` 這個 custom-tag

```html
<body style="margin: 0">

<film-countdown timer="40"></film-countdown>

<script src="./direflowBundle.js"></script>
</body>
```

## 成果

![count-down](https://raw.githubusercontent.com/andrew781026/ithome_ironman_2021/master/day-16/count-down.gif)


如果想直接體驗成果 , 請到 [react-web-component.html](https://andrew781026.github.io/ithome_ironman_2021/day-16/index.html) 查看


## 參考資料

- [React and Web Components](https://itnext.io/react-and-web-components-3e0fca98a593)
- [youtube - Film Countdown Timer](https://www.youtube.com/watch?v=Mo0WpdsGuXA&t=447s)

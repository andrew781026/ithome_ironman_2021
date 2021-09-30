# [Day25] - Using Redux with Web Component

使用組件跟組件的組合 , 形成一個頁面

勢必會遇到經典的組件傳值 issue (下圖左側)

![](https://i.imgur.com/64cAf1P.png)

以大家常使用的 Facebook 為例 , 

![](https://i.imgur.com/BXy8fIc.png)

顯示使用者資訊的區塊有 4 個 

![](https://i.imgur.com/iycmCpd.png)

如果轉換成 Component 視角來看 , 

![](https://i.imgur.com/M3qmtZw.png)

勢必我們需要將 userData 傳來傳去 , 

![](https://i.imgur.com/Dl7t5Fn.png)

如果 userData 改變 , 你就要通知向上通知 , 又向下通知 , 通過層層關卡的通知鏈

![](https://i.imgur.com/xSe3Ipa.png)

也許我們只要通知一個人 , 由他通知該通知的人就好

![](https://i.imgur.com/uJQQBAj.png)

那在 Web Component 中 , 有什麼方式去建立一個 `資料集中區` , 通知該通知的人呢 ?

我們來使用 [Web Components Redux](https://github.com/sheeshpaul/webcomponents-redux) 來跨過 Web component 的層層傳值 issue 吧 !

## 前期準備

[]

首先 , 我們需要有一個多層的 web components 組 ( 至少要有 4 層 )

然後我們一層一層的傳遞資料 , ~~ 好麻煩阿 ~~

接著我們將資料接到 Redux 上面 , 輕鬆寫意的傳值阿 , 蘇福

## 參考資料

- [Web Components Redux](https://github.com/sheeshpaul/webcomponents-redux)
- [el-admin](https://el-admin.vip/guide/)

# [Day26] - Angular Component to Web Component

後來發現 , 之前說明了 Vue . React Component 如何變成 Web Component 但是忘記說明 Angular Component 如何轉換成 Web Component , 今天補上這個的說明吧 !

我們可以利用官方的 [Angular-Element](https://angular.io/guide/elements) 來製作 Web Component

![](https://i.imgur.com/a9aI9PQ.png)

----

![one](https://raw.githubusercontent.com/andrew781026/ithome_ironman_2021/master/day-06/number-icon/one.png) 安裝 [Angualr CLI](https://angular.io/cli) & 建立新的專案

```shell script
$ npm install -g @angular/cli
$ ng new web-demo
```

![](https://i.imgur.com/fuKVJxq.png)

![two](https://raw.githubusercontent.com/andrew781026/ithome_ironman_2021/master/day-06/number-icon/two.png) 新增 [Angular-Element](https://angular.io/guide/elements) 套件

```shell script
$ ng new web-demo
$ ng add @angular/elements
```

![](https://i.imgur.com/tglBSX8.png)

![three](https://raw.githubusercontent.com/andrew781026/ithome_ironman_2021/master/day-06/number-icon/three.png) 利用 [Angualr CLI](https://angular.io/cli) 建立 Angular Component

```shell script
$ ng g c custom-list --inline-template --inline-style
```

## 參考資料

- [Creating Web Components with Angular Element — Angular 11](https://javascript.plainenglish.io/creating-web-component-with-angular-element-angular-11-1c53be854a07)

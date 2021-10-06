# [Day26] - Angular Component to Web Component

後來發現 , 之前說明了 Vue . React Component 如何變成 Web Component 但是忘記說明 Angular Component 如何轉換成 Web Component , 今天補上這個的說明吧 !

我們可以利用官方的 [Angular-Element](https://angular.io/guide/elements) 來製作 Web Component

![](https://i.imgur.com/a9aI9PQ.png)

----

![one](https://raw.githubusercontent.com/andrew781026/ithome_ironman_2021/master/day-06/number-icon/one.png) 安裝 [Angualr CLI](https://angular.io/cli) 

```shell script
$ npm install -g @angular/cli
$ ng new web-components --createApplication=false
$ cd web-components 
$ ng generate application FirstWebComponent  --skipInstall=true
$ ng add @angular/elements
```

![](https://i.imgur.com/fuKVJxq.png)

![two](https://raw.githubusercontent.com/andrew781026/ithome_ironman_2021/master/day-06/number-icon/two.png) 下載 [@angular/elements](https://angular.io/guide/elements) 套件

```shell script
$ ng new web-demo
$ ng add @angular/elements
```

![](https://i.imgur.com/tglBSX8.png)

![three](https://raw.githubusercontent.com/andrew781026/ithome_ironman_2021/master/day-06/number-icon/three.png) 利用 [Angualr CLI](https://angular.io/cli) 建立 Angular Component

```shell script
$ ng g c custom-list --inline-template --inline-style
```


```shell script
$ ng generate component UIButton
```

產生 `custom-list/custom-list.component.spec.ts` 跟 `custom-list/custom-list.component.ts` 這 2 個檔案

![](https://i.imgur.com/bxtxhmY.png)

![four](https://raw.githubusercontent.com/andrew781026/ithome_ironman_2021/master/day-06/number-icon/four.png) 改造一下 `custom-list.component.ts` 的內容

```javascript
import {Component, Input, Output, EventEmitter} from '@angular/core';

interface ListItem {
  desc: string;
  id: number;
}

@Component({
  selector: 'app-custom-list',
  template: `
    <p *ngFor="let item of items;let i = index;" (click)="handleItemClick(item)" )>
      {{i + 1}} - {{item.desc}}
    </p>
  `,
  styles: []
})
export class CustomListComponent {

  @Input()
  items = [{desc: 'Good Job', id: 1}]

  @Output()
  itemClicked = new EventEmitter<number>();

  constructor() {
  }

  handleItemClick(item: ListItem) {
    this.itemClicked.emit(item.id)
  }

}
```

然後 `npm run start` , 我們可以看到在 `http://localhost` 上有我們做的 Angular Component

![five](https://raw.githubusercontent.com/andrew781026/ithome_ironman_2021/master/day-06/number-icon/five.png) 新增  `custom-list.module.ts` & `custom-list.main.ts` , 當作 Web Component 的進入點


![six](https://raw.githubusercontent.com/andrew781026/ithome_ironman_2021/master/day-06/number-icon/six.png) 修改 `angular.json` 的設定

打開專案根目錄的 `angular.json` , 我們可以看到有一個 project 的區塊 , 裡面有 `web-demo` ~我們當初建立的專案名稱~

![](https://i.imgur.com/IC7rhmG.png)



## 參考資料

- [Angular elements overview](https://angular.io/guide/elements)
- [Angular + Web Components: a complete guide](https://indepth.dev/posts/1116/angular-web-components-a-complete-guide)

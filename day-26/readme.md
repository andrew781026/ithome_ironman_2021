# [Day26] - Angular Component to Web Component

後來發現 , 之前說明了 Vue . React Component 如何變成 Web Component 但是忘記說明 Angular Component 如何轉換成 Web Component , 今天補上這個的說明吧 !

我們可以利用官方的 [Angular-Element](https://angular.io/guide/elements) 來製作 Web Component

![](https://i.imgur.com/a9aI9PQ.png)

----

1.安裝 angular CLI tool  
2.建立專案 `$ ng new angular-web-component --routing=false --skip-tests=true --style=css`  
3.建立 component `cd angular-web-component && ng generate component info-box`   
4.安裝 `@angular/elements` 套件到專案中 `ng add @angular/elements`   
5.調整 info-box 元件的內容 < in src/app/app.module.ts >

i. @NgModule 的區塊做改變 , 拿掉 

```typescript
// src/app/app.module.ts

import { createCustomElement } from '@angular/elements';

@NgModule({
  bootstrap: [],
  entryComponents: [CounterComponent]
})
export class AppModule {
  constructor(private injector: Injector) {

  }
  ngDoBootstrap() {
    const counterElement = createCustomElement(CounterComponent, { injector: this.injector });
    customElements.define('my-counter', counterElement);
  }
}

```

6. 將 web component 建立出來 `ng build --output-hashing=none`

## 參考資料

- [Angular elements overview](https://angular.io/guide/elements)
- [Angular + Web Components: a complete guide](https://indepth.dev/posts/1116/angular-web-components-a-complete-guide)
- [[Angular進階議題] Angular Elements 簡介](https://wellwind.idv.tw/blog/2018/05/08/angular-advanced-angular-elements-intro/)
- [Angular Web Components](https://www.codementor.io/blog/angular-web-components-8e4n0r0zw7)

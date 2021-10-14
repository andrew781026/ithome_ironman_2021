# [Day26] - Angular Component to Web Component

後來發現 , 之前說明了 Vue . React Component 如何變成 Web Component 但是忘記說明 Angular Component 如何轉換成 Web Component , 今天補上這個的說明吧 !

我們可以利用官方的 [Angular-Element](https://angular.io/guide/elements) 來製作 Web Component

![](https://i.imgur.com/a9aI9PQ.png)

----

1.安裝 angular CLI tool  
2.建立專案 `$ ng new angular-web-component --routing=false --skip-tests=true --style=css`  
3.建立 component `cd angular-web-component && ng generate component info-box`   
4.   

![one](https://raw.githubusercontent.com/andrew781026/ithome_ironman_2021/master/day-06/number-icon/one.png) 安裝 [Angualr CLI](https://angular.io/cli) 

```shell script
$ npm install -g @angular/cli
$ ng new web-components --createApplication=false
$ cd web-components 
$ ng generate application FirstWebComponent  --skipInstall=true
$ ng add @angular/elements
```

![](https://i.imgur.com/fuKVJxq.png)

```shell script
$ ng generate component UIButton
```

open `src/app/app.module.ts` 

```typescript
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { UIButtonComponent } from './uibutton/uibutton.component';

@NgModule({
  declarations: [
    AppComponent,
    UIButtonComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
```

追加 customElements 的相關設定 , 讓 UIButtonComponent 變成 Web Component

```typescript
import {NgModule, DoBootstrap, Injector} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {createCustomElement} from '@angular/elements';

import {AppComponent} from './app.component';
import {UIButtonComponent} from './uibutton/uibutton.component';

@NgModule({
  declarations: [
    AppComponent,
    UIButtonComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents: [UIButtonComponent],
})
export class AppModule implements DoBootstrap {

  constructor(private injector: Injector) {
    const webComponent = createCustomElement(UIButtonComponent, {injector});
    customElements.define('ui-button', webComponent);
  }

  ngDoBootstrap() {
  }
}
```

執行 `ng build FirstWebComponent` 

download the @angular/element using example 

![](https://i.imgur.com/TyF47QN.png)


```shell
$ ng new angular-web-component --routing=false --skip-tests=true --style=css
```

```shell
$ cd angular-web-component && ng generate component info-box
```

```shell
$ ng add @angular/elements
```

## 參考資料

- [Angular elements overview](https://angular.io/guide/elements)
- [Angular + Web Components: a complete guide](https://indepth.dev/posts/1116/angular-web-components-a-complete-guide)

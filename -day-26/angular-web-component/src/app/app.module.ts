// src/app/app.module.ts
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { NgModule, Injector } from '@angular/core';
import { createCustomElement } from '@angular/elements';

import { InfoBoxComponent } from './info-box/info-box.component';

@NgModule({
  declarations: [InfoBoxComponent],
  imports: [BrowserModule, FormsModule],
  providers: [],
  entryComponents: [InfoBoxComponent]
})
export class AppModule {
  constructor(injector: Injector) {
    const el = createCustomElement(InfoBoxComponent, { injector });
    customElements.define('info-box', el);
  }

  ngDoBootstrap() {}
}

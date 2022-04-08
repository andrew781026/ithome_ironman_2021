// src/app/info-box/info-box.component.ts
import {Component, Input, ViewEncapsulation} from '@angular/core';

@Component({
  selector: 'info-box',
  templateUrl: './info-box.component.html',
  styleUrls: ['./info-box.component.css'],
  encapsulation: ViewEncapsulation.ShadowDom
})
export class InfoBoxComponent {
  @Input() title = 'So King';

  name: string = '';
  address: string = '';
  changeLog: Array<string> = [];
  changeStr: string = '';

  constructor() {
  }

}

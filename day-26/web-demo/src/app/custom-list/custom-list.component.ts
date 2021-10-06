import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-custom-list',
  template: `
    <p>
      custom-list works!
    </p>
  `,
  styles: [
  ]
})
export class CustomListComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}

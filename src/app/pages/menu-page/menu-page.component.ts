import { Component, OnInit, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-menu-page',
  templateUrl: './menu-page.component.html',
  styleUrls: ['./menu-page.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class MenuPageComponent implements OnInit {

  list: any[];

  constructor() {
    this.list = [
      {
        title: 'Hello'
      },
      {
        title: 'Angular'
      },
      {
        title: 'World',
        list: [
          {
            title: 'World sub menu'
          },
          {
            title: 'World sub menu 2'
          }
        ]
      }
    ];
  }

  ngOnInit() {
  }

  onChooseItem(item) {
    console.log(item);
  }
}

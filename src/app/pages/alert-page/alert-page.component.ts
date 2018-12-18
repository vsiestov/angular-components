import { Component, OnInit, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-alert-page',
  templateUrl: './alert-page.component.html',
  styleUrls: ['./alert-page.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AlertPageComponent implements OnInit {

  isVisible: boolean;

  constructor() {
    this.isVisible = false;
  }

  ngOnInit() {
  }

}

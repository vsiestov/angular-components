import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-autocomplete-page',
  templateUrl: './autocomplete-page.component.html',
  styleUrls: ['./autocomplete-page.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AutocompletePageComponent implements OnInit {
  list: any[];
  many: any[];

  form: {
    value: string;
  };

  formGroup: FormGroup;

  constructor() {
    this.list = [
      {
        key: 0,
        title: 'Hello'
      },
      {
        key: 2,
        title: 'Angular'
      },
      {
        key: 3,
        title: 'World'
      },
      {
        key: 4,
        title: 'In the web'
      }
    ];

    this.form = {
      value: ''
    };

    this.formGroup = new FormGroup({
      many: new FormControl('')
    });

    this.many = [];

    for (let i = 0; i < 50; i++) {
      this.many.push({
        key: i,
        title: `Item ${i.toString()}`
      });
    }
  }

  ngOnInit() {
  }

}

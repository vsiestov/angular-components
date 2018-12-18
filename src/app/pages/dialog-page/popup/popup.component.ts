import { Component, Inject, OnInit } from '@angular/core';
import { DIALOG_DATA } from '../../../components/dialog.service';
import { DialogController } from '../../../components/dialog/dialog.controller';

@Component({
  selector: 'app-popup',
  templateUrl: './popup.component.html',
  styleUrls: ['./popup.component.scss']
})
export class PopupComponent implements OnInit {

  constructor(
    @Inject(DIALOG_DATA) public data: any,
    private dialogController: DialogController
  ) { }

  ngOnInit() {
  }

  closeButtonClick() {
    this.dialogController.close({
      message: 'Everything is fine'
    });
  }

}

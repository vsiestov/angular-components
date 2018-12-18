import { Component, OnInit, ViewContainerRef, ViewEncapsulation } from '@angular/core';
import { DialogService } from '../../components/dialog.service';
import { PopupComponent } from './popup/popup.component';

@Component({
  selector: 'app-dialog-page',
  templateUrl: './dialog-page.component.html',
  styleUrls: ['./dialog-page.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class DialogPageComponent implements OnInit {

  constructor(
    private dialogService: DialogService,
    private viewContainerRef: ViewContainerRef
  ) { }

  ngOnInit() {
  }

  openWindow() {
    const dialog = this.dialogService.open(PopupComponent, {
      view: this.viewContainerRef,
      data: {
        header: 'Your Trial Version is Expired',
        body: 'Please add Billing Details for upgrading your subscription'
      }
    });

    dialog.afterClosed().subscribe((value) => {
      console.log('dialog closed', value);
    });
  }
}

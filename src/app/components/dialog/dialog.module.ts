import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DialogService } from '../dialog.service';
import { OverlayModule } from '@angular/cdk/overlay';
import { DialogContainerComponent } from './dialog-container/dialog-container.component';
import { PortalModule } from '@angular/cdk/portal';

@NgModule({
  declarations: [
    DialogContainerComponent
  ],
  imports: [
    CommonModule,
    OverlayModule,
    PortalModule
  ],
  providers: [
    DialogService
  ],
  entryComponents: [
    DialogContainerComponent
  ]
})
export class DialogModule { }

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MenuModule } from './menu/menu.module';
import { ComboboxModule } from './combobox/combobox.module';
import { AlertModule } from './alert/alert.module';
import { DialogModule } from './dialog/dialog.module';

@NgModule({
  declarations: [
  ],
  imports: [
    CommonModule,
    MenuModule,
    ComboboxModule,
    AlertModule,
    DialogModule
  ],
  exports: [
    MenuModule,
    ComboboxModule,
    AlertModule,
    DialogModule
  ]
})
export class ComponentsModule { }

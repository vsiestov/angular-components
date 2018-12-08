import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MenuModule } from './menu/menu.module';

@NgModule({
  declarations: [
  ],
  imports: [
    CommonModule,
    MenuModule
  ],
  exports: [
    MenuModule
  ]
})
export class ComponentsModule { }

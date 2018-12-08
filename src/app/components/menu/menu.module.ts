import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OverlayModule } from '@angular/cdk/overlay';
import { MenuComponent } from './menu.component';
import { MenuItemComponent } from './menu-item/menu-item.component';
import { MenuTriggerDirective } from './menu-trigger.directive';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

const declarations = [
  MenuComponent,
  MenuItemComponent,
  MenuTriggerDirective
];

@NgModule({
  declarations,
  imports: [
    BrowserAnimationsModule,
    CommonModule,
    OverlayModule
  ],
  exports: [
    ...declarations
  ]
})
export class MenuModule { }

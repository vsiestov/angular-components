import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AutocompleteComponent } from './autocomplete/autocomplete.component';
import { AutocompleteContainerComponent } from './autocomplete-container/autocomplete-container.component';
import { OverlayModule } from '@angular/cdk/overlay';
import { AutocompleteItemComponent } from './autocomplete-item/autocomplete-item.component';

@NgModule({
  declarations: [
    AutocompleteComponent,
    AutocompleteContainerComponent,
    AutocompleteItemComponent
  ],
  imports: [
    CommonModule,
    OverlayModule
  ],
  exports: [
    AutocompleteComponent,
    AutocompleteContainerComponent,
    AutocompleteItemComponent
  ]
})
export class ComboboxModule { }

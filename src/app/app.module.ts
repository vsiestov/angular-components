import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ComponentsModule } from './components/components.module';
import { MenuPageComponent } from './pages/menu-page/menu-page.component';
import { AutocompletePageComponent } from './pages/autocomplete-page/autocomplete-page.component';
import { PipesPipe } from './pipes.pipe';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AlertPageComponent } from './pages/alert-page/alert-page.component';
import { DialogPageComponent } from './pages/dialog-page/dialog-page.component';
import { PopupComponent } from './pages/dialog-page/popup/popup.component';

@NgModule({
  declarations: [
    AppComponent,
    MenuPageComponent,
    AutocompletePageComponent,
    PipesPipe,
    AlertPageComponent,
    DialogPageComponent,
    PopupComponent
  ],
  imports: [
    BrowserModule,
    ComponentsModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [
    AppComponent
  ],
  entryComponents: [
    PopupComponent
  ]
})
export class AppModule { }

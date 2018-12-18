import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MenuPageComponent } from './pages/menu-page/menu-page.component';
import { AutocompletePageComponent } from './pages/autocomplete-page/autocomplete-page.component';
import { AlertPageComponent } from './pages/alert-page/alert-page.component';
import { DialogPageComponent } from './pages/dialog-page/dialog-page.component';

const routes: Routes = [
  {
    path: 'menu',
    component: MenuPageComponent
  },
  {
    path: 'autocomplete',
    component: AutocompletePageComponent
  },
  {
    path: 'alert',
    component: AlertPageComponent
  },
  {
    path: 'dialog',
    component: DialogPageComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

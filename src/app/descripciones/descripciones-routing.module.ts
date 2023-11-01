import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DescripcionesPage } from './descripciones.page';

const routes: Routes = [
  {
    path: '',
    component: DescripcionesPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DescripcionesPageRoutingModule {}

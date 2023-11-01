import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DescripcionesPageRoutingModule } from './descripciones-routing.module';

import { DescripcionesPage } from './descripciones.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DescripcionesPageRoutingModule
  ],
  declarations: [DescripcionesPage]
})
export class DescripcionesPageModule {}

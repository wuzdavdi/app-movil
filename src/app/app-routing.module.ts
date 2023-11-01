import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'datos/:nombre',
    loadChildren: () => import('./datos/datos.module').then( m => m.DatosPageModule)
  },
  {
    path: 'futbol',
    loadChildren: () => import('./futbol/futbol.module').then( m => m.FutbolPageModule)
  },
  {
    path: 'descripciones',
    loadChildren: () => import('./descripciones/descripciones.module').then( m => m.DescripcionesPageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }

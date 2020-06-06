import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { DataCheckGuard } from './guards/data-check.guard';

const routes: Routes = [
  {
    path: '',
    canActivate: [DataCheckGuard],    
    loadChildren: () => import('./pages/home.module').then( m => m.HomePageModule)
  },
  {
    path: 'loaddata',
    loadChildren: () => import('./pages/loaddata.module').then( m => m.LoaddataPageModule)
  },
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}

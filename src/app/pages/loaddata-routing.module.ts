import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoaddataPage } from './loaddata.page';

const routes: Routes = [
  {
    path: '',
    component: LoaddataPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LoaddataPageRoutingModule {}

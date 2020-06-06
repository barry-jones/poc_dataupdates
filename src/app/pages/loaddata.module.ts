import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { LoaddataPageRoutingModule } from './loaddata-routing.module';

import { LoaddataPage } from './loaddata.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LoaddataPageRoutingModule
  ],
  declarations: [LoaddataPage]
})
export class LoaddataPageModule {}

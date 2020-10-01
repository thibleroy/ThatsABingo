import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SopagePageRoutingModule } from './sopage-routing.module';

import { SopagePage } from './sopage.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SopagePageRoutingModule
  ],
  declarations: [SopagePage]
})
export class SopagePageModule {}

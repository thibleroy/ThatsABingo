import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SopagePage } from './sopage.page';

const routes: Routes = [
  {
    path: '',
    component: SopagePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SopagePageRoutingModule {}

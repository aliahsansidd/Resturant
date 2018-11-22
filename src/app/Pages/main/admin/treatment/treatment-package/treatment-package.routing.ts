import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TreatementPackageComponent } from './treatment-package.component';

const routes: Routes = [
  {
    path: '',
    component: TreatementPackageComponent,
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TreatmentPackageRoutingModule { }

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OPDDoctorComponent } from './opd-doctor.component';

const routes: Routes = [
  {
    path: '',
    component: OPDDoctorComponent,
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OpdDoctorRoutingModule { }

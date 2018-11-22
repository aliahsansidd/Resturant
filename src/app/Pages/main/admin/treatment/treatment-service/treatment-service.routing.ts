import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TreatementServiceComponent } from './treatment-service.component';

const routes: Routes = [
  {
    path: '',
    component: TreatementServiceComponent,
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TreatmentServiceRoutingModule { }

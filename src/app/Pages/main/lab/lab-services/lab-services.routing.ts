import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LabServicesComponent } from './lab-services.component';


const routes: Routes = [
  {
    path: '',
    component: LabServicesComponent
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LabServicesRoutingModule { }

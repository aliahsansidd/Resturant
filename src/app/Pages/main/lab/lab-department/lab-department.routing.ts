import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LabDepartmentComponent } from './lab-department.component';



const routes: Routes = [
  {
    path: '',
    component: LabDepartmentComponent
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LabDepartmentRoutingModule { }

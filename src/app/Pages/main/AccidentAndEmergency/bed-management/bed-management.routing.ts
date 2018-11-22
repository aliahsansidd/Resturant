import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BedManagementComponent } from './bed-management.component';


const routes: Routes = [
  {
    path: '',
    component: BedManagementComponent,
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BedManagementRoutingModule { }

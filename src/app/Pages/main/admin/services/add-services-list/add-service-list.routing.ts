import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddServicesListComponent } from './add-services-list.component';

const routes: Routes = [
  {
    path: '',
    component: AddServicesListComponent,
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AddServicesListRoutingModule { }

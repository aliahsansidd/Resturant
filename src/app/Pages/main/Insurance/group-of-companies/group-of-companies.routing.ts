import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GroupOfCompaniesComponent } from './group-of-companies.component';


const routes: Routes = [
  {
    path: '',
    component: GroupOfCompaniesComponent,
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GroupOfCompaniesRoutingModule { }

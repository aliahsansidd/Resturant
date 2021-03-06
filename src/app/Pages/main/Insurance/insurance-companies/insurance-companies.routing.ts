import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InsuranceCompaniesComponent } from './insurance-companies.component';


const routes: Routes = [
  {
    path: '',
    component: InsuranceCompaniesComponent,
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InsuranceCompaniesRoutingModule { }

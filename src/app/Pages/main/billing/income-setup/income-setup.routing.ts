import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IncomeSetupComponent } from './income-setup.component';

const routes: Routes = [
  {
    path: '',
    component: IncomeSetupComponent,
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class IncomeSetupRoutingModule { }

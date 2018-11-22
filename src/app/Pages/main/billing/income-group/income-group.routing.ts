import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IncomeGroupComponent } from './income-group.component';

const routes: Routes = [
  {
    path: '',
    component: IncomeGroupComponent,
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class IncomeGroupRoutingModule { }

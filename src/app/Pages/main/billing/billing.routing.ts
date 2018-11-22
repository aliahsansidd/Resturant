import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BillingComponent } from './billing.component';

const routes: Routes = [
  {
    path: '',
    component: BillingComponent,
    children: [
      {
        path: 'income-group',
        loadChildren: 'app/Pages/main/billing/income-group/income-group.module#IncomeGroupModule',
        data: { title: 'BluePulse | Income Group' }
      },
      {
        path: 'income-setup',
        loadChildren: 'app/Pages/main/billing/income-setup/income-setup.module#IncomeSetupModule',
        data: { title: 'BluePulse | income Setup' }
      },
    ]
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BillingRouting { }

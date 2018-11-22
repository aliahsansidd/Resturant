import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccountsManagementComponent } from './accounts-management.component';

const routes: Routes = [
  {
    path: '',
    component: AccountsManagementComponent,
    children: [
      {
        path: 'charts-of-accounts',
        loadChildren: 'app/Pages/main/accounts-management/charts-of-accounts/charts-of-accounts.module#ChartsOfAccountsModule',
        data: { title: 'BluePulse | Add Bed' }
      },
    ]
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AccountsManagementRouting { }

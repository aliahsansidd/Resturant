import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ChartsOfAccountsComponent } from './charts-of-accounts.component';

const routes: Routes = [
  {
    path: '',
    component: ChartsOfAccountsComponent,
    children: [
      {
        path: 'setup',
        loadChildren: 'app/Pages/main/accounts-management/charts-of-accounts/setup/setup.module#SetupModule',
        data: { title: 'BluePulse | Admin' }
      },
      {
        path: 'create-account',
        loadChildren: 'app/Pages/main/accounts-management/charts-of-accounts/create-account/create-account.module#CreateAccountModule',
        data: { title: 'BluePulse | Create Account' }
      }
    ]
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ChartsOfAccountsRoutingModule { }

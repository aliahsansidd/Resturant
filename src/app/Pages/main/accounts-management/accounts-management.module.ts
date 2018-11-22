import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AccountsManagementComponent } from './accounts-management.component';
import { AccountsManagementRouting } from './accounts-management.routing';
import { ChartsOfAccountsComponent } from './charts-of-accounts/charts-of-accounts.component';
import { SetupComponent } from './charts-of-accounts/setup/setup.component';
import { CoaListComponent } from './charts-of-accounts/coa-list/coa-list.component';
@NgModule({
  imports: [
    AccountsManagementRouting ,
    FormsModule,
    ReactiveFormsModule,
    CommonModule,

  ],
  declarations: [AccountsManagementComponent],
  entryComponents: [],
  providers: []
})
export class AccountsManagementModule { }

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ChartsOfAccountsComponent } from './charts-of-accounts.component';
import { ChartsOfAccountsRoutingModule } from './charts-of-accounts.routing';
// import { PopupModalComponent } from '../../shared_components/popup-modal/popup-modal.component';
// import { RegisterComponent } from './register/register.component';
// import { ResetPasswordPageComponent } from './reset-password-page/reset-password-page.component';
// import { ResetPasswordComponent } from './reset-password/reset-password.component';
@NgModule({
  imports: [
    ChartsOfAccountsRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    CommonModule,

  ],
  declarations: [ChartsOfAccountsComponent],
  entryComponents: [],
  providers: []
})
export class ChartsOfAccountsModule { }

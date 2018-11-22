import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AlertModalComponent } from './alert-modal.component';
// import { PopupModalComponent } from '../../shared_components/popup-modal/popup-modal.component';
// import { RegisterComponent } from './register/register.component';
// import { ResetPasswordPageComponent } from './reset-password-page/reset-password-page.component';
// import { ResetPasswordComponent } from './reset-password/reset-password.component';
@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [AlertModalComponent],
  entryComponents: [],
  exports: [AlertModalComponent],
  providers: []
})
export class AlertModalModule { }

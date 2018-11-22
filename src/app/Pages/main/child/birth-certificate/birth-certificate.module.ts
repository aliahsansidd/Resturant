import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BirthCertificateRoutingModule } from './birth-certificate.routing';
import { BirthCertificateComponent } from './birth-certificate.component';
// import { PopupModalComponent } from '../../shared_components/popup-modal/popup-modal.component';
// import { RegisterComponent } from './register/register.component';
// import { ResetPasswordPageComponent } from './reset-password-page/reset-password-page.component';
// import { ResetPasswordComponent } from './reset-password/reset-password.component';
@NgModule({
  imports: [
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    BirthCertificateRoutingModule
  ],
  declarations: [BirthCertificateComponent],
  entryComponents: [],
  exports: [BirthCertificateComponent],
  providers: []
})
export class BirthCertificateModule { }

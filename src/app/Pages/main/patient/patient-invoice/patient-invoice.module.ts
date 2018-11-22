import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PatientinvoiceComponent } from './patientinvoice.component';
import { PatientInvoiceRoutingModule } from './patient-invoice.routing';

// import { PopupModalComponent } from '../../shared_components/popup-modal/popup-modal.component';
// import { RegisterComponent } from './register/register.component';
// import { ResetPasswordPageComponent } from './reset-password-page/reset-password-page.component';
// import { ResetPasswordComponent } from './reset-password/reset-password.component';
@NgModule({
  imports: [
    FormsModule,
    PatientInvoiceRoutingModule,
    ReactiveFormsModule,
    CommonModule
  ],
  declarations: [PatientinvoiceComponent],
  entryComponents: [],
  providers: []
})
export class PatientinvoiceModule { }

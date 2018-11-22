import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TreatmentServiceRoutingModule } from './treatment-service.routing';
import { TreatementServiceComponent } from './treatment-service.component';
// import { PopupModalComponent } from '../../shared_components/popup-modal/popup-modal.component';
// import { RegisterComponent } from './register/register.component';
// import { ResetPasswordPageComponent } from './reset-password-page/reset-password-page.component';
// import { ResetPasswordComponent } from './reset-password/reset-password.component';
@NgModule({
  imports: [
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    TreatmentServiceRoutingModule
  ],
  declarations: [TreatementServiceComponent],
  entryComponents: [],
  providers: []
})
export class TreatmentServiceModule { }

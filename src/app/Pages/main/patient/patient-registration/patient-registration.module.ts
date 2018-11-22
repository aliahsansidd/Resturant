import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PatientRegistrationComponent } from './patient-registration.component';
import { PatientRegistrationRoutingModule } from './patient-registration.routing';
import { NgZorroAntdModule } from 'ng-zorro-antd';
// import { PopupModalComponent } from '../../shared_components/popup-modal/popup-modal.component';
// import { RegisterComponent } from './register/register.component';
// import { ResetPasswordPageComponent } from './reset-password-page/reset-password-page.component';
// import { ResetPasswordComponent } from './reset-password/reset-password.component';
@NgModule({
  imports: [
    PatientRegistrationRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    NgZorroAntdModule.forRoot()
  ],
  declarations: [PatientRegistrationComponent],
  entryComponents: [],
  providers: []
})
export class PatientRegistrationModule { }

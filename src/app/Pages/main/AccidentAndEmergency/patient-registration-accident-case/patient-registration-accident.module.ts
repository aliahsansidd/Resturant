import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PatientRegistrationAccidentCaseComponent } from './patient-registration-accident-case.component';
import { PatientRegistrationAccidentCaseComponentRoutingModule } from './patient-registration-accident-case.routing';
import { NgZorroAntdModule } from 'ng-zorro-antd';
import { SearchFieldModule } from '../../../../CommonComponents/search-field/search-field.module';
// import { PopupModalComponent } from '../../shared_components/popup-modal/popup-modal.component';
// import { RegisterComponent } from './register/register.component';
// import { ResetPasswordPageComponent } from './reset-password-page/reset-password-page.component';
// import { ResetPasswordComponent } from './reset-password/reset-password.component';
@NgModule({
  imports: [
    PatientRegistrationAccidentCaseComponentRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    NgZorroAntdModule.forRoot(),
    SearchFieldModule,
  ],
  declarations: [PatientRegistrationAccidentCaseComponent],
  entryComponents: [],
  providers: []
})
export class PatientRegistrationAccidentCaseModule { }

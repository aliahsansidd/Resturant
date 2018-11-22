import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PatientDashboardComponent } from './patient-dashboard.component';
import { PatientDashboardRoutingModule } from './patient-dashboard.routing';
import { NgZorroAntdModule } from 'ng-zorro-antd';
// import { PatientDashboardComponent } from './patient-dashboard.component';
// import { PopupModalComponent } from '../../shared_components/popup-modal/popup-modal.component';
// import { RegisterComponent } from './register/register.component';
// import { ResetPasswordPageComponent } from './reset-password-page/reset-password-page.component';
// import { ResetPasswordComponent } from './reset-password/reset-password.component';
@NgModule({
  imports: [
    PatientDashboardRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    NgZorroAntdModule.forRoot()
  ],
  declarations: [PatientDashboardComponent],
  entryComponents: [],
  providers: []
})
export class PatientDashboardModule { }

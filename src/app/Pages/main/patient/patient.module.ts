import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PatientComponent } from './patient.component';
import { routes } from './patient.routing';
// import { PatientDashboardComponent } from './patient-dashboard/patient-dashboard.component';
import { RouterModule } from '@angular/router';
import { BsDatepickerModule } from 'ngx-bootstrap';
import { NgZorroAntdModule } from 'ng-zorro-antd';
// import { PopupModalComponent } from '../../shared_components/popup-modal/popup-modal.component';
// import { RegisterComponent } from './register/register.component';
// import { ResetPasswordPageComponent } from './reset-password-page/reset-password-page.component';
// import { ResetPasswordComponent } from './reset-password/reset-password.component';
@NgModule({
  imports: [
    // NgZorroAntdModule.forRoot(),
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    BsDatepickerModule.forRoot(),
    RouterModule.forChild(routes)
  ],
  declarations: [PatientComponent],
  entryComponents: [],
  providers: []
})
export class PatientModule { }

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PatientListRoutingModule } from './patient-list.routing';
import { PatientlistComponent } from './patientlist.component';
import { NgXBootstrapModule } from '../../../../BootstrapModules/NgxBootstrapServices.service';
import { BsDatepickerModule } from 'ngx-bootstrap';
import { NgZorroAntdModule } from 'ng-zorro-antd';

// import { PopupModalComponent } from '../../shared_components/popup-modal/popup-modal.component';
// import { RegisterComponent } from './register/register.component';
// import { ResetPasswordPageComponent } from './reset-password-page/reset-password-page.component';
// import { ResetPasswordComponent } from './reset-password/reset-password.component';
@NgModule({
  imports: [
    NgZorroAntdModule.forRoot(),
    PatientListRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    NgXBootstrapModule,
    BsDatepickerModule.forRoot()
  ],
  declarations: [PatientlistComponent],
  entryComponents: [],
  providers: []
})
export class PatientListModule { }

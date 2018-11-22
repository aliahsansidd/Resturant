import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AddDoctorComponent } from './add-doctor.component';
import { AddDoctorRoutingModule } from './add-doctor.routing';
import { NgSelectModule } from '@ng-select/ng-select';
import { DeleteModalModule } from '../../../../CommonComponents/CommonModals/delete-modal/delete-modal.module';

// import { PopupModalComponent } from '../../shared_components/popup-modal/popup-modal.component';
// import { RegisterComponent } from './register/register.component';
// import { ResetPasswordPageComponent } from './reset-password-page/reset-password-page.component';
// import { ResetPasswordComponent } from './reset-password/reset-password.component';
@NgModule({
  imports: [
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    AddDoctorRoutingModule,
    NgSelectModule,
    DeleteModalModule

  ],
  declarations: [AddDoctorComponent],
  entryComponents: [],
  providers: []
})
export class AddDoctorModule { }

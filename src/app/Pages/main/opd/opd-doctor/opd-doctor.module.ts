import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DeleteModalModule } from '../../../../CommonComponents/CommonModals/delete-modal/delete-modal.module';
import { NgPipesModule} from 'ngx-pipes';
import { NgZorroAntdModule } from 'ng-zorro-antd';
import { OpdDoctorRoutingModule } from './opd-doctor.routing';
import { OPDDoctorComponent } from './opd-doctor.component';
import { NgSelectModule } from '@ng-select/ng-select';
import { OwlDatePickerModule } from '../../../../CommonComponents/owl-date-picker/owl-date-picker.module';

// import { PopupModalComponent } from '../../shared_components/popup-modal/popup-modal.component';
// import { RegisterComponent } from './register/register.component';
// import { ResetPasswordPageComponent } from './reset-password-page/reset-password-page.component';
// import { ResetPasswordComponent } from './reset-password/reset-password.component';
@NgModule({
  imports: [
    NgSelectModule,
    FormsModule,
    CommonModule,
    ReactiveFormsModule,
    OpdDoctorRoutingModule,
    DeleteModalModule,
    NgPipesModule,
    OwlDatePickerModule,
    NgZorroAntdModule.forRoot()
  ],
  declarations: [OPDDoctorComponent],
  entryComponents: [],
  providers: []
})
export class OpdDoctorModule { }

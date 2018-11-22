import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { OpdRegistrationComponent } from './opd-registration.component';
import { OpdRegistrationRoutingModule } from './opd-registration.routing';
import { NgSelectModule } from '@ng-select/ng-select';
import { ConsultancyService } from '../../../../Services/endpoints/ConsultancyService';
import { NgZorroAntdModule } from 'ng-zorro-antd';
import { SearchFieldModule } from '../../../../CommonComponents/search-field/search-field.module';
import { OwlDatePickerModule } from '../../../../CommonComponents/owl-date-picker/owl-date-picker.module';
// import { PopupModalComponent } from '../../shared_components/popup-modal/popup-modal.component';
// import { RegisterComponent } from './register/register.component';
// import { ResetPasswordPageComponent } from './reset-password-page/reset-password-page.component';
// import { ResetPasswordComponent } from './reset-password/reset-password.component';
@NgModule({
  imports: [
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    NgSelectModule,
    SearchFieldModule,
    OpdRegistrationRoutingModule,
    // OwlDatePickerModule,
    NgZorroAntdModule.forRoot()
  ],
  declarations: [OpdRegistrationComponent],
  entryComponents: [],
  providers: [ConsultancyService]
})
export class OpdRegistrationModule { }

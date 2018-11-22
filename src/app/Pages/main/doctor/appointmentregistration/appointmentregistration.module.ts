import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppointmentRegistrationRoutingModule } from './appointmentregistration.routing';
import { AppointmentregistrationComponent } from './appointmentregistration.component';
import { NgSelectModule } from '@ng-select/ng-select';
import { NgZorroAntdModule } from 'ng-zorro-antd';
import { OwlDatePickerModule } from '../../../../CommonComponents/owl-date-picker/owl-date-picker.module';
import { SearchFieldModule } from '../../../../CommonComponents/search-field/search-field.module';
import { AppointmentCalendarModule } from '../../../../CommonComponents/appointment-calendar/appointment-calendar.module';
// import { PopupModalComponent } from '../../shared_components/popup-modal/popup-modal.component';
// import { RegisterComponent } from './register/register.component';
// import { ResetPasswordPageComponent } from './reset-password-page/reset-password-page.component';
// import { ResetPasswordComponent } from './reset-password/reset-password.component';
@NgModule({
  imports: [
    NgZorroAntdModule.forRoot(),
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    NgSelectModule,
    SearchFieldModule,
    AppointmentCalendarModule,
    AppointmentRegistrationRoutingModule
  ],
  declarations: [AppointmentregistrationComponent],
  entryComponents: [],
  providers: []
})
export class AppointmentRegistrationModule { }

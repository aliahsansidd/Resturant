import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { NgZorroAntdModule } from 'ng-zorro-antd';
import { AppointmentRegistrationViewComponent } from './appointment-registration-view.component';
import { AppointmentRegistrationViewRoutingModule } from './appointment-registration-view.routing';
import { NgPipesModule } from 'ngx-pipes';
import { BsDatepickerModule } from '../../../../../../node_modules/ngx-bootstrap';
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
    NgPipesModule,
    NgSelectModule,
    AppointmentRegistrationViewRoutingModule,
    BsDatepickerModule.forRoot(),
  ],
  declarations: [AppointmentRegistrationViewComponent],
  entryComponents: [],
  providers: []
})
export class AppointmentRegistrationViewModule { }

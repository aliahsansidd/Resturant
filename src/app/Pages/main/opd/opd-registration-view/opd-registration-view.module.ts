import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { NgSelectModule } from '@ng-select/ng-select';
import { ConsultancyService } from '../../../../Services/endpoints/ConsultancyService';
import { OpdRegistrationViewRoutingModule } from './opd-registration-view.routing';
import { OpdRegistrationViewComponent } from './opd-registration-view.component';
import { BsDatepickerModule } from 'ngx-bootstrap';
import { NgZorroAntdModule } from 'ng-zorro-antd';
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
    NgSelectModule,
    OpdRegistrationViewRoutingModule,
    BsDatepickerModule.forRoot(),
    NgZorroAntdModule.forRoot(),
    DeleteModalModule
  ],
  declarations: [OpdRegistrationViewComponent],
  entryComponents: [],
  providers: [ConsultancyService]
})
export class OpdRegistrationViewModule { }

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UserManagementComponent } from './usermanagement.component';
import { UserManagementRoutingModule } from './usermanagement.routing';
import { NgZorroAntdModule } from 'ng-zorro-antd';
import { DeleteModalModule } from '../../../../CommonComponents/CommonModals/delete-modal/delete-modal.module';
import { BsDatepickerModule } from '../../../../../../node_modules/ngx-bootstrap';

// import { PopupModalComponent } from '../../shared_components/popup-modal/popup-modal.component';
// import { RegisterComponent } from './register/register.component';
// import { ResetPasswordPageComponent } from './reset-password-page/reset-password-page.component';
// import { ResetPasswordComponent } from './reset-password/reset-password.component';
@NgModule({
  imports: [
    NgZorroAntdModule.forRoot(),
    UserManagementRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    DeleteModalModule,
    BsDatepickerModule.forRoot()
  ],
  declarations: [UserManagementComponent],
  entryComponents: [],
  providers: []
})
export class UserManagementModule { }

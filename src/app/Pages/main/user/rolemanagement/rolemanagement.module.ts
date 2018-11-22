import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RoleManagementComponent } from './rolemanagement.component';
import { RoleManagementRoutingModule } from './rolemanagement.routing';
import { NgZorroAntdModule } from 'ng-zorro-antd';
import { DeleteModalModule } from '../../../../CommonComponents/CommonModals/delete-modal/delete-modal.module';
import { UserRolePipe } from 'app/Pipes/RolePipe';

// import { PopupModalComponent } from '../../shared_components/popup-modal/popup-modal.component';
// import { RegisterComponent } from './register/register.component';
// import { ResetPasswordPageComponent } from './reset-password-page/reset-password-page.component';
// import { ResetPasswordComponent } from './reset-password/reset-password.component';
@NgModule({
  imports: [
    NgZorroAntdModule.forRoot(),
    RoleManagementRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    DeleteModalModule
  ],
  declarations: [RoleManagementComponent, UserRolePipe],
  entryComponents: [],
  providers: []
})
export class RoleManagementModule { }


import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AddUserComponent } from './add-user.component';
import { AddUserRoutingModule } from './add-user.routing';
import { NgSelectModule } from '@ng-select/ng-select';
import { NgZorroAntdModule } from 'ng-zorro-antd';
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
    AddUserRoutingModule,
    NgZorroAntdModule.forRoot()
  ],
  declarations: [AddUserComponent],
  entryComponents: [],
  providers: []
})
export class AddUserModule { }

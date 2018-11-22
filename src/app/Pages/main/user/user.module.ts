import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UserRoutingModule } from './user.routing';
import { UserComponent } from './user.component';
import { NgZorroAntdModule } from 'ng-zorro-antd';
// import { PopupModalComponent } from '../../shared_components/popup-modal/popup-modal.component';
// import { RegisterComponent } from './register/register.component';
// import { ResetPasswordPageComponent } from './reset-password-page/reset-password-page.component';
// import { ResetPasswordComponent } from './reset-password/reset-password.component';
@NgModule({
  imports: [
    NgZorroAntdModule.forRoot(),
    UserRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    CommonModule
  ],
  declarations: [UserComponent],
  entryComponents: [],
  providers: []
})
export class UserModule { }

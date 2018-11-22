import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AddRoleComponent } from './add-role.component';
import { AddRoleRoutingModule } from './add-role.routing';
import { NgSelectModule } from '@ng-select/ng-select';

// import { PopupModalComponent } from '../../shared_components/popup-modal/popup-modal.component';
// import { RegisterComponent } from './register/register.component';
// import { ResetPasswordPageComponent } from './reset-password-page/reset-password-page.component';
// import { ResetPasswordComponent } from './reset-password/reset-password.component';
@NgModule({
  imports: [
    AddRoleRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    NgSelectModule
  ],
  declarations: [AddRoleComponent],
  entryComponents: [],
  providers: []
})
export class AddRoleModule { }

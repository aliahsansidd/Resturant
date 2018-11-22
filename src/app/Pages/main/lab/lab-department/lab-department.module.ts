import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LabDepartmentComponent } from './lab-department.component';
import { LabDepartmentRoutingModule } from './lab-department.routing';
import { NgPipesModule } from 'ngx-pipes';
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
    LabDepartmentRoutingModule,
    NgPipesModule,
    DeleteModalModule
  ],
  declarations: [LabDepartmentComponent],
  entryComponents: [],
  providers: []
})
export class LabDepartmentModule { }

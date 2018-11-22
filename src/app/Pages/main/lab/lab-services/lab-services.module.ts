import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LabServicesRoutingModule } from './lab-services.routing';
import { LabServicesComponent } from './lab-services.component';
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
    LabServicesRoutingModule,
    NgPipesModule,
    DeleteModalModule
  ],
  declarations: [LabServicesComponent],
  entryComponents: [],
  providers: []
})
export class LabServicesModule { }

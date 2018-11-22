import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LabRoutingModule } from './lab.routing';
import { LabComponent } from './lab.component';
import { NgPipesModule } from 'ngx-pipes';
import { DeleteModalModule } from '../../../CommonComponents/CommonModals/delete-modal/delete-modal.module';
import { BuildTestComponent } from './build-test/build-test.component';
import { RateSheetComponent } from './rate-sheet/rate-sheet.component';
import { LabRegistrationComponent } from './lab-registration/lab-registration.component';
// import { PopupModalComponent } from '../../shared_components/popup-modal/popup-modal.component';
// import { RegisterComponent } from './register/register.component';
// import { ResetPasswordPageComponent } from './reset-password-page/reset-password-page.component';
// import { ResetPasswordComponent } from './reset-password/reset-password.component';
@NgModule({
  imports: [
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    LabRoutingModule,
    NgPipesModule,
    DeleteModalModule
  ],
  declarations: [LabComponent],
  entryComponents: [],
  providers: []
})
export class LabModule { }
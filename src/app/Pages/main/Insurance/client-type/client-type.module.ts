import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DeleteModalModule } from '../../../../CommonComponents/CommonModals/delete-modal/delete-modal.module';
import { NgPipesModule } from 'ngx-pipes';
import { ClientTypeComponent } from './client-type.component';
import { ClientTypeRoutingModule } from './client-type.routing';
// import { PopupModalComponent } from '../../shared_components/popup-modal/popup-modal.component';
// import { RegisterComponent } from './register/register.component';
// import { ResetPasswordPageComponent } from './reset-password-page/reset-password-page.component';
// import { ResetPasswordComponent } from './reset-password/reset-password.component';
@NgModule({
  imports: [
    FormsModule,
    CommonModule,
    ClientTypeRoutingModule,
    DeleteModalModule,
    NgPipesModule
  ],
  declarations: [ClientTypeComponent],
  entryComponents: [],
  providers: []
})
export class ClientTypeModule { }

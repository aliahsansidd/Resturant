import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AddServicesListComponent } from './add-services-list.component';
import { AddServicesListRoutingModule } from './add-service-list.routing';
import { DeleteModalModule } from '../../../../../CommonComponents/CommonModals/delete-modal/delete-modal.module';
import { BsDatepickerModule } from '../../../../../../../node_modules/ngx-bootstrap';
// import { PopupModalComponent } from '../../shared_components/popup-modal/popup-modal.component';
// import { RegisterComponent } from './register/register.component';
// import { ResetPasswordPageComponent } from './reset-password-page/reset-password-page.component';
// import { ResetPasswordComponent } from './reset-password/reset-password.component';
@NgModule({
  imports: [
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    AddServicesListRoutingModule,
    DeleteModalModule,
    BsDatepickerModule.forRoot(),

  ],
  declarations: [AddServicesListComponent],
  entryComponents: [],
  providers: []
})
export class AddServiceListModule { }

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AddRoomsRoutingModule } from './add-rooms.routing';
import { AddRoomsComponent } from './add-rooms.component';
import { BsDatepickerModule } from 'ngx-bootstrap';
import { DeleteModalComponent } from '../../../../CommonComponents/CommonModals/delete-modal/delete-modal.component';
import { DeleteModalModule } from '../../../../CommonComponents/CommonModals/delete-modal/delete-modal.module';
import { NgPipesModule } from 'ngx-pipes';
// import { PopupModalComponent } from '../../shared_components/popup-modal/popup-modal.component';
// import { RegisterComponent } from './register/register.component';
// import { ResetPasswordPageComponent } from './reset-password-page/reset-password-page.component';
// import { ResetPasswordComponent } from './reset-password/reset-password.component';
@NgModule({
  imports: [
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    AddRoomsRoutingModule,
    BsDatepickerModule.forRoot(),
    DeleteModalModule,
    NgPipesModule
  ],
  declarations: [AddRoomsComponent],
  entryComponents: [],
  providers: []
})
export class AddRoomsModule { }

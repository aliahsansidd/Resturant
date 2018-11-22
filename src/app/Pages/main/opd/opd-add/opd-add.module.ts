import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { OPDAddComponent } from './opd-add.component';
import { OpdAddRoutingModule } from './opd-add.routing';
import { DeleteModalModule } from '../../../../CommonComponents/CommonModals/delete-modal/delete-modal.module';
import {NgPipesModule} from 'ngx-pipes';

// import { PopupModalComponent } from '../../shared_components/popup-modal/popup-modal.component';
// import { RegisterComponent } from './register/register.component';
// import { ResetPasswordPageComponent } from './reset-password-page/reset-password-page.component';
// import { ResetPasswordComponent } from './reset-password/reset-password.component';
@NgModule({
  imports: [
    FormsModule,
    CommonModule,
    ReactiveFormsModule,
    OpdAddRoutingModule,
    DeleteModalModule,
    NgPipesModule
  ],
  declarations: [OPDAddComponent],
  entryComponents: [],
  providers: []
})
export class OpdAddModule { }

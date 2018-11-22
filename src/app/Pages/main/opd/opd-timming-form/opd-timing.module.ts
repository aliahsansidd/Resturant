import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { OpdTimingFormComponent } from './opd-timming-form.component';
import { OpdTimingRoutingModule } from './opd-timing.routing';
import { NgSelectModule } from '@ng-select/ng-select';
// import { PopupModalComponent } from '../../shared_components/popup-modal/popup-modal.component';
// import { RegisterComponent } from './register/register.component';
// import { ResetPasswordPageComponent } from './reset-password-page/reset-password-page.component';
// import { ResetPasswordComponent } from './reset-password/reset-password.component';
import {NgPipesModule} from 'ngx-pipes';
import { DeleteModalComponent } from '../../../../CommonComponents/CommonModals/delete-modal/delete-modal.component';
import { DeleteModalModule } from '../../../../CommonComponents/CommonModals/delete-modal/delete-modal.module';
@NgModule({
  imports: [

    NgSelectModule,
    OpdTimingRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    NgPipesModule,
    DeleteModalModule
  ],
  declarations: [OpdTimingFormComponent],
  entryComponents: [],
  providers: []
})
export class OpdTimingModule { }

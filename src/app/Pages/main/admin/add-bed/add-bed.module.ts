import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AddBedComponent } from './add-bed.component';
import { AddBedRoutingModule } from './add-bed.routing';
import {NgPipesModule} from 'ngx-pipes';
import { DeleteModalComponent } from '../../../../CommonComponents/CommonModals/delete-modal/delete-modal.component';
import { DeleteModalModule } from '../../../../CommonComponents/CommonModals/delete-modal/delete-modal.module';
import { DatepickerModule, BsDatepickerModule } from 'ngx-bootstrap';
import { NgZorroAntdModule } from '../../../../../../node_modules/ng-zorro-antd';
// import { PopupModalComponent } from '../../shared_components/popup-modal/popup-modal.component';
// import { RegisterComponent } from './register/register.component';
// import { ResetPasswordPageComponent } from './reset-password-page/reset-password-page.component';
// import { ResetPasswordComponent } from './reset-password/reset-password.component';
@NgModule({
  imports: [
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    AddBedRoutingModule,
    NgPipesModule,
    DeleteModalModule,
    DatepickerModule.forRoot(),
    BsDatepickerModule.forRoot(),
    NgZorroAntdModule.forRoot()
  ],
  declarations: [AddBedComponent],
  entryComponents: [],
  providers: []
})
export class AddBedModule { }

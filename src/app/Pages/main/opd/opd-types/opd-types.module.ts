import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { OpdTypesComponent } from './opd-types.component';
import { OpdTypesRoutingModule } from './opd-types.routing';
import { AlertModalComponent } from '../../../../CommonComponents/alert-modal/alert-modal.component';
import { AlertModalModule } from '../../../../CommonComponents/alert-modal/alert-modal.module';
import { NgZorroAntdModule } from 'ng-zorro-antd';
import {NgPipesModule} from 'ngx-pipes';
import { DeleteModalModule } from '../../../../CommonComponents/CommonModals/delete-modal/delete-modal.module';
// import { PopupModalComponent } from '../../shared_components/popup-modal/popup-modal.component';
// import { RegisterComponent } from './register/register.component';
// import { ResetPasswordPageComponent } from './reset-password-page/reset-password-page.component';
// import { ResetPasswordComponent } from './reset-password/reset-password.component';
@NgModule({
  imports: [
    NgZorroAntdModule.forRoot(),
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    OpdTypesRoutingModule,
    AlertModalModule,
    NgPipesModule,
    DeleteModalModule
  ],
  declarations: [OpdTypesComponent],
  entryComponents: [],
  providers: [AlertModalComponent]
})
export class OpdTypesModule { }

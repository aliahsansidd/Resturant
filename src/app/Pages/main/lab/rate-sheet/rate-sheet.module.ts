import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgPipesModule } from 'ngx-pipes';
import { DeleteModalModule } from '../../../../CommonComponents/CommonModals/delete-modal/delete-modal.module';
import { RateSheetRoutingModule } from './rate-sheet.routing';
import { RateSheetComponent } from './rate-sheet.component';
import { NgZorroAntdModule } from 'ng-zorro-antd';
// import { PopupModalComponent } from '../../shared_components/popup-modal/popup-modal.component';
// import { RegisterComponent } from './register/register.component';
// import { ResetPasswordPageComponent } from './reset-password-page/reset-password-page.component';
// import { ResetPasswordComponent } from './reset-password/reset-password.component';
@NgModule({
  imports: [
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    RateSheetRoutingModule,
    NgPipesModule,
    NgZorroAntdModule.forRoot(),
    DeleteModalModule
  ],
  declarations: [RateSheetComponent],
  entryComponents: [],
  providers: []
})
export class RateSheetModule { }

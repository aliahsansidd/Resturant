import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RegisterSummaryComponent } from './registersummary.component';
import { RegisterSummaryRoutingModule } from './registersummary.routing';
import { NgxBarcodeModule } from 'ngx-barcode';
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
    RegisterSummaryRoutingModule,
    NgxBarcodeModule,
    NgZorroAntdModule.forRoot()
  ],
  declarations: [RegisterSummaryComponent],
  entryComponents: [],
  providers: []
})
export class RegisterSummaryModule { }

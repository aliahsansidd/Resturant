import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ChildRegistrationRoutingModule } from './child-registration.routing';
import { ChildRegistrationComponent } from './child-registration.component';
import { BirthCertificateModule } from '../birth-certificate/birth-certificate.module';
import { SearchFieldModule } from '../../../../CommonComponents/search-field/search-field.module';
import { NgZorroAntdModule } from 'ng-zorro-antd';
// import { PopupModalComponent } from '../../shared_components/popup-modal/popup-modal.component';
// import { RegisterComponent } from './register/register.component';
// import { ResetPasswordPageComponent } from './reset-password-page/reset-password-page.component';
// import { ResetPasswordComponent } from './reset-password/reset-password.component';
@NgModule({
  imports: [
    NgZorroAntdModule.forRoot(),
    SearchFieldModule,
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    ChildRegistrationRoutingModule,
    BirthCertificateModule,
  ],
  declarations: [ChildRegistrationComponent],
  entryComponents: [],
  exports: [ChildRegistrationComponent],
  providers: []
})
export class ChildRegistrationModule { }

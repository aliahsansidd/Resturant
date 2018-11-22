import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DeathRegistrationRoutingModule } from './death-registration.routing';
import { DeathRegistrationComponent } from './death-registration.component';
import { BirthCertificateModule } from '../birth-certificate/birth-certificate.module';
import { SearchFieldModule } from 'app/CommonComponents/search-field/search-field.module';
import { NgZorroAntdModule } from 'ng-zorro-antd';
import { DeathCertificateModule } from './death-certificate/death-certificate.module';
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
    DeathRegistrationRoutingModule,
    DeathCertificateModule,
  ],
  declarations: [DeathRegistrationComponent],
  entryComponents: [],
  exports: [DeathRegistrationComponent],
  providers: []
})
export class DeathRegistrationModule { }

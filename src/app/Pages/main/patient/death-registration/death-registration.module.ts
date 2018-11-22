import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DeathRegistrationComponent } from './death-registration.component';
import { DeathRegistrationRoutingModule } from './death-registration.routing';

import { NgHttpLoaderModule } from 'ng-http-loader';
import { HttpClientModule } from '@angular/common/http';

// import { PopupModalComponent } from '../../shared_components/popup-modal/popup-modal.component';
// import { RegisterComponent } from './register/register.component';
// import { ResetPasswordPageComponent } from './reset-password-page/reset-password-page.component';
// import { ResetPasswordComponent } from './reset-password/reset-password.component';
@NgModule({
  imports: [
    DeathRegistrationRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    // HttpClientModule,
    // NgHttpLoaderModule
  ],
  declarations: [DeathRegistrationComponent],
  entryComponents: [],
  providers: []
})
export class DeathModule { }

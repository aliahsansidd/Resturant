import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ServicesComponent } from './services.component';
import { ServicesRoutingModule } from './services.routing';
import { BsDatepickerModule } from 'ngx-bootstrap';
import { NgXBootstrapModule } from '../../../../BootstrapModules/NgxBootstrapServices.service';
// import { PopupModalComponent } from '../../shared_components/popup-modal/popup-modal.component';
// import { RegisterComponent } from './register/register.component';
// import { ResetPasswordPageComponent } from './reset-password-page/reset-password-page.component';
// import { ResetPasswordComponent } from './reset-password/reset-password.component';
@NgModule({
  imports: [
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    ServicesRoutingModule,
    BsDatepickerModule,
    NgXBootstrapModule,
  ],
  declarations: [ServicesComponent],
  entryComponents: [],
  providers: []
})
export class ServicesModule { }

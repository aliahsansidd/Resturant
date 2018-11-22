import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AddServicesRoutingModule } from './add-services.routing';
import { AddServicesComponent } from './add-services.component';
import { NgSelectModule } from '@ng-select/ng-select';
import { BsDatepickerModule } from 'ngx-bootstrap';
import { NgXBootstrapModule } from '../../../../../BootstrapModules/NgxBootstrapServices.service';

// import { PopupModalComponent } from '../../shared_components/popup-modal/popup-modal.component';
// import { RegisterComponent } from './register/register.component';
// import { ResetPasswordPageComponent } from './reset-password-page/reset-password-page.component';
// import { ResetPasswordComponent } from './reset-password/reset-password.component';
@NgModule({
  imports: [
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    AddServicesRoutingModule,
    NgSelectModule,
    NgXBootstrapModule,
    BsDatepickerModule.forRoot()
  ],
  declarations: [AddServicesComponent],
  entryComponents: [],
  providers: []
})
export class AddServicesModule { }

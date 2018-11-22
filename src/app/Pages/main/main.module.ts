import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MainComponent } from './main.component';
import { MainRoutingModule } from './main.routing';
import { SidebarComponent, TopNavComponent } from '../../CommonComponents';
// import { BirthCertificateComponent } from '../../Reports/birth-certificate/birth-certificate.component';
import { BsDatepickerModule } from 'ngx-bootstrap';
import { NgZorroAntdModule } from 'ng-zorro-antd';
import { NgXBootstrapModule } from '../../BootstrapModules/NgxBootstrapServices.service';
import { AmbulanceManagementComponent } from './ambulance-management/ambulance-management.component';
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
    MainRoutingModule,
    BsDatepickerModule,
    NgXBootstrapModule,
  ],
  declarations: [MainComponent, TopNavComponent, SidebarComponent ],
  entryComponents: [],
  providers: []
})
export class MainModule { }

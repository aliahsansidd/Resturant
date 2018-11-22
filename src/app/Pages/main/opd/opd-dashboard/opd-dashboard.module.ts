import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { OpdDashboardComponent } from './opd-dashboard.component';
import { OpdDashboardRoutingModule } from './opd-dashboard.routing';
import { ChartsModule } from 'ng2-charts';
// import { PopupModalComponent } from '../../shared_components/popup-modal/popup-modal.component';
// import { RegisterComponent } from './register/register.component';
// import { ResetPasswordPageComponent } from './reset-password-page/reset-password-page.component';
// import { ResetPasswordComponent } from './reset-password/reset-password.component';
@NgModule({
  imports: [
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    OpdDashboardRoutingModule,
    ChartsModule
  ],
  declarations: [OpdDashboardComponent],
  entryComponents: [],
  providers: []
})
export class OpdDashboardModule { }

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BedAllocationTimeComponent } from './bed-allocation-time.component';
import { BedAllocationTimeRoutingModule } from './bed-allocation-time.routing';
// import { PopupModalComponent } from '../../shared_components/popup-modal/popup-modal.component';
// import { RegisterComponent } from './register/register.component';
// import { ResetPasswordPageComponent } from './reset-password-page/reset-password-page.component';
// import { ResetPasswordComponent } from './reset-password/reset-password.component';
@NgModule({
  imports: [
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    BedAllocationTimeRoutingModule
  ],
  declarations: [BedAllocationTimeComponent],
  entryComponents: [],
  providers: []
})
export class BedAllocationTimeModule { }

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CatastrophicEventComponent } from './catastrophic-event.component';
import { CatastrophicEventRoutingModule } from './catastrophic-event.routing';

// import { PopupModalComponent } from '../../shared_components/popup-modal/popup-modal.component';
// import { RegisterComponent } from './register/register.component';
// import { ResetPasswordPageComponent } from './reset-password-page/reset-password-page.component';
// import { ResetPasswordComponent } from './reset-password/reset-password.component';
@NgModule({
  imports: [
    CatastrophicEventRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    CommonModule
  ],
  declarations: [CatastrophicEventComponent],
  entryComponents: [],
  providers: []
})
export class CatastrophicEventModule { }

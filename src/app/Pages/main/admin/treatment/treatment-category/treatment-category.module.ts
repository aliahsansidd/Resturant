import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TreatementCategoryComponent } from './treatment-category.component';
import { TreatmentCategoryRoutingModule } from './treatment-category.routing';
// import { PopupModalComponent } from '../../shared_components/popup-modal/popup-modal.component';
// import { RegisterComponent } from './register/register.component';
// import { ResetPasswordPageComponent } from './reset-password-page/reset-password-page.component';
// import { ResetPasswordComponent } from './reset-password/reset-password.component';
@NgModule({
  imports: [
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    TreatmentCategoryRoutingModule
  ],
  declarations: [TreatementCategoryComponent],
  entryComponents: [],
  providers: []
})
export class TreatmentCategoryModule { }

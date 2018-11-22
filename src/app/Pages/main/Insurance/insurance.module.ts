import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InsuranceComponent } from './insurance.component';
import {  InsuranceRoutingModule } from './insurance.routing';
import { ClientTypeComponent } from './client-type/client-type.component';
import { InsuranceCompaniesComponent } from './insurance-companies/insurance-companies.component';
import { CPTCategoryComponent } from './cptcategory/cptcategory.component';
import { GroupOfCompaniesComponent } from './group-of-companies/group-of-companies.component';
import { DeleteModalModule } from '../../../CommonComponents/CommonModals/delete-modal/delete-modal.module';


// import { PopupModalComponent } from '../../shared_components/popup-modal/popup-modal.component';
// import { RegisterComponent } from './register/register.component';
// import { ResetPasswordPageComponent } from './reset-password-page/reset-password-page.component';
// import { ResetPasswordComponent } from './reset-password/reset-password.component';
@NgModule({
  imports: [
    InsuranceRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    CommonModule

  ],
  declarations: [InsuranceComponent],
  entryComponents: [],
  providers: []
})
export class InsuranceModule { }

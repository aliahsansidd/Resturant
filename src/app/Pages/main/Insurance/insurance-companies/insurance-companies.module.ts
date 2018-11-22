import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DeleteModalModule } from '../../../../CommonComponents/CommonModals/delete-modal/delete-modal.module';
import { NgPipesModule } from 'ngx-pipes';
import { InsuranceCompaniesComponent } from './insurance-companies.component';
import { InsuranceCompaniesRoutingModule } from './insurance-companies.routing';
// import { PopupModalComponent } from '../../shared_components/popup-modal/popup-modal.component';
// import { RegisterComponent } from './register/register.component';
// import { ResetPasswordPageComponent } from './reset-password-page/reset-password-page.component';
// import { ResetPasswordComponent } from './reset-password/reset-password.component';
@NgModule({
  imports: [
    FormsModule,
    CommonModule,
    InsuranceCompaniesRoutingModule,
    DeleteModalModule,
    NgPipesModule
  ],
  declarations: [InsuranceCompaniesComponent],
  entryComponents: [],
  providers: []
})
export class InsuranceCompaniesModule { }

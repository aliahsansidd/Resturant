import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {NgPipesModule} from 'ngx-pipes';
import { DeleteModalComponent } from '../../../../CommonComponents/CommonModals/delete-modal/delete-modal.component';
import { DeleteModalModule } from '../../../../CommonComponents/CommonModals/delete-modal/delete-modal.module';
import { DatepickerModule } from 'ngx-bootstrap';
import { IncomeSetupComponent } from './income-setup.component';
import { IncomeSetupRoutingModule } from './income-setup.routing';
// import { PopupModalComponent } from '../../shared_components/popup-modal/popup-modal.component';
// import { RegisterComponent } from './register/register.component';
// import { ResetPasswordPageComponent } from './reset-password-page/reset-password-page.component';
// import { ResetPasswordComponent } from './reset-password/reset-password.component';
@NgModule({
  imports: [
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    IncomeSetupRoutingModule,
    NgPipesModule,
    DeleteModalModule,
    DatepickerModule.forRoot()
  ],
  declarations: [IncomeSetupComponent],
  entryComponents: [],
  providers: []
})
export class IncomeSetupModule { }

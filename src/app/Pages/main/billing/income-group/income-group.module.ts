import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IncomeGroupComponent } from './income-group.component';
import { IncomeGroupRoutingModule } from './income-group.routing';
import { DeleteModalModule } from '../../../../CommonComponents/CommonModals/delete-modal/delete-modal.module';
import { NgSelectModule } from '@ng-select/ng-select';
import { NgPipesModule } from 'ngx-pipes';
// import { PopupModalComponent } from '../../shared_components/popup-modal/popup-modal.component';
// import { RegisterComponent } from './register/register.component';
// import { ResetPasswordPageComponent } from './reset-password-page/reset-password-page.component';
// import { ResetPasswordComponent } from './reset-password/reset-password.component';
@NgModule({
  imports: [
    IncomeGroupRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    DeleteModalModule,
    NgSelectModule,
    NgPipesModule,

  ],
  declarations: [IncomeGroupComponent],
  entryComponents: [],
  providers: []
})
export class IncomeGroupModule { }
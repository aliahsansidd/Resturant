import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { WardCategoryComponent } from './ward-category.component';
import { WardCategoryRoutingModule } from './ward-category.routing';
import { DeleteModalComponent } from '../../../../CommonComponents/CommonModals/delete-modal/delete-modal.component';
import { DeleteModalModule } from '../../../../CommonComponents/CommonModals/delete-modal/delete-modal.module';
import { NgPipesModule } from 'ngx-pipes';
import { BsDatepickerModule } from '../../../../../../node_modules/ngx-bootstrap';
// import { PopupModalComponent } from '../../shared_components/popup-modal/popup-modal.component';
// import { RegisterComponent } from './register/register.component';
// import { ResetPasswordPageComponent } from './reset-password-page/reset-password-page.component';
// import { ResetPasswordComponent } from './reset-password/reset-password.component';
@NgModule({
  imports: [
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    WardCategoryRoutingModule,
    DeleteModalModule,
    BsDatepickerModule.forRoot(),
    NgPipesModule
  ],
  declarations: [WardCategoryComponent],
  entryComponents: [],
  providers: []
})
export class WardCategoryModule { }

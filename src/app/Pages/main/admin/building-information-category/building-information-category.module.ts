import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BuildingInformationCategoryRoutingModule } from './building-information-category.routing';
import { BuildingInformationCategoryComponent } from './building-information-category.component';
import { BsDatepickerModule } from 'ngx-bootstrap';
import { DeleteModalModule } from '../../../../CommonComponents/CommonModals/delete-modal/delete-modal.module';
import { NgPipesModule } from 'ngx-pipes';
import { NgZorroAntdModule } from 'ng-zorro-antd';
// import { PopupModalComponent } from '../../shared_components/popup-modal/popup-modal.component';
// import { RegisterComponent } from './register/register.component';
// import { ResetPasswordPageComponent } from './reset-password-page/reset-password-page.component';
// import { ResetPasswordComponent } from './reset-password/reset-password.component';
@NgModule({
  imports: [
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    BsDatepickerModule.forRoot(),
    BuildingInformationCategoryRoutingModule,
    NgZorroAntdModule.forRoot(),
    DeleteModalModule,
    NgPipesModule
  ],
  declarations: [BuildingInformationCategoryComponent],
  entryComponents: [],
  providers: []
})
export class BuildingInformationCategoryModule { }

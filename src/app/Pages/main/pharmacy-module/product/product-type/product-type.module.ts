import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DeleteModalModule } from '../../../../../CommonComponents/CommonModals/delete-modal/delete-modal.module';
import { NgPipesModule } from 'ngx-pipes';
import { ProductTypeComponent } from './product-type.component';
import { ProductTypeRoutingModule } from './product-type.routing';


// import { PopupModalComponent } from '../../shared_components/popup-modal/popup-modal.component';
// import { RegisterComponent } from './register/register.component';
// import { ResetPasswordPageComponent } from './reset-password-page/reset-password-page.component';
// import { ResetPasswordComponent } from './reset-password/reset-password.component';
@NgModule({
  imports: [
    ProductTypeRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    DeleteModalModule,
    NgPipesModule

  ],
  declarations: [ProductTypeComponent],
  entryComponents: [],
  providers: []
})
export class ProductTypeModule { }

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DeleteModalModule } from '../../../../../CommonComponents/CommonModals/delete-modal/delete-modal.module';
import { NgPipesModule } from 'ngx-pipes';
import { UnitOfMeasurementComponent } from './unit-of-measurement.component';
import { UnitOfMeasurementRoutingModule } from './unit-of-measurement.routing';


// import { PopupModalComponent } from '../../shared_components/popup-modal/popup-modal.component';
// import { RegisterComponent } from './register/register.component';
// import { ResetPasswordPageComponent } from './reset-password-page/reset-password-page.component';
// import { ResetPasswordComponent } from './reset-password/reset-password.component';
@NgModule({
  imports: [
    UnitOfMeasurementRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    DeleteModalModule,
    NgPipesModule

  ],
  declarations: [UnitOfMeasurementComponent],
  entryComponents: [],
  providers: []
})
export class UnitOfMeasurementModule { }

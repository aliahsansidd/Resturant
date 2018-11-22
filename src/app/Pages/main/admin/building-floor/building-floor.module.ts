import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BuildingFloorComponent } from './building-floor.component';
import { BuildingFloorRoutingModule } from './building-floor.routing';
import { NgPipesModule } from 'ngx-pipes';
import { DeleteModalModule } from 'app/CommonComponents/CommonModals/delete-modal/delete-modal.module';
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
    BuildingFloorRoutingModule,
    NgPipesModule,
    DeleteModalModule,
    BsDatepickerModule.forRoot(),
  ],
  declarations: [BuildingFloorComponent],
  entryComponents: [],
  providers: []
})
export class BuildingFloorModule { }

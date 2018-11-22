import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DeathRegistrationViewRoutingModule } from './death-registration-view.routing';
import { DeathRegistrationViewComponent } from './death-registration-view.component';
import { SearchFieldModule } from 'app/CommonComponents/search-field/search-field.module';
import { NgZorroAntdModule } from 'ng-zorro-antd';
import { NgPipesModule } from 'ngx-pipes';
import { DeleteModalModule } from 'app/CommonComponents/CommonModals/delete-modal/delete-modal.module';
import { BsDatepickerModule } from 'ngx-bootstrap';
// import { PopupModalComponent } from '../../shared_components/popup-modal/popup-modal.component';
// import { RegisterComponent } from './register/register.component';
// import { ResetPasswordPageComponent } from './reset-password-page/reset-password-page.component';
// import { ResetPasswordComponent } from './reset-password/reset-password.component';
@NgModule({
    imports: [
        NgZorroAntdModule.forRoot(),
        SearchFieldModule,
        FormsModule,
        ReactiveFormsModule,
        CommonModule,
        DeleteModalModule,
        NgPipesModule,
        DeathRegistrationViewRoutingModule,
        BsDatepickerModule.forRoot(),
    ],
    declarations: [DeathRegistrationViewComponent],
    entryComponents: [],
    providers: []
})
export class DeathRegistrationViewModule { }

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DeleteModalModule } from '../../../../CommonComponents/CommonModals/delete-modal/delete-modal.module';
import { NgPipesModule } from 'ngx-pipes';
import { BuildTestRoutingModule } from './build-test.routing';
import { BuildTestComponent } from './build-test.component';
import { NgZorroAntdModule } from 'ng-zorro-antd';
import { FroalaEditorModule, FroalaViewModule } from 'angular-froala-wysiwyg';
import { NgSelectModule } from '@ng-select/ng-select';
// import { PopupModalComponent } from '../../shared_components/popup-modal/popup-modal.component';
// import { RegisterComponent } from './register/register.component';
// import { ResetPasswordPageComponent } from './reset-password-page/reset-password-page.component';
// import { ResetPasswordComponent } from './reset-password/reset-password.component';
@NgModule({
  imports: [
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    BuildTestRoutingModule,
    DeleteModalModule,
    NgPipesModule,
    NgZorroAntdModule.forRoot(),
    FroalaEditorModule.forRoot(),
    FroalaViewModule.forRoot(),
    NgSelectModule
  ],
  declarations: [BuildTestComponent],
  entryComponents: [],
  providers: []
})
export class BuildTestModule { }

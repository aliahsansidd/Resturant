import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DeleteModalModule } from '../../../../CommonComponents/CommonModals/delete-modal/delete-modal.module';
import { NgPipesModule } from 'ngx-pipes';
import { TemplateOrValueRoutingModule } from './templateOrValue.routing';
import { TemplateOrValueComponent } from './templateOrValue.component';
import { NgZorroAntdModule } from 'ng-zorro-antd';
import { FroalaEditorModule, FroalaViewModule } from 'angular-froala-wysiwyg';
// import { PopupModalComponent } from '../../shared_components/popup-modal/popup-modal.component';
// import { RegisterComponent } from './register/register.component';
// import { ResetPasswordPageComponent } from './reset-password-page/reset-password-page.component';
// import { ResetPasswordComponent } from './reset-password/reset-password.component';
@NgModule({
  imports: [
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    TemplateOrValueRoutingModule,
    DeleteModalModule,
    NgPipesModule,
    NgZorroAntdModule.forRoot(),
    FroalaEditorModule.forRoot(),
    FroalaViewModule.forRoot()
  ],
  declarations: [TemplateOrValueComponent],
  entryComponents: [],
  providers: []
})
export class TemplateOrValueModule { }

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DeleteModalModule } from '../../../../CommonComponents/CommonModals/delete-modal/delete-modal.module';
import { NgPipesModule } from 'ngx-pipes';
import { NgZorroAntdModule } from 'ng-zorro-antd';
import { FroalaEditorModule, FroalaViewModule } from 'angular-froala-wysiwyg';
import { SampleTypeComponent } from './sample-type.component';
import { SampleTypetRoutingModule } from './sample-type.routing';
import { ColorPickerModule } from 'ngx-color-picker';
// import { PopupModalComponent } from '../../shared_components/popup-modal/popup-modal.component';
// import { RegisterComponent } from './register/register.component';
// import { ResetPasswordPageComponent } from './reset-password-page/reset-password-page.component';
// import { ResetPasswordComponent } from './reset-password/reset-password.component';
@NgModule({
  imports: [
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    SampleTypetRoutingModule,
    DeleteModalModule,
    NgPipesModule,
    NgZorroAntdModule.forRoot(),
    FroalaEditorModule.forRoot(),
    FroalaViewModule.forRoot(),
    ColorPickerModule
  ],
  declarations: [SampleTypeComponent],
  entryComponents: [],
  providers: []
})
export class SampleTypeModule { }

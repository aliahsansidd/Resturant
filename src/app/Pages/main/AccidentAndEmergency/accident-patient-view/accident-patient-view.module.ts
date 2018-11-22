import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AccidentPatientViewRoutingModule } from './accident-patient-view.routing';
import { AccidentPatientViewComponent } from './accident-patient-view.component';
import { DeleteModalModule } from '../../../../CommonComponents/CommonModals/delete-modal/delete-modal.module';
import { NgPipesModule } from 'ngx-pipes';
import { NgZorroAntdModule } from 'ng-zorro-antd';
import { FroalaEditorModule, FroalaViewModule } from 'angular-froala-wysiwyg';


@NgModule({
  imports: [
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    AccidentPatientViewRoutingModule,
    DeleteModalModule,
    NgZorroAntdModule.forRoot(),
    NgPipesModule,
    FroalaEditorModule.forRoot(),
    FroalaViewModule.forRoot()
  ],
  declarations: [AccidentPatientViewComponent],
  entryComponents: [],
  providers: []
})
export class AccidentPatientViewModule { }

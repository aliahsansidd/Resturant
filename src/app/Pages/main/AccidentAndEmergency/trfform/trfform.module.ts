import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TRFRoutingModule } from './trfform.routing';
import { TRFFormComponent } from './trfform.component';
import { DeleteModalModule } from '../../../../CommonComponents/CommonModals/delete-modal/delete-modal.module';
import { NgPipesModule } from 'ngx-pipes';
import { EssenceNg2PrintModule} from 'essence-ng2-print';
import { NgZorroAntdModule } from 'ng-zorro-antd';
import { SearchFieldModule } from 'app/CommonComponents/search-field/search-field.module';
@NgModule({
  imports: [
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    TRFRoutingModule,
    DeleteModalModule,
    NgPipesModule,
    NgZorroAntdModule.forRoot(),
    SearchFieldModule,
    EssenceNg2PrintModule
  ],
  declarations: [TRFFormComponent],
  entryComponents: [],
  providers: []
})
export class TRFModule { }

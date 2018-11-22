import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DeleteModalModule } from '../../../../../CommonComponents/CommonModals/delete-modal/delete-modal.module';
import { NgPipesModule } from 'ngx-pipes';
import { AddProductComponent } from './add-product.component';
import { AddProductRoutingModule } from './add-product.routing';
import { NgZorroAntdModule } from '../../../../../../../node_modules/ng-zorro-antd';
import { BsDatepickerModule } from '../../../../../../../node_modules/ngx-bootstrap';
@NgModule({
  imports: [
    AddProductRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    DeleteModalModule,
    NgPipesModule,
    NgZorroAntdModule.forRoot(),
    BsDatepickerModule.forRoot()

  ],
  declarations: [AddProductComponent],
  entryComponents: [],
  providers: []
})
export class AddProductModule { }

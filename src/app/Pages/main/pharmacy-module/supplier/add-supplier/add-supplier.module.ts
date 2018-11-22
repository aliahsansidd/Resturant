import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DeleteModalModule } from '../../../../../CommonComponents/CommonModals/delete-modal/delete-modal.module';
import { NgPipesModule } from 'ngx-pipes';
import { AddSupplierComponent } from './add-supplier.component';
import { AddSupplierRoutingModule } from './add-supplier.routing';
@NgModule({
  imports: [
    AddSupplierRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    DeleteModalModule,
    NgPipesModule

  ],
  declarations: [AddSupplierComponent],
  entryComponents: [],
  providers: []
})
export class AddSupplierModule { }

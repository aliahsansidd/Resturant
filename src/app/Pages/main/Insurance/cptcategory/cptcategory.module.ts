import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DeleteModalModule } from '../../../../CommonComponents/CommonModals/delete-modal/delete-modal.module';
import { NgPipesModule } from 'ngx-pipes';
import { CPTCategoryComponent } from './cptcategory.component';
import { CPTCategoryRoutingModule } from './cptcategory.routing';
@NgModule({
  imports: [
    FormsModule,
    CommonModule,
    CPTCategoryRoutingModule,
    DeleteModalModule,
    NgPipesModule
  ],
  declarations: [CPTCategoryComponent],
  entryComponents: [],
  providers: []
})
export class CPTCategoryModule { }

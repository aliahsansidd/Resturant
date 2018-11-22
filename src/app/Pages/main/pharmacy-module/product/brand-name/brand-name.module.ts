import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DeleteModalModule } from '../../../../../CommonComponents/CommonModals/delete-modal/delete-modal.module';
import { NgPipesModule } from 'ngx-pipes';
import { BrandNameRoutingModule } from './brand-name.routing';
import { BrandNameComponent } from './brand-name.component';
@NgModule({
  imports: [
    BrandNameRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    DeleteModalModule,
    NgPipesModule

  ],
  declarations: [BrandNameComponent],
  entryComponents: [],
  providers: []
})
export class BrandNameModule { }

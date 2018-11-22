import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DeleteModalModule } from '../../../../CommonComponents/CommonModals/delete-modal/delete-modal.module';
import { NgPipesModule } from 'ngx-pipes';
import { GroupOfCompaniesComponent } from './group-of-companies.component';
import { GroupOfCompaniesRoutingModule } from './group-of-companies.routing';
@NgModule({
  imports: [
    FormsModule,
    CommonModule,
    GroupOfCompaniesRoutingModule,
    DeleteModalModule,
    NgPipesModule
  ],
  declarations: [GroupOfCompaniesComponent],
  entryComponents: [],
  providers: []
})
export class GroupOfCompaniesModule { }

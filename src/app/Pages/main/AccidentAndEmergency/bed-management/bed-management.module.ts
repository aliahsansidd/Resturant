import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BedManagementRoutingModule } from './bed-management.routing';
import { BedManagementComponent } from './bed-management.component';
import { DeleteModalModule } from '../../../../CommonComponents/CommonModals/delete-modal/delete-modal.module';
import { NgPipesModule } from 'ngx-pipes';
import { BedPipe } from 'app/Pipes/BedPipes';
import { NgZorroAntdModule } from 'ng-zorro-antd';
import { SearchFieldModule } from 'app/CommonComponents/search-field/search-field.module';

@NgModule({
  imports: [
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    BedManagementRoutingModule,
    DeleteModalModule,
    NgPipesModule,
    NgZorroAntdModule.forRoot(),
    SearchFieldModule,
  ],
  declarations: [BedManagementComponent,
    BedPipe],
  entryComponents: [],
  providers: []
})
export class BedManagementModule { }

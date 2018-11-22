import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BirthRegistrationViewComponent } from './birth-registration-view.component';
import { BirthRegistrationViewRoutingModule } from './birth-registration-view.routing';
import { NgZorroAntdModule } from 'ng-zorro-antd';
import { NgPipesModule } from 'ngx-pipes';
import { DeleteModalModule } from 'app/CommonComponents/CommonModals/delete-modal/delete-modal.module';

@NgModule({
  imports: [
    NgZorroAntdModule.forRoot(),
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    NgPipesModule,
    DeleteModalModule,
    BirthRegistrationViewRoutingModule,
  ],
  declarations: [BirthRegistrationViewComponent],
  entryComponents: [],
  exports: [BirthRegistrationViewComponent],
  providers: []
})
export class BirthRegistrationViewModule { }

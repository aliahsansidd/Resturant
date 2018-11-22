import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgZorroAntdModule } from 'ng-zorro-antd';
import { DriverComponent } from './driver.component';
import { DriverRouting } from './driver.routing';
import { DeleteModalModule } from 'app/CommonComponents/CommonModals/delete-modal/delete-modal.module';
import { NgPipesModule } from 'ngx-pipes';

@NgModule({
  imports: [
    DriverRouting,
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    NgZorroAntdModule,
    NgPipesModule,
    DeleteModalModule,

  ],
  declarations: [ DriverComponent],
  entryComponents: [],
  providers: []
})
export class DriverModule { }

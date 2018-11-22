import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgZorroAntdModule } from 'ng-zorro-antd';
import { AmbulanceComponent } from './ambulance.component';
import { AmbulanceRouting } from './ambulance.routing';
import { DeleteModalModule } from 'app/CommonComponents/CommonModals/delete-modal/delete-modal.module';
import { NgPipesModule } from 'ngx-pipes';

@NgModule({
  imports: [
    AmbulanceRouting,
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    NgZorroAntdModule,
    NgPipesModule,
    DeleteModalModule,

  ],
  declarations: [ AmbulanceComponent],
  entryComponents: [],
  providers: []
})
export class AmbulanceModule { }

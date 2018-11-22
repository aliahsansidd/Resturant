import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AmbulanceManagementRouting } from './ambulance-management.routing';
import { AmbulanceManagementComponent } from './ambulance-management.component';
import { NgZorroAntdModule } from 'ng-zorro-antd';
import { AmbulanceComponent } from './ambulance/ambulance.component';

@NgModule({
  imports: [
    AmbulanceManagementRouting,
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    NgZorroAntdModule

  ],
  declarations: [AmbulanceManagementComponent],
  entryComponents: [],
  providers: []
})
export class AmbulanceManagementModule { }

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AccidentAndEmergencyComponent } from './accident-and-emergency.component';
import { AccidentAndEmergencyRouting } from './accident-and-emergency.routing';
import { BedManagementComponent } from './bed-management/bed-management.component';
@NgModule({
  imports: [
    AccidentAndEmergencyRouting ,
    FormsModule,
    ReactiveFormsModule,
    CommonModule,

  ],
  declarations: [AccidentAndEmergencyComponent],
  entryComponents: [],
  providers: []
})
export class AccidentAndEmergencyModule { }

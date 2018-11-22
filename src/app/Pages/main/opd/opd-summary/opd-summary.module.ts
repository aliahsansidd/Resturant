import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { OpdSummaryComponent } from './opd-summary.component';
import { OpdSummaryRoutingModule } from './opd-summary.routing';

@NgModule({
  imports: [
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    OpdSummaryRoutingModule
  ],
  declarations: [OpdSummaryComponent],
  entryComponents: [],
  providers: []
})
export class OpdSummaryModule { }

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SupplierPaymentReportComponent } from './supplier-payment-report.component';
import { SupplierPaymentReportRoutingModule } from './supplier-payment-report.routing';
@NgModule({
  imports: [
    SupplierPaymentReportRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    CommonModule,

  ],
  declarations: [SupplierPaymentReportComponent],
  entryComponents: [],
  providers: []
})
export class SupplierPaymentReportModule { }

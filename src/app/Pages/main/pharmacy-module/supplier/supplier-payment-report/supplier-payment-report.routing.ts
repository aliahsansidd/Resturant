import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SupplierPaymentReportComponent } from './supplier-payment-report.component';

const routes: Routes = [
  {
    path: '',
    component: SupplierPaymentReportComponent,
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SupplierPaymentReportRoutingModule { }

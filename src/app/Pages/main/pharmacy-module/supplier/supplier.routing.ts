import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SupplierComponent } from './supplier.component';

const routes: Routes = [
  {
    path: '',
    component: SupplierComponent,
    children: [
      {
        path: 'add-supplier',
        loadChildren: 'app/Pages/main/pharmacy-module/supplier/add-supplier/add-supplier.module#AddSupplierModule',
        data: { title: 'BluePulse | add-supplier' }
      },
      {
        path: 'supplier-payment-report',
        // tslint:disable-next-line:max-line-length
        loadChildren: 'app/Pages/main/pharmacy-module/supplier/supplier-payment-report/supplier-payment-report.module#SupplierPaymentReportModule',
        data: { title: 'BluePulse | add-supplier' }
      },
    ]
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SupplierRoutingModule { }














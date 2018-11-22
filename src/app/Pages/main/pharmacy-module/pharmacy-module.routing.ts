import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PharmacyModuleComponent } from './pharmacy-module.component';

const routes: Routes = [
  {
    path: '',
    component: PharmacyModuleComponent,
    children: [
      {
        path: 'product',
        loadChildren: 'app/Pages/main/pharmacy-module/product/product.module#ProductModule',
        data: { title: 'BluePulse | Product' }
      },
      {
        path: 'supplier',
        loadChildren: 'app/Pages/main/pharmacy-module/supplier/supplier.module#SupplierModule',
        data: { title: 'BluePulse | supplier' }
      },
      {
        path: 'purchase',
        loadChildren: 'app/Pages/main/pharmacy-module/purchase/purchase.module#PurchaseModule',
        data: { title: 'BluePulse | supplier' }
      }
    ]
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PharmacyRoutingModule { }

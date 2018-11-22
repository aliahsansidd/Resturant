import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PurchaseComponent } from './purchase.component';

const routes: Routes = [
  {
    path: '',
    component: PurchaseComponent,
    children: [
      {
        path: 'add-supplier',
        loadChildren: 'app/Pages/main/pharmacy-module/supplier/add-supplier/add-supplier.module#AddSupplierModule',
        data: { title: 'BluePulse | add-supplier' }
      },
    ]
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PurchaseRoutingModule { }














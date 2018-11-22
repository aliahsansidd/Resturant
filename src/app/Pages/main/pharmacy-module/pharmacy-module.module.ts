import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PharmacyModuleComponent } from './pharmacy-module.component';
import { PharmacyRoutingModule } from './pharmacy-module.routing';
import { SupplierComponent } from './supplier/supplier.component';
import { PurchaseComponent } from './purchase/purchase.component';
import { CustomerComponent } from './customer/customer.component';

@NgModule({
  imports: [
    PharmacyRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    CommonModule,

  ],
  declarations: [PharmacyModuleComponent],
  entryComponents: [],
  providers: []
})
export class PharmacyModule { }

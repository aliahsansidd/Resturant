import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SupplierComponent } from './supplier.component';
import { SupplierRoutingModule } from './supplier.routing';
@NgModule({
  imports: [
    SupplierRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    CommonModule,

  ],
  declarations: [SupplierComponent],
  entryComponents: [],
  providers: []
})
export class SupplierModule { }

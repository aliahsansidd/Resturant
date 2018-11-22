import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ProductComponent } from './product.component';
import { ProductRoutingModule } from './product.routing';
@NgModule({
  imports: [
    ProductRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    CommonModule,

  ],
  declarations: [ProductComponent],
  entryComponents: [],
  providers: []
})
export class ProductModule { }

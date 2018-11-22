import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BillingRouting } from './billing.routing';
import { BillingComponent } from './billing.component';
import { NgZorroAntdModule } from 'ng-zorro-antd';

@NgModule({
  imports: [
    BillingRouting ,
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    NgZorroAntdModule

  ],
  declarations: [BillingComponent],
  entryComponents: [],
  providers: []
})
export class BillingModule { }

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PurchaseComponent } from './purchase.component';
import { PurchaseRoutingModule } from './purchase.routing';
import { NgZorroAntdModule } from '../../../../../../node_modules/ng-zorro-antd';
import { BsDatepickerModule } from '../../../../../../node_modules/ngx-bootstrap';
@NgModule({
  imports: [
    PurchaseRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NgZorroAntdModule.forRoot(),
    BsDatepickerModule.forRoot(),
    CommonModule,

  ],
  declarations: [PurchaseComponent],
  entryComponents: [],
  providers: []
})
export class PurchaseModule { }

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { BsDatepickerModule } from 'ngx-bootstrap';
import { NgZorroAntdModule } from 'ng-zorro-antd';
import { CoaListComponent } from './coa-list.component';
@NgModule({
  imports: [
    NgZorroAntdModule.forRoot(),
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    BsDatepickerModule.forRoot()
  ],
  declarations: [CoaListComponent],
  entryComponents: [],
  providers: []
})
export class COAListModule { }

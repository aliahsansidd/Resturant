import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ChildRoutingModule } from './child.routing';
import { ChildComponent } from './child.component';

@NgModule({
  imports: [
    ChildRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
  ],
  declarations: [ChildComponent],
  entryComponents: [],
  providers: []
})
export class ChildModule { }

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BedAllocationTimeComponent } from './bed-allocation-time.component';

const routes: Routes = [
  {
    path: '',
    component: BedAllocationTimeComponent,
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BedAllocationTimeRoutingModule { }

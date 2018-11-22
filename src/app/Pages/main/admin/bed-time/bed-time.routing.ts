import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BedTimeComponent } from './bed-time.component';

const routes: Routes = [
  {
    path: '',
    component: BedTimeComponent,
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BedTimeRoutingModule { }

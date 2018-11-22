import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OpdSummaryComponent } from './opd-summary.component';


const routes: Routes = [
  {
    path: '',
    component: OpdSummaryComponent,
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OpdSummaryRoutingModule { }

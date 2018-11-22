import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OpdDashboardComponent } from './opd-dashboard.component';


const routes: Routes = [
  {
    path: '',
    component: OpdDashboardComponent,
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OpdDashboardRoutingModule { }

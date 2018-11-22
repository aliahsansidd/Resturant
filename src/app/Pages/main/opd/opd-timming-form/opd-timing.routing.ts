import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OpdTimingFormComponent } from './opd-timming-form.component';


const routes: Routes = [
  {
    path: '',
    component: OpdTimingFormComponent,
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OpdTimingRoutingModule { }

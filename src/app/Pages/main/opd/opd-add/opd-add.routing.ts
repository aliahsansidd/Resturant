import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OPDAddComponent } from './opd-add.component';


const routes: Routes = [
  {
    path: '',
    component: OPDAddComponent,
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OpdAddRoutingModule { }

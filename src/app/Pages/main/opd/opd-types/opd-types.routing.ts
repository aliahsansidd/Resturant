import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OpdTypesComponent } from './opd-types.component';


const routes: Routes = [
  {
    path: '',
    component: OpdTypesComponent,
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OpdTypesRoutingModule { }

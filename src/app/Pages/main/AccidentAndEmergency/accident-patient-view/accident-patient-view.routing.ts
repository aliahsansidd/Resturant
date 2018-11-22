import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccidentPatientViewComponent } from './accident-patient-view.component';


const routes: Routes = [
  {
    path: '',
    component: AccidentPatientViewComponent,
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AccidentPatientViewRoutingModule { }

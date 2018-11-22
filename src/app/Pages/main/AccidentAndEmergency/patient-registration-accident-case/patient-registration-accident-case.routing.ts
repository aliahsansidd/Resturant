import { ModuleWithProviders, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PatientRegistrationAccidentCaseComponent } from './patient-registration-accident-case.component';


const routes: Routes = [
  {
    path: '',
    component: PatientRegistrationAccidentCaseComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: []
})
export class PatientRegistrationAccidentCaseComponentRoutingModule { }

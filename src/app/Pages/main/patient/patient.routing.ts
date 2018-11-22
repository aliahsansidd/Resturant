import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PatientComponent } from './patient.component';
import { PatientDashboardComponent } from './patient-dashboard/patient-dashboard.component';

// import { DoctorComponent } from './doctor.component';


export const routes: Routes = [
  {
    path: '',
    component: PatientComponent,
    children: [
      // {
      //   path: '',
      //   redirectTo: 'patient-dashboard',
      //   pathMatch: 'full'
      // },
      {
        path: 'patient-dashboard',
        loadChildren: 'app/Pages/main/patient/patient-dashboard/patient-dashboard.module#PatientDashboardModule',
        // component: PatientDashboardComponent
        // data: { title: 'BluePulse | Patient' }
      },
      {
        path: 'add-patient',
        loadChildren: 'app/Pages/main/patient/patient-registration/patient-registration.module#PatientRegistrationModule',
        // data: { title: 'BluePulse | Patient' }
      },
      {
        path: 'patient-invoice',
        loadChildren: 'app/Pages/main/patient/patient-invoice/patient-invoice.module#PatientinvoiceModule',
        // data: { title: 'BluePulse | Patient' }
      },
      {
        path: 'patient-summary',
        loadChildren: 'app/Pages/main/patient/registersummary/register-summary.module#RegisterSummaryModule',
        // data: { title: 'BluePulse | Patient' }
      },
      {
        path: 'patient-list',
        loadChildren: 'app/Pages/main/patient/patient-list/patient-list.module#PatientListModule',
        // data: { title: 'BluePulse | Patient' }
      },
      {
        path: 'catastrophic-event',
        loadChildren: 'app/Pages/main/patient/catastrophic-event/catastrophic-event.module#CatastrophicEventModule',
        // data: { title: 'BluePulse | Patient' }
      },
      {
        path: 'death-registration',
        loadChildren: 'app/Pages/main/patient/death-registration/death-registration.module#DeathModule',
        // data: { title: 'BluePulse | Patient' }
      },
    ]
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PatientRoutingModule { }

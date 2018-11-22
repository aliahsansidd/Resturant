import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccidentAndEmergencyComponent } from './accident-and-emergency.component';

const routes: Routes = [
  {
    path: '',
    component: AccidentAndEmergencyComponent,
    children: [
      {
        path: 'catastrophic-event',
        loadChildren: 'app/Pages/main/AccidentAndEmergency/catastrophic-event/catastrophic-event.module#CatastrophicEventModule',
        data: { title: 'BluePulse | Catastrophic Event' }
      }, {
        path: 'add-patient-accident',
        // tslint:disable-next-line:max-line-length
        loadChildren: 'app/Pages/main/AccidentAndEmergency/patient-registration-accident-case/patient-registration-accident.module#PatientRegistrationAccidentCaseModule',
        data: { title: 'BluePulse | Add Emergency Patient' }
      },
      {
        path: 'accident-patient-view',
        // tslint:disable-next-line:max-line-length
        loadChildren: 'app/Pages/main/AccidentAndEmergency/accident-patient-view/accident-patient-view.module#AccidentPatientViewModule',
        data: { title: 'BluePulse | Emergency Patient View' }
      },
      {
        path: 'add-patient-accident/:id',
        // tslint:disable-next-line:max-line-length
        loadChildren: 'app/Pages/main/AccidentAndEmergency/patient-registration-accident-case/patient-registration-accident.module#PatientRegistrationAccidentCaseModule',
        data: { title: 'BluePulse | Add Emergency Patient' }
      },
      {
        path: 'bed-management',
        // tslint:disable-next-line:max-line-length
        loadChildren: 'app/Pages/main/AccidentAndEmergency/bed-management/bed-management.module#BedManagementModule',
        data: { title: 'BluePulse | Bed Management' }
      },
      {
        path: 'trf-form',
        // tslint:disable-next-line:max-line-length
        loadChildren: 'app/Pages/main/AccidentAndEmergency/trfform/trfform.module#TRFModule',
        data: { title: 'BluePulse | Trf Form' }
      },
    ]
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AccidentAndEmergencyRouting { }

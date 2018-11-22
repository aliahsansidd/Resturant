import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DoctorComponent } from './doctor.component';


const routes: Routes = [
  {
    path: '',
    component: DoctorComponent,
    children: [
      {
        path: 'add-doctor',
        loadChildren: 'app/Pages/main/doctor/add-doctor/add-doctor.module#AddDoctorModule',
        data: { title: 'BluePulse | Dashboard' }
      },
      {
        path: 'appointment-registration',
        loadChildren: 'app/Pages/main/doctor/appointmentregistration/appointmentregistration.module#AppointmentRegistrationModule',
        data: { title: 'BluePulse | Dashboard' }
      },
      {
        path: 'appointment-registration-view',
        // tslint:disable-next-line:max-line-length
        loadChildren:
        'app/Pages/main/doctor/appointment-registration-view/appointment-registration-view.module#AppointmentRegistrationViewModule',
        data: { title: 'BluePulse | Dashboard' }
      },
      // {
      //   path: 'appointment-registration',
      //   loadChildren: 'app/Pages/main/doctor/appointmentregistration.module#AppointmentRegistrationModule',
      //   data: { title: 'BluePulse | Dashboard' }
      // }
      // {
      //   path: 'doctor-category',
      //   loadChildren: 'app/Pages/main/doctor/dashboard/dashboard.module#DashboardModule',
      //   data: { title: 'BluePulse | Dashboard' }
      // },
    //   {
    //     path: 'Doctor',
    //     loadChildren: 'app/Pages/main/taskboard/taskboard.module#TaskboardModule',
    //     data: { title: 'Pitchworthy | Taskboard' }
    //   },
    //   {
    //     path: 'patient',
    //     loadChildren: 'app/features/main/pitchdeck/pitchdeck.module#PitchdeckModule',
    //     data: { title: 'Pitchworthy | Pitchdeck' }
    //   },
    //   {
    //     path: 'setting',
    //     loadChildren: 'app/features/main/setting/setting.module#SettingModule',
    //     data: { title: 'Pitchworthy | Setting' }
    //   },
    //   {
    //     path: 'profile',
    //     loadChildren: 'app/features/main/profile/profile.module#ProfileModule',
    //     data: { title: 'Pitchworthy | Profile' }
    //   },
    ]
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DoctorRoutingModule { }

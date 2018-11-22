import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OpdComponent } from './opd.component';


const routes: Routes = [
  {
    path: '',
    component: OpdComponent,
    children: [
      {
        path: 'opd-dashboard',
        loadChildren: 'app/Pages/main/opd/opd-dashboard/opd-dashboard.module#OpdDashboardModule',
        data: { title: 'BluePulse | opd' }
      },
      {
        path: 'opd-registration',
        loadChildren: 'app/Pages/main/opd/opd-registration/opd-registration.module#OpdRegistrationModule',
        data: { title: 'BluePulse | opd' }
      },
      {
        path: 'opd-summary',
        loadChildren: 'app/Pages/main/opd/opd-summary/opd-summary.module#OpdSummaryModule',
        data: { title: 'BluePulse | opd' }
      },
      {
        path: 'opd-timing',
        loadChildren: 'app/Pages/main/opd/opd-timming-form/opd-timing.module#OpdTimingModule',
        data: { title: 'BluePulse | opd' }
      },
      {
        path: 'opd-add',
        loadChildren: 'app/Pages/main/opd/opd-add/opd-add.module#OpdAddModule',
        data: { title: 'BluePulse | opd' }
      },
      {
        path: 'opd-type',
        loadChildren: 'app/Pages/main/opd/opd-types/opd-types.module#OpdTypesModule',
        data: { title: 'BluePulse | opd' }
      },
      {
        path: 'opd-registration-view',
        loadChildren: 'app/Pages/main/opd/opd-registration-view/opd-registration-view.module#OpdRegistrationViewModule',
        data: { title: 'BluePulse | opd' }
      },
      {
        path: 'opd-doctor',
        loadChildren: 'app/Pages/main/opd/opd-doctor/opd-doctor.module#OpdDoctorModule',
        data: { title: 'BluePulse | opd' }
      }
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
      // {
      //   path: '',
      //   redirectTo: 'opd-dashboard',
      //   pathMatch: 'full'
      // }
    ]
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OpdRoutingModule { }

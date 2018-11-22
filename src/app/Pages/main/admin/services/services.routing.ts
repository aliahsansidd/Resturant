import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ServicesComponent } from './services.component';

const routes: Routes = [
  {
    path: '',
    component: ServicesComponent,
    children: [
      {
        path: 'add-services',
        loadChildren: 'app/Pages/main/admin/services/add-services/add-services.module#AddServicesModule',
        data: { title: 'BluePulse | Dashboard' }
      },
       {
        path: 'add-services/:id',
        loadChildren: 'app/Pages/main/admin/services/add-services/add-services.module#AddServicesModule',
        data: { title: 'BluePulse | Dashboard' }
      },
      {
        path: 'add-services-list',
        loadChildren: 'app/Pages/main/admin/services/add-services-list/add-service-list.module#AddServiceListModule',
        data: { title: 'BluePulse | Opd' }
      }
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
export class ServicesRoutingModule { }

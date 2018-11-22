import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ChildComponent } from './child.component';

const routes: Routes = [
  {
    path: '',
    component: ChildComponent,
    children: [
      {
        path: 'birth-certificate',
        loadChildren: 'app/Pages/main/child/birth-certificate/birth-certificate.module#BirthCertificateModule',
        data: { title: 'BluePulse | Add Bed' }
      },
      {
        path: 'child-register',
        loadChildren: 'app/Pages/main/child/child-registration/child-registration.module#ChildRegistrationModule',
        data: { title: 'BluePulse | Add Room' }
      },
      {
        path: 'child-register/:id',
        loadChildren: 'app/Pages/main/child/child-registration/child-registration.module#ChildRegistrationModule',
        data: { title: 'BluePulse | Add Room' }
      },
      {
        path: 'birth-registration-view',
        loadChildren: 'app/Pages/main/child/birth-registration-view/birth-registration-view.module#BirthRegistrationViewModule',
        data: { title: 'BluePulse | Add Room' }
      },
      {
        path: 'death-registration',
        loadChildren: 'app/Pages/main/child/death-registration/death-registration.module#DeathRegistrationModule',
        data: { title: 'BluePulse | Add Room' }
      },
      {
        path: 'death-registration/:id',
        loadChildren: 'app/Pages/main/child/death-registration/death-registration.module#DeathRegistrationModule',
        data: { title: 'BluePulse | Add Room' }
      },
      {
        path: 'death-registration-view',
        loadChildren: 'app/Pages/main/child/death-registration-view/death-registration-view.module#DeathRegistrationViewModule',
        data: { title: 'BluePulse | Add Room' }
      }, {
        path: 'death-certificate',
        loadChildren: 'app/Pages/main/child/death-registration/death-certificate/death-certificate.module#DeathCertificateModule',
        data: { title: 'BluePulse | Add Bed' }
      }
    ]
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ChildRoutingModule { }

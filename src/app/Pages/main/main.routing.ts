import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainComponent } from './main.component';

const routes: Routes = [
  {
    path: '',
    component: MainComponent,
    children: [
      {
        path: 'dashboard',
        loadChildren: 'app/Pages/main/dashboard/dashboard.module#DashboardModule',
        data: { title: 'BluePulse | Dashboard' }
      },
      {
        path: 'opd',
        loadChildren: 'app/Pages/main/opd/opd.module#OpdModule',
        data: { title: 'BluePulse | Opd' }
      },
      {
        path: 'doctor',
        loadChildren: 'app/Pages/main/doctor/doctor.module#DoctorModule',
        data: { title: 'BluePulse | Doctor' }
      },
      {
        path: 'patient',
        loadChildren: 'app/Pages/main/patient/patient.module#PatientModule',
        data: { title: 'BluePulse | Patient' }
      },
      {
        path: 'admin',
        loadChildren: 'app/Pages/main/admin/admin.module#AdminModule',
        data: { title: 'BluePulse | Admin' }
      },
      {
        path: 'card',
        loadChildren: 'app/Pages/main/card/card.module#CardModule',
        data: { title: 'BluePulse | Card' }
      },
      {
        path: 'user',
        loadChildren: 'app/Pages/main/user/user.module#UserModule',
        data: { title: 'BluePulse | User' }
      },
      {
        path: 'child',
        loadChildren: 'app/Pages/main/child/child.module#ChildModule',
        data: { title: 'BluePulse | User' }
      },
        {
          path: 'insurance',
          loadChildren: 'app/Pages/main/Insurance/insurance.module#InsuranceModule',
          data: { title: 'BluePulse | Insurance' }
        },
      {
        path: 'lab',
        loadChildren: 'app/Pages/main/lab/lab.module#LabModule',
        // data: { title: 'BluePulse | User' }
      },
      {
        path: 'accounts-management',
        loadChildren: 'app/Pages/main/accounts-management/accounts-management.module#AccountsManagementModule',
        data: { title: 'BluePulse | Accounts' }
      },
      {
        path: 'child',
        loadChildren: 'app/Pages/main/child/child.module#ChildModule',
        data: { title: 'BluePulse | User' }
      },
      {
        path: 'billing',
        loadChildren: 'app/Pages/main/billing/billing.module#BillingModule',
        data: { title: 'BluePulse | Billing' }
      },
      {
        path: 'accident-emergency',
        loadChildren: 'app/Pages/main/AccidentAndEmergency/accident-and-emergency.module#AccidentAndEmergencyModule',
        data: { title: 'BluePulse | Accident & Emergency' }
      },
      {
        path: 'pharmacy-module',
        loadChildren: 'app/Pages/main/pharmacy-module/pharmacy-module.module#PharmacyModule',
        data: { title: 'BluePulse | Pharmacy Module' }
      },
      {
        path: 'ambulance-management',
        loadChildren: 'app/Pages/main/ambulance-management/ambulance-management.module#AmbulanceManagementModule',
        data: { title: 'BluePulse | Ambulance Management' }
      },
      {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full'
      }
    ]
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MainRoutingModule { }

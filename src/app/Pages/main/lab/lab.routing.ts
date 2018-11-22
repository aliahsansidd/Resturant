import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LabComponent } from './lab.component';


const routes: Routes = [
  {
    path: '',
    component: LabComponent,
    children: [
      {
        path: 'lab-department',
        loadChildren: 'app/Pages/main/lab/lab-department/lab-department.module#LabDepartmentModule'
        // data: { title: 'BluePulse | Dashboard' }
      },
      {
        path: 'lab-services',
        loadChildren: 'app/Pages/main/lab/lab-services/lab-services.module#LabServicesModule',
        // data: { title: 'BluePulse | Opd' }
      },
      {
        path: 'lab-registration',
        loadChildren: 'app/Pages/main/lab/lab-registration/lab-registration.module#LabRegistrationModule',
        // data: { title: 'BluePulse | Opd' }
      },
      {
        path: 'lab-testing',
        loadChildren: 'app/Pages/main/lab/lab-testing/lab-testing.module#LabTestingModule',
        // data: { title: 'BluePulse | Opd' }
      },
      {
        path: 'build-test/:id',
        loadChildren: 'app/Pages/main/lab/build-test/build-test.module#BuildTestModule',
        // data: { title: 'BluePulse | Opd' }
      },
      {
        path: 'build-test',
        loadChildren: 'app/Pages/main/lab/build-test/build-test.module#BuildTestModule',
        // data: { title: 'BluePulse | Opd' }
      },
      {
        path: 'manage-labtest',
        loadChildren: 'app/Pages/main/lab/templateOrValue/templateOrValue.module#TemplateOrValueModule',
        // data: { title: 'BluePulse | Opd' }
      },
      {
        path: 'rate-sheet',
        loadChildren: 'app/Pages/main/lab/rate-sheet/rate-sheet.module#RateSheetModule',
        // data: { title: 'BluePulse | Opd' }
      },
      {
        path: 'sample-type',
        loadChildren: 'app/Pages/main/lab/sample-type/sample-type.module#SampleTypeModule',
        data: { title: 'BluePulse | Sample Type' }
      }
    ]
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LabRoutingModule { }

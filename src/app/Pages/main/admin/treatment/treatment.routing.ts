import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TreatmentComponent } from './treatment.component';

const routes: Routes = [
  {
    path: '',
    component: TreatmentComponent,
    children: [
      {
        path: 'treatment-service',
        loadChildren: 'app/Pages/main/admin/treatment/treatment-service/treatment-service.module#TreatmentServiceModule',
        data: { title: 'BluePulse | Dashboard' }
      },
      {
        path: 'treatment-category',
        loadChildren: 'app/Pages/main/admin/treatment/treatment-category/treatment-category.module#TreatmentCategoryModule',
        data: { title: 'BluePulse | Opd' }
      },
      {
        path: 'treatment-package',
        loadChildren: 'app/Pages/main/admin/treatment/treatment-package/treatment-package.module#TreatmentPackageModule',
        data: { title: 'BluePulse | Doctor' }
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TreatmentRoutingModule { }

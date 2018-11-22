import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InsuranceComponent } from './insurance.component';

const routes: Routes = [
  {
    path: '',
    component: InsuranceComponent,
    children: [
      {
        path: 'client-group',
        loadChildren: 'app/Pages/main/Insurance/client-group/client-group.module#ClientGroupModule',
        data: { title: 'BluePulse | Client Group' }
      },
      {
       path: 'client-type',
       loadChildren: 'app/Pages/main/Insurance/client-type/client-type.module#ClientTypeModule',
       data: { title: 'BluePulse | Client Type' }
     },
     {
      path: 'insurance-companies',
      loadChildren: 'app/Pages/main/Insurance/insurance-companies/insurance-companies.module#InsuranceCompaniesModule',
      data: { title: 'BluePulse | Insurance Companies' }
    },
    {
     path: 'cptcategory',
     loadChildren: 'app/Pages/main/Insurance/cptcategory/cptcategory.module#CPTCategoryModule',
     data: { title: 'BluePulse | CPT Category' }
   },
   {
    path: 'group-of-companies',
    loadChildren: 'app/Pages/main/Insurance/group-of-companies/group-of-companies.module#GroupOfCompaniesModule',
    data: { title: 'BluePulse | Group Of Companies' }
  }
    ]
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InsuranceRoutingModule { }

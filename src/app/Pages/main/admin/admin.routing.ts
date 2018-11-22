import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './admin.component';

const routes: Routes = [
  {
    path: '',
    component: AdminComponent,
    children: [
      {
        path: 'add-bed',
        loadChildren: 'app/Pages/main/admin/add-bed/add-bed.module#AddBedModule',
        data: { title: 'BluePulse | Add Bed' }
      },
      {
        path: 'add-room',
        loadChildren: 'app/Pages/main/admin/add-rooms/add-rooms.module#AddRoomsModule',
        data: { title: 'BluePulse | Add Room' }
      },
      {
        path: 'floor',
        loadChildren: 'app/Pages/main/admin/building-floor/building-floor.module#BuildingFloorModule',
        data: { title: 'BluePulse | Add Room' }
      },
      {
        path: 'services',
        loadChildren: 'app/Pages/main/admin/services/services.module#ServicesModule',
        data: { title: 'BluePulse | Add Services' }
      },
      {
        path: 'add-role',
        loadChildren: 'app/Pages/main/admin/add-role/add-role.module#AddRoleModule'
      },
      {
        path: 'add-user',
        loadChildren: 'app/Pages/main/admin/add-user/add-user.module#AddUserModule',
        data: { title: 'BluePulse | Patient' }
      },
      {
        path: 'bed-allocation-time',
        loadChildren: 'app/Pages/main/admin/bed-allocation-time/bed-allocation-time.module#BedAllocationTimeModule',
        data: { title: 'BluePulse | Admin' }
      },
      {
        path: 'bed-time',
        loadChildren: 'app/Pages/main/admin/bed-time/bed-time.module#BedTimeModule',
        data: { title: 'BluePulse | Admin' }
      },
      {
        path: 'building-information-category',
        // tslint:disable-next-line:max-line-length
        loadChildren: 'app/Pages/main/admin/building-information-category/building-information-category.module#BuildingInformationCategoryModule',
        data: { title: 'BluePulse | Admin' }
      },
      {
        path: 'treatment',
        loadChildren: 'app/Pages/main/admin/treatment/treatment.module#TreatmentModule',
        data: { title: 'BluePulse | Admin' }
      },
      {
        path: 'ward-category',
        loadChildren: 'app/Pages/main/admin/ward-category/ward-category.module#WardCategoryModule',
        data: { title: 'BluePulse | Admin' }
      }
    ]
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }

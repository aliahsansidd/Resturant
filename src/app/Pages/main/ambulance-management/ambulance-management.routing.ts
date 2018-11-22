import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AmbulanceManagementComponent } from './ambulance-management.component';

const routes: Routes = [
    {
        path: '',
        component: AmbulanceManagementComponent,
        children: [
            {
                path: 'ambulance',
                loadChildren: 'app/Pages/main/ambulance-management/ambulance/ambulance.module#AmbulanceModule',
                data: { title: 'BluePulse | Ambulance' }
            }, {
                path: 'driver',
                loadChildren: 'app/Pages/main/ambulance-management/driver/driver.module#DriverModule',
                data: { title: 'BluePulse | Ambulance' }
            }
        ]
    }

];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class AmbulanceManagementRouting { }

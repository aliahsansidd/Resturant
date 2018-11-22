import { ModuleWithProviders, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserComponent } from './user.component';
import { RoutingService } from '../../../Services/common/routing.service';
// import { ResetPasswordPageComponent } from './reset-password-page/reset-password-page.component';

const routes: Routes = [
  {
    path: '',
    component: UserComponent,
    children: [
      {
              path: 'role-manage',
              loadChildren: 'app/Pages/main/user/rolemanagement/rolemanagement.module#RoleManagementModule',
              data: { title: 'BluePulse | Role Manage' }
      },
      {
        path: 'user-manage',
        loadChildren:
          'app/Pages/main/user/usermanagement/usermanagement.module#UserManagementModule',
        data: { title: 'BluePulse | User Manage' }
      }
    ]
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [RoutingService]
})
export class UserRoutingModule { }

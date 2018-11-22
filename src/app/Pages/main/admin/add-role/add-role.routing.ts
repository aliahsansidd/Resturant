import { ModuleWithProviders, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RoutingService } from '../../../../Services/common/routing.service';
import { AddRoleComponent } from './add-role.component';
// import { ResetPasswordPageComponent } from './reset-password-page/reset-password-page.component';

const routes: Routes = [
  {
    path: '',
    component: AddRoleComponent,
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [RoutingService]
})
export class AddRoleRoutingModule { }

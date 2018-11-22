import { ModuleWithProviders, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RoutingService } from '../../../../Services/common/routing.service';
import { DeathRegistrationComponent } from './death-registration.component';
// import { ResetPasswordPageComponent } from './reset-password-page/reset-password-page.component';

const routes: Routes = [
  {
    path: '',
    component: DeathRegistrationComponent
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [RoutingService]
})
export class DeathRegistrationRoutingModule { }

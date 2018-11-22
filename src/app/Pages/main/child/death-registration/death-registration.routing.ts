import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DeathRegistrationComponent } from './death-registration.component';



const routes: Routes = [
  {
    path: '',
    component: DeathRegistrationComponent
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DeathRegistrationRoutingModule { }

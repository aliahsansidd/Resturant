import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {  DeathRegistrationViewComponent} from './death-registration-view.component';



const routes: Routes = [
  {
    path: '',
    component: DeathRegistrationViewComponent
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DeathRegistrationViewRoutingModule { }

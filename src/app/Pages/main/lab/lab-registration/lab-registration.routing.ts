import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LabRegistrationComponent } from './lab-registration.component';


const routes: Routes = [
  {
    path: '',
    component: LabRegistrationComponent
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LabRegistrationRoutingModule { }

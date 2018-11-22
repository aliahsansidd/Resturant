import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppointmentregistrationComponent } from './appointmentregistration.component';


const routes: Routes = [
  {
    path: '',
    component: AppointmentregistrationComponent,
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AppointmentRegistrationRoutingModule { }

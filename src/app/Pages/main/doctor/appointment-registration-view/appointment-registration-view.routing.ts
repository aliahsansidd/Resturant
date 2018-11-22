import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppointmentRegistrationViewComponent } from './appointment-registration-view.component';



const routes: Routes = [
  {
    path: '',
    component: AppointmentRegistrationViewComponent,
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AppointmentRegistrationViewRoutingModule { }

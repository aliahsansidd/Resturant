import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ChildRegistrationComponent } from './child-registration.component';



const routes: Routes = [
  {
    path: '',
    component: ChildRegistrationComponent
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ChildRegistrationRoutingModule { }

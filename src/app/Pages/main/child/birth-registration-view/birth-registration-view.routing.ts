import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BirthRegistrationViewComponent } from './birth-registration-view.component';



const routes: Routes = [
  {
    path: '',
    component: BirthRegistrationViewComponent
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BirthRegistrationViewRoutingModule { }

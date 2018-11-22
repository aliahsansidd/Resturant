import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OpdRegistrationViewComponent } from './opd-registration-view.component';

const routes: Routes = [
  {
    path: '',
    component: OpdRegistrationViewComponent,
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OpdRegistrationViewRoutingModule { }

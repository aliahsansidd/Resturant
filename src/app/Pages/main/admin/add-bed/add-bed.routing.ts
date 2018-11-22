import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddBedComponent } from './add-bed.component';

const routes: Routes = [
  {
    path: '',
    component: AddBedComponent,
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AddBedRoutingModule { }

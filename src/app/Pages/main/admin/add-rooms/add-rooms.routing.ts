import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddRoomsComponent } from './add-rooms.component';

const routes: Routes = [
  {
    path: '',
    component: AddRoomsComponent,
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AddRoomsRoutingModule { }

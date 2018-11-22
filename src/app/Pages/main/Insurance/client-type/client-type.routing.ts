import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClientTypeComponent } from './client-type.component';


const routes: Routes = [
  {
    path: '',
    component: ClientTypeComponent,
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ClientTypeRoutingModule { }

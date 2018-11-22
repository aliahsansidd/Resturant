import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClientGroupComponent } from './client-group.component';


const routes: Routes = [
  {
    path: '',
    component: ClientGroupComponent,
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ClientGroupRoutingModule { }

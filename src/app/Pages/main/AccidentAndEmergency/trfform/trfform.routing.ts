import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TRFFormComponent } from './trfform.component';


const routes: Routes = [
  {
    path: '',
    component: TRFFormComponent,
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TRFRoutingModule { }

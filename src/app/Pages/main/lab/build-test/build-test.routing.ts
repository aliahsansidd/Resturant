import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BuildTestComponent } from './build-test.component';



const routes: Routes = [
  {
    path: '',
    component: BuildTestComponent
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BuildTestRoutingModule { }

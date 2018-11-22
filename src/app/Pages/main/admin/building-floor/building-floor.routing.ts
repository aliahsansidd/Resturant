import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BuildingFloorComponent } from './building-floor.component';

const routes: Routes = [
  {
    path: '',
    component: BuildingFloorComponent,
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BuildingFloorRoutingModule { }

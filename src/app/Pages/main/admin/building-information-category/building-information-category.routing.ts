import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BuildingInformationCategoryComponent } from './building-information-category.component';

const routes: Routes = [
  {
    path: '',
    component: BuildingInformationCategoryComponent,
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BuildingInformationCategoryRoutingModule { }

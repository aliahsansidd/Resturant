import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TreatementCategoryComponent } from './treatment-category.component';

const routes: Routes = [
  {
    path: '',
    component: TreatementCategoryComponent
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TreatmentCategoryRoutingModule { }

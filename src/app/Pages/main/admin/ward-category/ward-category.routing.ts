import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { WardCategoryComponent } from './ward-category.component';

const routes: Routes = [
  {
    path: '',
    component: WardCategoryComponent,
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class WardCategoryRoutingModule { }

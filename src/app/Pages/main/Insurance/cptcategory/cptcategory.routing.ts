import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CPTCategoryComponent } from './cptcategory.component';


const routes: Routes = [
  {
    path: '',
    component: CPTCategoryComponent,
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CPTCategoryRoutingModule { }

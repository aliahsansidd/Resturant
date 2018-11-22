import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductsUnitComponent } from './products-unit.component';

const routes: Routes = [
  {
    path: '',
    component: ProductsUnitComponent,
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductsUnitRoutingModule { }

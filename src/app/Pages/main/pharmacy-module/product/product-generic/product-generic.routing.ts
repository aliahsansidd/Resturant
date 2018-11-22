import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductGenericComponent } from './product-generic.component';

const routes: Routes = [
  {
    path: '',
    component: ProductGenericComponent,
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductGenericRoutingModule { }

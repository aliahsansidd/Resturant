import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductComponent } from './product.component';

const routes: Routes = [
  {
    path: '',
    component: ProductComponent,
    children: [
      {
        path: 'product-category',
        loadChildren: 'app/Pages/main/pharmacy-module/product/product-category/product-category.module#ProductCategoryModule',
        data: { title: 'BluePulse | product-category' }
      },
      {
        path: 'product-type',
        loadChildren: 'app/Pages/main/pharmacy-module/product/product-type/product-type.module#ProductTypeModule',
        data: { title: 'BluePulse | product-Type' }
      },
      {
        path: 'products-unit',
        loadChildren: 'app/Pages/main/pharmacy-module/product/products-unit/products-unit.module#ProductsUnitModule',
        data: { title: 'BluePulse | products-Unit' }
      },
      {
        path: 'unit-of-measurement',
        loadChildren: 'app/Pages/main/pharmacy-module/product/unit-of-measurement/unit-of-measurement.module#UnitOfMeasurementModule',
        data: { title: 'BluePulse | products-Unit' }
      },
      {
        path: 'product-generic',
        loadChildren: 'app/Pages/main/pharmacy-module/product/product-generic/product-generic.module#ProductGenericModule',
        data: { title: 'BluePulse | products-Unit' }
      },
      {
        path: 'brand-name',
        loadChildren: 'app/Pages/main/pharmacy-module/product/brand-name/brand-name.module#BrandNameModule',
        data: { title: 'BluePulse | products-Unit' }
      },
      {
        path: 'rack-management',
        loadChildren: 'app/Pages/main/pharmacy-module/product/rack-management/rack-management.module#RackManagementModule',
        data: { title: 'BluePulse | products-Unit' }
      },
      {
        path: 'add-product',
        loadChildren: 'app/Pages/main/pharmacy-module/product/add-product/add-product.module#AddProductModule',
        data: { title: 'BluePulse | products-Unit' }
      },
    ]
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductRoutingModule { }

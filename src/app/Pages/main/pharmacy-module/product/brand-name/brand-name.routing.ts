import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BrandNameComponent } from './brand-name.component';

const routes: Routes = [
  {
    path: '',
    component: BrandNameComponent,
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BrandNameRoutingModule { }

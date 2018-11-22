import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TemplateOrValueComponent } from './templateOrValue.component';



const routes: Routes = [
  {
    path: '',
    component: TemplateOrValueComponent
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TemplateOrValueRoutingModule { }

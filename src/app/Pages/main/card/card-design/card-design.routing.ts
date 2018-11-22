import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CardDesignComponent } from './card-design.component';


const routes: Routes = [
  {
    path: '',
    component: CardDesignComponent,
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CardDesignRoutingModule { }

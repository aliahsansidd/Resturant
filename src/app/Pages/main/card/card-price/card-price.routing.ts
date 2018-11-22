import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CardPriceComponent } from './card-price.component';


const routes: Routes = [
  {
    path: '',
    component: CardPriceComponent,
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CardPriceRoutingModule { }

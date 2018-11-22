import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CardComponent } from './card.component';


const routes: Routes = [
  {
    path: '',
    component: CardComponent,
    children: [
      {
        path: 'card-design',
        loadChildren: 'app/Pages/main/card/card-design/card-design.module#CardDesignModule',
        data: { title: 'BluePulse | Dashboard' }
      },
      {
        path: 'card-price',
        loadChildren: 'app/Pages/main/card/card-price/card-price.module#CardPriceModule',
        data: { title: 'BluePulse | Opd' }
      }
    ]
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CardRoutingModule { }

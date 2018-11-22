import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RateSheetComponent } from './rate-sheet.component';


const routes: Routes = [
  {
    path: '',
    component: RateSheetComponent
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RateSheetRoutingModule { }

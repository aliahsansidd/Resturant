import { ModuleWithProviders, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegisterSummaryComponent } from './registersummary.component';


const routes: Routes = [
  {
    path: '',
    component: RegisterSummaryComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: []
})
export class RegisterSummaryRoutingModule { }

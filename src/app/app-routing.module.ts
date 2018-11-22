import { NgModule} from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { canActivateMainChildGuard } from './Services/common/mainguard.service';
const appRoutes: Routes = [
{
  path: 'auth',
  loadChildren:
    'app/Pages/authentication/authentication.module#AuthenticationModule'
},
  {
    path: 'main',
    loadChildren: 'app/Pages/main/main.module#MainModule'
    // canActivate: [canActivateMainChildGuard]
  },
  {
    path: '',
    redirectTo: 'auth',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule],
  providers: []
})
export class RoutingModule { }

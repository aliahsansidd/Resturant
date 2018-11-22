import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// import { featureNameComponent } from './path/fileName.component';

const routes: Routes = [
    // { path: 'routePath', component: featureNameComponent }
];

@NgModule({
    imports: [ RouterModule.forChild(routes) ],
    exports: [ RouterModule ]
})
export class COAListRoutingModule { }

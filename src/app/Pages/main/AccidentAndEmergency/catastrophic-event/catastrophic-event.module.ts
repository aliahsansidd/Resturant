import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CatastrophicEventRoutingModule } from './catastrophic-event.routing';
import { CatastrophicEventComponent } from './catastrophic-event.component';
import { DeleteModalModule } from '../../../../CommonComponents/CommonModals/delete-modal/delete-modal.module';
import { NgPipesModule } from 'ngx-pipes';

@NgModule({
  imports: [
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    CatastrophicEventRoutingModule,
    DeleteModalModule,
    NgPipesModule
  ],
  declarations: [CatastrophicEventComponent],
  entryComponents: [],
  providers: []
})
export class CatastrophicEventModule { }

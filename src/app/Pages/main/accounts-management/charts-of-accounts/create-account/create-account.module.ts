import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {NgPipesModule} from 'ngx-pipes';
import { DatepickerModule } from 'ngx-bootstrap';
import { CreateAccountComponent } from './create-account.component';
import { CreateAccountRoutingModule } from './create-account.routing';
import { DeleteModalModule } from '../../../../../CommonComponents/CommonModals/delete-modal/delete-modal.module';

@NgModule({
  imports: [
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    CreateAccountRoutingModule,
    NgPipesModule,
    DeleteModalModule,
    DatepickerModule.forRoot()
  ],
  declarations: [CreateAccountComponent],
  entryComponents: [],
  providers: []
})
export class CreateAccountModule { }

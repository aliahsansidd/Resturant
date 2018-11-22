import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CardPriceComponent } from './card-price.component';
import { CardPriceRoutingModule } from './card-price.routing';
import { NgZorroAntdModule } from 'ng-zorro-antd';
// import { PopupModalComponent } from '../../shared_components/popup-modal/popup-modal.component';
// import { RegisterComponent } from './register/register.component';
// import { ResetPasswordPageComponent } from './reset-password-page/reset-password-page.component';
// import { ResetPasswordComponent } from './reset-password/reset-password.component';
@NgModule({
  imports: [
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    CardPriceRoutingModule,
    NgZorroAntdModule.forRoot()
  ],
  declarations: [CardPriceComponent],
  entryComponents: [],
  providers: []
})
export class CardPriceModule { }

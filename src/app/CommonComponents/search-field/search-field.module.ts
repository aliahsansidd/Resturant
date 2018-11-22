import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SearchFieldComponent } from './search-field.component';
import { NgZorroAntdModule } from 'ng-zorro-antd';

// import { PopupModalComponent } from '../../shared_components/popup-modal/popup-modal.component';
// import { RegisterComponent } from './register/register.component';
// import { ResetPasswordPageComponent } from './reset-password-page/reset-password-page.component';
// import { ResetPasswordComponent } from './reset-password/reset-password.component';
@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        NgZorroAntdModule.forRoot()
    ],
    declarations: [SearchFieldComponent],
    entryComponents: [],
    exports: [SearchFieldComponent],
    providers: []
})
export class SearchFieldModule { }

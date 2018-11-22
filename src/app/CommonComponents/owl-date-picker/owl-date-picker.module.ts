import { NgModule } from '@angular/core';
// import { BrowserModule } from '@angular/platform-browser';
import { OwlDatePickerComponent } from './owl-date-picker.component';
// import { OwlDateTimeModule, OwlNativeDateTimeModule } from 'ng-pick-datetime';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgZorroAntdModule } from 'ng-zorro-antd';
import {DpDatePickerModule} from 'ng2-date-picker';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        DpDatePickerModule,
        // OwlDateTimeModule,
        // OwlNativeDateTimeModule,
        NgZorroAntdModule.forRoot()
    ],
    declarations: [OwlDatePickerComponent],
    entryComponents: [],
    exports: [OwlDatePickerComponent],
    providers: []
})
export class OwlDatePickerModule {}

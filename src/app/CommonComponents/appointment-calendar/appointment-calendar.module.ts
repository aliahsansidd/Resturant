import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgZorroAntdModule } from 'ng-zorro-antd';
import {DpDatePickerModule} from 'ng2-date-picker';
import { AppointmentCalendarComponent } from './appointment-calendar.component';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        DpDatePickerModule,
        NgZorroAntdModule.forRoot()
    ],
    declarations: [AppointmentCalendarComponent],
    entryComponents: [],
    exports: [AppointmentCalendarComponent],
    providers: []
})
export class AppointmentCalendarModule {}

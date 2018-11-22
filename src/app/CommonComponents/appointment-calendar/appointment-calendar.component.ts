// tslint:disable-next-line:max-line-length
import { Component, OnInit, Input, ChangeDetectorRef, OnChanges, SimpleChanges, Output, EventEmitter, ViewChild } from '@angular/core';
import { ApiService } from '../../Services/common/apiService';
import { BehaviorSubject } from 'rxjs';
declare var $;
import * as moment from 'moment';
import { ISelectionEvent } from 'ng2-date-picker';
import { AppointmentregistrationComponent } from '../../Pages/main/doctor/appointmentregistration/appointmentregistration.component';

@Component({
  selector: 'app-appointment-calendar',
  templateUrl: './appointment-calendar.component.html',
  styleUrls: ['./appointment-calendar.component.css']
})
export class AppointmentCalendarComponent implements OnInit, OnChanges {
  // doctorDays: any;
  ISelectionEvent: any;
  selectedDates = [];


  // x = 'Thu Nov 01 2018 00:00:00 GMT+0500';
  // y = 'Tue January 01 2019 00:00:00 GMT+0500';
  defaultDates = ['Wed Nov 07 2018 00:00:00 GMT+0500',
    'Thu Nov 08 2018 00:00:00 GMT+0500',
    'Fri Nov 09 2018 00:00:00 GMT+0500',
    'Sat Nov 10 2018 00:00:00 GMT+0500'
  ]
  backupDates = [];
  dateToday = moment();
  datePickerConfig = {
    firstDayOfWeek: 'su',
    monthFormat: 'MMM, YYYY',
    disableKeypress: false,
    allowMultiSelect: true,
    closeOnSelect: undefined,
    closeOnSelectDelay: 100,
    onOpenDelay: 0,
    weekDayFormat: 'ddd',
    appendTo: document.body,
    drops: 'right',
    opens: 'right',
    showNearMonthDays: true,
    showWeekNumbers: false,
    enableMonthSelector: true,
    // onSelect: this.ISelectionEvent,
    // isDayDisabledCallback: (defaultDates) => true,
    format: 'YYYY-MM-DD',
    yearFormat: 'YYYY',
    showGoToCurrent: true,
    dayBtnFormat: 'DD',
    monthBtnFormat: 'MMM',
    hours12Format: 'hh',
    hours24Format: 'HH',
    meridiemFormat: 'A',
    minutesFormat: 'mm',
    minutesInterval: 1,
    secondsFormat: 'ss',
    secondsInterval: 1,
    showSeconds: false,
    showTwentyFourHours: true,
    timeSeparator: ':',
    multipleYearsNavigateBy: 10,
    showMultipleYearsNavigation: false,
    unSelectOnClick: true,
    locale: 'zh-en',
  };
  daysNumber = [];
  days = [];
  // @Input() doctorDays: any = [];
  @Input() name: string;
  @Input() DatesToShow: any = [];
  @Output() sendDates: EventEmitter<any> = new EventEmitter();
  @Output() sendSelectedDate: EventEmitter<any> = new EventEmitter();

  saveDates() {
    debugger;
    this.sendDates.emit(this.selectedDates);
  }
  @Input('doctorDays')
  set index(value) {
    console.log(value);
    debugger;
    this.selectedDates = value;
    this.backupDates = value;
  }
  // tslint:disable-next-line:member-ordering
  doctor = {
    date: ''
  }
  constructor(private apiService: ApiService, private chRef: ChangeDetectorRef) {

  }
  something(value) {
    debugger;
    // console.log(value.target.value, 'SOMETHING HPPEND');
  }
  validatorsChanged(event) {
    if (this.backupDates.length > 0) {

      this.datePickerConfig.closeOnSelect = true;
      let a = this.arr_diff(this.selectedDates, this.backupDates);
      this.sendSelectedDate.emit(a);
      // this.appointmentRegistration.getSelectedDateFromCalender(a);
      // setTimeout(() => {
      //   this.selectedDates = this.backupDates;
      //   this.datePickerConfig.closeOnSelect = false;
      //   clearTimeout();
      // }, 500);

    } else {
      this.saveDates();
    }

  }
  ngOnChanges(changes: SimpleChanges) {
    this.validatorsChanged(this.selectedDates);
    console.log(this.selectedDates);
    // let value = doctorDays.currentValue.toUpperCase();
  }


  arr_diff(a1, a2) {

    let a = [], diff = [];

    for (let i = 0; i < a1.length; i++) {
      a[a1[i]] = true;
    }

    for (let i = 0; i < a2.length; i++) {
      if (a[a2[i]]) {
        delete a[a2[i]];
      } else {
        a[a2[i]] = true;
      }
    }

    // tslint:disable-next-line:forin
    for (let k in a) {
      diff.push(k);
    }

    return diff;
  }
  ngOnInit() {
    console.log(this.selectedDates);
  }
  onSelect(data: ISelectionEvent) {
    debugger;
    let a = this.arr_diff(this.backupDates, this.selectedDates);
    this.selectedDates = this.backupDates;
    console.log(this.backupDates);
    console.log(this.selectedDates);
    // console.log(this.date);
  }
  // debugger;
  // Sunday = this is day number 0
  // Monday = this is day number 1
  // Tuesday = this is day number 2
  // Wednesday = this is day number 3
  // Thursday = this is day number 4
  // Friday = this is day number 5
  // Saturday = this is day number 6
  public myFilter = (d: Date): boolean => {
    const day = d.getDay();
    // this.ngOnInit();
    console.log(day);
    // Prevent Saturday and Sunday from being selected.
    if (this.daysNumber.length === 3) {
      console.log(this.doctor.date);
      return day !== this.daysNumber[0] && day !== this.daysNumber[1] && day !== this.daysNumber[2];
    }
  }

}

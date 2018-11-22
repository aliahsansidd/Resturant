import { Component, OnInit, ChangeDetectorRef, ViewChild, ElementRef } from '@angular/core';
import { NgForm } from '@angular/forms';
import { OpdDoctor } from '../../../../Models/opd-doctor.model';
import { ApiService } from '../../../../Services/common/apiService';
import { NzNotificationService } from 'ng-zorro-antd';
import { differenceInCalendarDays, setHours } from 'date-fns';
import { en_US, zh_CN, NzI18nService } from 'ng-zorro-antd';
import * as moment from 'moment';
import { OwlDatePickerComponent } from '../../../../CommonComponents/owl-date-picker/owl-date-picker.component';
// import { setTheme } from 'ngx-bootstrap

declare var $;
@Component({
  selector: 'app-opd-doctor',
  templateUrl: './opd-doctor.component.html',
  styleUrls: ['./opd-doctor.component.css']
})
export class OPDDoctorComponent implements OnInit {
  @ViewChild(OwlDatePickerComponent) owlPicker: OwlDatePickerComponent;
  FillGrid: any = [];
  opdDates = [];
  allRooms = [];
  Fee: any;
  DocCategory: any;
  allChecked = false;
  indeterminate = false;
  displayData = [];
  dataTable: any;
  flag = true;
  bsRangeValue: any = [new Date(), new Date(2018, 19, 11)];
  withoutFilterDoctors: Array<any> = new Array<any>();
  allDoctors: Array<any> = new Array<any>();
  filteredDoctors: Array<any> = new Array<any>();
  AllOPDs: any;
  isVisible = false;
  isCalendarVisible = false;
  isConfirmLoading = false;
  // opdDoctor = {
  //   doctorId: '',
  //   opdId: '',
  //   doctorName: '',
  //   doctorCategoryId: '',
  //   durationInMinutes: '',
  //   startTime: '',
  //   endTime: '',
  //   days: '',
  //   roomId: '',
  //   roomName: '',
  //   doctorCategoryName: '',
  //   opdName: '',
  //   fee: '',
  //   status: 1,
  //   id: -1
  // }
  opdDoctor = {
    doctorId: 0,
    doctorUser: {
      firstName: '',
      middleName: '',
      lastName: '',
      fullName: '',
      email: '',
      password: '',
      roles: [
        {
          userId: '',
          id: '',
          name: ''
        }
      ],
      cellNumber: '',
      createdOn: '',
      status: 0,
      picture: '',
      id: ''
    },
    opdId: 0,
    opdName: '',
    doctorCategoryId: 0,
    doctorCategoryName: '',
    startTime: '',
    endTime: '',
    durationInMinutes: 0,
    fee: 0,
    noOfTimeSlots: 0,
    isRoutineBased: true,
    weekAndDays: '',
    startDateRange: '',
    endDateRange: '',
    roomId: 0,
    roomName: '',
    drAvailability: 1,
    drAvailabilityReason: '',
    doctorOpdDateDto: [],
    id: 0
  }
  radioValue = 'true';
  daysSelected = [];
  weeksSelected = [];
  selectedDays: Array<any> = new Array<any>();
  Days = [
    { name: 'monday' },
    { name: 'tuesday' },
    { name: 'wednesday' },
    { name: 'thursday' },
    { name: 'friday' },
    { name: 'saturday' },
    { name: 'sunday' }

  ]
  Teedeez = [
    {
      id: 0
    },
    {
      id: 1
    },
    {
      id: 2
    },
    {
      id: 3
    },
    {
      id: 4
    },
    {
      id: 5
    },
    {
      id: 6
    }
  ]

  data = [
    {
      name: 'John Brown',
      age: 32,
      address: 'New York No. 1 Lake Park',
      checked: false,
      disabled: false
    }
  ];
  tableDays = [
    { name: 'S' },
    { name: 'M' },
    { name: 'T' },
    { name: 'W' },
    { name: 'T' },
    { name: 'F' },
    { name: 'S' }
  ]
  Weeks = [
    { number: '1' },
    { number: '2' },
    { number: '3' },
    { number: '4' },
    { number: '5' }
  ]
  @ViewChild('OpdName') OpdName: ElementRef;
  selectOPdTimming: any;
  @ViewChild('fm') myForm: NgForm;
  OPDType: any;
  day: any[];
  fwobj = [];
  abc: any = [];
  today = new Date();
  regularDoctor = true;
  timeDefaultValue = setHours(new Date(), 0);
  dateRange = [];
  endRange: any;
  startRange: any;
  emptyWeeks = [
    // defining days in each week
    [],
    [],
    [],
    [],
    []
  ];
  arrayOfDays = [];
  constructor(private chRef: ChangeDetectorRef, private apiService: ApiService,
    private notification: NzNotificationService, private i18n: NzI18nService) {
  }
  onChange(result: Date): void {
    // console.log('onChange: ', result);
    this.startRange = new Date(result[0]).toISOString();
    console.log(this.startRange.split('T')[0]);
    this.opdDoctor.startDateRange = this.startRange.split('T')[0];

    this.endRange = new Date(result[1]).toISOString();
    console.log(this.endRange.split('T')[0]);
    this.opdDoctor.endDateRange = this.endRange.split('T')[0];
    // this.getDates();
  }

  getDates(evt) {
    this.arrayOfDays = evt;
  }
  changeLanguage(): void {
    this.i18n.setLocale(false ? zh_CN : en_US);
    // this.isEnglish = !this.isEnglish;
  }

  // date range

  range(start: number, end: number): number[] {
    const result = [];
    for (let i = start; i < end; i++) {
      result.push(i);
    }
    return result;
  }

  disabledDate = (current: Date): boolean => {
    return differenceInCalendarDays(current, this.today) < 0;
  };

  disabledDateTime = (): object => {
    return {
      nzDisabledHours: () => this.range(0, 24).splice(4, 20),
      nzDisabledMinutes: () => this.range(30, 60),
      nzDisabledSeconds: () => [55, 56]
    };
  };

  disabledRangeTime = (value: Date[], type: 'start' | 'end'): object => {
    if (type === 'start') {
      return {
        nzDisabledHours: () => this.range(0, 60).splice(4, 20),
        nzDisabledMinutes: () => this.range(30, 60),
        nzDisabledSeconds: () => [55, 56]
      };
    }
    return {
      nzDisabledHours: () => this.range(0, 60).splice(20, 4),
      nzDisabledMinutes: () => this.range(0, 31),
      nzDisabledSeconds: () => [55, 56]
    };
  };

  ngOnInit() {
    this.changeLanguage();
    this.apiService.doctorService.getAllDoctors()
      .subscribe((res: any) => {
        console.log(res, 'OPD DOCTORS')
        this.withoutFilterDoctors = res.data;
      });
    this.apiService.wardAndBedService.GetAllRooms()
      .subscribe((res: any) => {
        this.allRooms = res.data;
      });
    console.log(this.opdDoctor.startTime);
    console.log(this.opdDoctor.endTime);
    this.GetAllOPD();
    this.getOPDType();
    this.DataTablesFunctionCallAfterDataInit();
    this.getAllDoctors();
  }
  selectDoctorName() {
    this.apiService.doctorService.getSingleDoctor(this.opdDoctor.doctorId).subscribe((res: any) => {
      this.apiService.user.getSingleUser(res.applicationUserDoctorId).subscribe((resp: any) => {
        this.opdDoctor.doctorUser = resp.data; // opd doctor doctorUser
      })
      for (let i = 0; i <= this.filteredDoctors.length - 1; i++) {
        if (this.filteredDoctors[i].id === res.id) {
          this.opdDoctor.doctorUser.fullName = this.filteredDoctors[i];
          // this.opdDoctor.doctorOpdDateDto = [];
        }
      }
    })
  }
  // currentPageDataChange($event: Array<{ name: string; age: number; address: string; checked: boolean; disabled: boolean; }>): void {
  //   this.displayData = $event;
  //   this.refreshStatus();
  // }

  // refreshStatus(): void {
  //   const allChecked = this.displayData.filter(value => !value.disabled).every(value => value.checked === true);
  //   const allUnChecked = this.displayData.filter(value => !value.disabled).every(value => !value.checked);
  //   this.allChecked = allChecked;
  //   this.indeterminate = (!allChecked) && (!allUnChecked);
  // }

  // checkAll(value: boolean): void {
  //   this.displayData.forEach(data => {
  //     if (!data.disabled) {
  //       data.checked = value;
  //     }
  //   });
  //   this.refreshStatus();
  // }

  selectDays(weekNumber, dayNumber, month, year) {
    weekNumber = weekNumber - 1;
    let fullArray = [
      [1, 2, 3, 4, 5, 6, 7],
      [8, 9, 10, 11, 12, 13, 14],
      [15, 16, 17, 18, 19, 20, 21],
      [22, 23, 24, 25, 26, 27, 28],
      []
    ];

    if (this.emptyWeeks[weekNumber].includes(dayNumber)) {
      let index = this.emptyWeeks[weekNumber].indexOf(dayNumber);
      this.emptyWeeks[weekNumber].splice(index, 1);
    } else {
      this.emptyWeeks[weekNumber].push(dayNumber);
    }
    console.log(this.emptyWeeks);
    // let start = moment(this.startRange);
    // let end = moment(this.endRange);
    // let duration: any = moment.duration(end.diff(start));
    // console.log(duration._data.days);
    // // let durationInDays = duration._d;




    // for (let i = 1; i < duration._data.days; i++) {
    //   console.log(duration._data.days);
    // }

  }
  // for (let d = 0; d <= wobj[fw].length - 1; d++) {
  //           let date = new Date(2018, 3, fullArray[weekNumber][day]); // Yahan pe loop chalay ga dates ka
  //           if (this.fwobj[fw].includes(date.getDay())) {
  //             console.log('Your date is : ' + date.toLocaleDateString() + ' <br>');
  //           }

  //         }
  // if (this.abc.includes(dayNumber)) {
  //   let index = this.abc.indexOf(dayNumber);
  //   this.abc.splice(index, 1);
  // } else {
  //   this.abc.push(dayNumber);
  // }




  // console.log(this.abc);
  // console.log(weekNumber);
  // console.log(dayNumber);
  // console.log(month);
  // console.log(year);
  // // console.log(event);
  // // console.log(event.target.value);
  // this.daysSelected.push(dayNumber);
  // this.weeksSelected.push(weekNumber);
  // let selected = moment().week(weekNumber).day(dayNumber)
  // console.log(selected, 'SELECTED');
  // const arr = [];
  // // let monthOfYear = 11;
  // // let weekOfMonth = weekNumber;
  // // let selected = moment().week(weekOfMonth).day(dayNumber)
  // // console.log(selected);
  // // this.selectedDaysOfDoctor.push()
  // let md = new Date(year, month, 0);    // oct
  // let numberOfDaysInAMonth = md.getDate();
  // let RoundedOfDays = Math.round(numberOfDaysInAMonth);
  // console.log(numberOfDaysInAMonth);
  // // document.write(md.getDate() + ' Max Date<br>');

  // // 2. Divide max date by 7 to make 5 week slots.
  // let wobj = [
  //   [1, 2, 3, 4, 5, 6, 7],
  //   [8, 9, 10, 11, 12, 13, 14],
  //   [15, 16, 17, 18, 19, 20, 21],
  //   [22, 23, 24, 25, 26, 27, 28],
  //   []
  // ];
  // if (numberOfDaysInAMonth > 28) {
  //   for (let a = 28; a < numberOfDaysInAMonth + 1; a++) {
  //     wobj[4].push(a + 1);
  //   }
  // }
  // console.log(wobj);
  // console.log(this.weeksSelected.length);
  // console.log(this.weeksSelected);
  // console.log(wobj);
  // this.fwobj = [
  //   // defining days in each week
  //   [],
  //   [],
  //   [],
  //   [],
  //   []
  // ];
  // // this.fwobj[weekNumber - 1][0].push(dayNumber);
  // console.log(this.fwobj);
  //   for (let w = 0; w < this.weeksSelected.length; w++) {
  // console.log(this.weeksSelected[w], 'weekselected in loop');
  //   this.fwobj[this.weeksSelected[w] - 1].push(dayNumber);
  //     console.log(this.fwobj, 'fwObj in loop');
  //   }
  //   console.log(this.fwobj);
  //   for (let fw = 0; fw <= this.fwobj.length - 1; fw++) {
  //     if (this.fwobj[fw].length > 0) {
  //       console.log('Week ' + (fw + 1) + '<br>');

  //       for (let d = 0; d <= wobj[fw].length - 1; d++) {
  //         let date = new Date(2018, 3, wobj[fw][d]); // Yahan pe loop chalay ga dates ka
  //         if (this.fwobj[fw].includes(date.getDay())) {
  //           console.log('Your date is : ' + date.toLocaleDateString() + ' <br>');

  //         }

  //       }
  //     }

  //   }

  // }
  selectDoctorCategoryName() {
    this.apiService.doctorService.getDoctorCategoryById(this.opdDoctor.doctorCategoryId).subscribe((res: any) => {
      console.log(res);
      this.opdDoctor.doctorCategoryName = res.data.name;
    })
  }
  selectOpdName() {
    console.log(this.opdDoctor.opdId);
    this.apiService.OPDService.getOpdById(this.opdDoctor.opdId).subscribe((res: any) => {
      console.log(res);
      this.opdDoctor.opdName = res.data.name;
    })
  }
  selectRoomName() {
    console.log(this.opdDoctor.roomId);
    this.apiService.wardAndBedService.getSingleRoom(this.opdDoctor.roomId).subscribe((res: any) => {
      console.log(res);
      this.opdDoctor.roomName = res.data.name;
    })
  }
  getOPDType() {
    this.apiService.OPDService.GetAllOPDType().subscribe((res: any) => {
      this.OPDType = res.data;
    });
  }
  getAllDoctors() {
    let count = 0;
    this.apiService.user.getAllUser()
      .subscribe(
        (res: any) => {
          this.allDoctors = res.data.result;
          console.log(this.allDoctors);
          for (let i = 0; i < this.allDoctors.length; i++) {
            for (let j = 0; j < this.allDoctors[i].roles.length; j++) {
              if (this.allDoctors[i].roles[j].name === 'Doctor') {
                this.filteredDoctors[count] = this.allDoctors[i];
                count++;
              }
            }
          }
          console.log('Filered', this.filteredDoctors)
        }
      )
  }
  ArrayInDecending(prop) {
    return function (a, b) {
      if (a[prop] > b[prop]) {
        return 1;
      } else if (a[prop] < b[prop]) {
        return -1;
      }
      return 0;
    }
  }

  save() {

    // this.opdDoctor.doctorOpdDateDto = [];
    console.log(this.opdDoctor);
    if (this.opdDoctor.isRoutineBased === false) {
      this.opdDoctor.weekAndDays = '';
    } else if (this.opdDoctor.isRoutineBased === true) {
      this.opdDoctor.weekAndDays = this.emptyWeeks[0].toString();
    }
  
    // console.log(this.myForm);
    // // if (!this.myForm.valid) {
    // //   console.log(this.opdDoctor)
    // //   console.log('INVALID');
    // //   return null;
    // // }
    // this.day = [];
    // for (let entry of this.selectedDays) {
    //   this.day.push(entry.name);
    // }
    // this.opdDoctor.days = this.day.toString();
    // // console.log(this.opdDoctor);
    // // let startTime = new Date().toISOString().split('T')[0] + 'T' + this.opdDoctor.startTime;
    // // let endTime = new Date().toISOString().split('T')[0] + 'T' + this.opdDoctor.endTime;
    // // this.opdDoctor.startTime = new Date(startTime).toLocaleTimeString();
    // // this.opdDoctor.endTime = new Date(endTime).toLocaleTimeString();
    // if (this.opdDoctor.id > 0) {
    //   console.log(this.opdDoctor);
    //   this.apiService.OPDService.updateOPD(this.opdDoctor).subscribe(res => {
    //     // this.GetAllOPD();

    //     // this.myForm.resetForm();
    //     this.notification.create('success', 'Update', 'Update successfully');
    //   })
    // } else {
    //   console.log(this.opdDoctor);
    //   this.apiService.OPDService.saveOPDDoctor(this.opdDoctor).subscribe((res: any) => {
    //     // this.GetAllOPD();
    //     console.log(res);
    //     this.notification.create('success', 'Saved', 'Saved successfully');
    //     // this.myForm.resetForm();
    //   });
    // }

    if (this.arrayOfDays.length > 0) {
      console.log(this.arrayOfDays);
      this.arrayOfDays.forEach(item => {
        this.SetOpdDatesIntoArray(item);
      });
      let y = this.arrayOfDays.toString();

    } else {
      let start = moment(this.startRange);
      let ends = moment(this.endRange);
      let arr = [];
      for (let days = 0; days < this.emptyWeeks[0].length; days++) {
        // Get "next" monday
        let day = this.emptyWeeks[0][days];
        let tmp = start.clone().day(day);
        if (tmp.isAfter(start, 'd')) {
          arr.push(tmp.toISOString());
        }
        if (tmp.toISOString().split('T')[0] === start.toISOString().split('T')[0]) {
          arr.push(tmp.toISOString());
        }

        while (tmp.isBefore(ends)) {
          tmp.add(7, 'days');
          if (tmp > ends) {

          } else {
            arr.push(tmp.toISOString());
          }
        }
        console.log(arr);
        console.log(this.regularDoctor, 'DOCTOR REGULAR');
        // if (this.regularDoctor === true) {
        //   this.opdDoctor.weekAndDays = this.emptyWeeks[0].toString(); // setting weekandDays field to days in string (0, 1, 2)
        // } else {
        //   this.opdDoctor.weekAndDays = ''; // setting weekandDays field to empty
        // }
        for (let individualDate = 0; individualDate < arr.length; individualDate++) {
          // 
          let obj = {
            doctorOPDId: 0,
            opdId: this.opdDoctor.opdId,
            doctorId: this.opdDoctor.doctorId,
            date: arr[individualDate],
            isSittingOnThisDate: true,
            id: 0
          }
          this.opdDoctor.doctorOpdDateDto.push(obj);
        }
        console.log(this.opdDoctor);

      }

      arr.forEach(item => {
        this.SetOpdDatesIntoArray(item);
      });
    }
    this.opdDoctor.doctorOpdDateDto = this.opdDates;
    this.apiService.OPDService.saveOPDDoctor(this.opdDoctor).subscribe((res: any) => {
      // this.GetAllOPD();
      console.log(res);
      this.notification.create('success', 'Saved', 'Saved successfully');
      this.emptyArray(true);
      // this.myForm.resetForm();
    });
    // setTimeout(() => {
    // }, 5000);
  }

  SetOpdDatesIntoArray(item) {
    this.opdDoctor.doctorOpdDateDto = [];
    this.opdDates.push({
      doctorOPDId: 0,
      opdId: this.opdDoctor.opdId,
      doctorId: this.opdDoctor.doctorId,
      date: moment(item).format(),
      // new Date(item).toISOString().split('T')[0]
      isSittingOnThisDate: true,
      id: 0
    })
    // tslint:disable-next-line:triple-equals
  }

  emptyArray(value) {
    this.regularDoctor = value;
    this.opdDoctor.isRoutineBased = value;
    console.log('CLICKED');

    this.arrayOfDays = [];
    this.opdDoctor.doctorOpdDateDto = [];
    this.owlPicker.selectedDates = [];
    this.emptyWeeks[0] = [];
    this.opdDates = [];
    let a = this.Teedeez;
    this.Teedeez = [];
    setTimeout(() => {
      this.Teedeez = a;
    }, 150);

  }
  changeDateSelection() {

    if (this.radioValue === 'true') {
      this.arrayOfDays = [];
    } else {
      this.dateRange = [];
      this.emptyWeeks[0] = [];
    }
  }
  // Calendar Modal
  showModal(value) {
    // console.log(patient);
    if (value === 'isVisible') {
      this.isVisible = true;
    } else if (value === 'isCalendarVisible') {
      this.isCalendarVisible = true;
    }
  }
  handleOk() {
    this.isConfirmLoading = true;
    setTimeout(() => {
      this.isVisible = false;
      this.isCalendarVisible = false;
      this.isConfirmLoading = false;
    }, 3000);
  }


  handleCancel(value) {
    if (value === 'isCalendarVisible') {
      this.isCalendarVisible = false;
    } else if (value === 'isVisible') {
      this.isVisible = false;
    }
  }
  // arr = [];
  DataTablesFunctionCallAfterDataInit() {
    if (!this.flag) {
      this.dataTable.destroy();
      this.dataTable = null;
    }

    this.chRef.detectChanges();
    const table: any = $('#example');
    this.dataTable = table.DataTable({
      // enables horizontal scrolling
      dom: 'lBfrtip',
      'autoWidth': true,
      lengthMenu: [
        [10, 25, 50, -1],
        ['10 rows', '25 rows', '50 rows', 'Show all']
      ],
      buttons: [
        {
          extend: 'excelHtml5',
          title: 'Data export'
        },
        {
          extend: 'csvHtml5',
          title: 'Data export'
        },
        {
          extend: 'pdfHtml5',
          title: 'Data export'
        }
        ,
        'print'
      ]
    });

    // tslint:disable-next-line:max-line-length
    $('div.dt-buttons button:nth-child(1)').removeClass('dt-button buttons-copy buttons-html5').addClass('btn btn-outline-warning').append('&nbsp;<i class="fa fa-file-excel-o"> </>');
    // tslint:disable-next-line:max-line-length
    $('div.dt-buttons button:nth-child(2)').removeClass('dt-button buttons-copy buttons-html5').addClass('btn btn-outline-success').append('&nbsp;<i class="fa fa-columns"> </>');
    // tslint:disable-next-line:max-line-length
    $('div.dt-buttons button:nth-child(3)').removeClass('dt-button buttons-copy buttons-html5').addClass('btn btn-outline-info').append('&nbsp;<i class="fa fa-file-pdf-o"> </>');
    // tslint:disable-next-line:max-line-length
    $('div.dt-buttons button:nth-child(4)').removeClass('dt-button buttons-copy buttons-html5').addClass('btn btn-outline-danger').append('&nbsp;<i class="fa fa-print"> </>');
    // $('div.dt-buttons button:nth-child(5)').removeClass('dt-button buttons-copy buttons-html5')
    //   .addClass('btn btn-outline-danger').append('<i class="fa fa-save"> </>');

    $('div.dt-buttons button:nth-child(1)').detach().appendTo('#destination');
    $('div.dt-buttons button:nth-child(1)').detach().appendTo('#destination');
    $('div.dt-buttons button:nth-child(1)').detach().appendTo('#destination');
    $('div.dt-buttons button:nth-child(1)').detach().appendTo('#destination');

    $('#example_wrapper').addClass('row');
    $('#example_length').addClass('col-8');
    $('#example_filter').addClass('col-8');

    $('#example_length select').css('width', '80px');
    $('#example_length select option:contains("10 rows")').text('10');
    $('#example_length select option:contains("25 rows")').text('25');
    $('#example_length select option:contains("50 rows")').text('50');
    $('#example_length select option:contains("Show all")').text('100').val('100');


    $('#example_paginate').addClass('col-13');

    let i = 1;
    $('#example tfoot th').each(function () {
      let title = $(this).text();
      if (i === 6) {

      } else {
        // tslint:disable-next-line:max-line-length
        $(this).html('<input class="form-control" style="width:80%; line-height: 1.5 !important;" type="text" placeholder="Search" />');
      }

      i++;
    });
    // Apply the search
    this.dataTable.columns().every(function () {
      let that = this;
      $('input', this.footer()).on('keyup change', function () {
        if (that.search() !== this.value) {
          that
            .search(this.value)
            .draw();
        }
      });
    });

    this.flag = false;
  }

  Reset() {
    this.myForm.form.reset();
  }
  ResetTable() {
    this.dataTable.search('').columns().search('').draw();
    $('#example tfoot th').each(function () {
      let title = $(this).text();
      // tslint:disable-next-line:max-line-length
      $(this).html('<input class="form-control" value="" style="width:80%; line-height: 1.5 !important;" type="text" placeholder="Search ' + title + '" />');
    });
    this.dataTable.columns().every(function () {
      let that = this;
      $('input', this.footer()).on('keyup change', function () {
        if (that.search() !== this.value) {
          that
            .search(this.value)
            .draw();
        }
      });
    });
  }
  GetAllOPD() {
    this.apiService.OPDService.GetAllOPD().subscribe((res: any) => {
      this.AllOPDs = res.data;
      console.log(this.AllOPDs);
      this.DataTablesFunctionCallAfterDataInit();
    });
  }
  // GetAllOPDTimming() {
  //   this.apiService.OPDService.GetAllOPDTimmings().subscribe((res: any) => {
  //     this.selectOPdTimming = res.data;
  //   });
  // }
  // AdditemIntoTable() {

  //   this.FillGrid.push({
  //     // tslint:disable-next-line:radix
  //     opdType: this.OPDType.find(x => x.id === parseInt(this.OPD.doctorCategoryId)).name,
  //     name : this.OPD.name
  //   });
  // }
  DeleteRecord(index) {
    this.FillGrid.splice(index, 1);
  }

  getOPDTypeForDT(id) {

    return this.OPDType.find(x => x.id === id).name

  }
  EditRecord(id, $element) {
    // let opdFind = this.AllOPDs.find(x => x.id === id);
    // this.OPD.name = opdFind.name;
    // this.OPD.isVital = opdFind.isVital;
    // this.OPD.description = opdFind.description;
    // this.OPD.id = opdFind.id;
    // $element.scrollIntoView({ behavior: 'smooth', block: 'start', inline: 'nearest' });
    // setTimeout(() => {
    //   this.OpdName.nativeElement.focus();
    // }, 1000)

  }
  DeleteData(event: any) {
    this.apiService.OPDService.deleteOPD(event)
      .subscribe(
        (res: any) => {
          this.GetAllOPD();
        }
      )

  }
}

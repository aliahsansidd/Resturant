import { Component, OnInit, NgModule, ChangeDetectorRef, ViewChild, Input, ElementRef } from '@angular/core';
import { NgForm } from '@angular/forms';
import { HttpService } from '../../../../Services/common/HttpService';
import { ApiService } from '../../../../Services/common/apiService';
import { NzNotificationService, NzModalService } from 'ng-zorro-antd';
declare var $;

@Component({
  selector: 'app-opd-timming-form',
  templateUrl: './opd-timming-form.component.html',
  styleUrls: ['./opd-timming-form.component.css']
})

export class OpdTimingFormComponent implements OnInit {
  selectedPeople1 = [];
  dataTable: any;
  flag = true;
  bsRangeValue: any = [new Date(2017, 7, 4), new Date(2017, 7, 20)];
  OPDCollection: any;
  startTime;
  endTime;
  pattern: any = '[a-zA-Z ]*';

  OPDTimings = {
    name: '',
    startTime: '',
    endTime: '',
    days: '',
    status: true,
    id: -1
  }
  day = [];
  minDate = new Date(2017, 5, 10);
  maxDate = new Date(2018, 9, 15);

  bsValue: Date = new Date();
  @ViewChild('NameControl') name: ElementRef;
  @ViewChild('OPDName') OPDName: ElementRef;
  Days = [
    { name: 'monday' },
    { name: 'tuesday' },
    { name: 'wednesday' },
    { name: 'thursday' },
    { name: 'friday' },
    { name: 'saturday' },
    { name: 'sunday' }

  ]
  patientForm: any;
  @ViewChild('f') myForm: NgForm;
  DeletedIndex: any;
  selectedDays: any;
  // tslint:disable-next-line:max-line-length
  constructor(private _dataSerice: HttpService, private chRef: ChangeDetectorRef, private apiService: ApiService, private notification: NzNotificationService) {

  }
  ngOnInit() {
    this.GetAllOPD();
  }


  GetAllOPD() {
    this.apiService.OPDService.GetAllOPDTimmings().subscribe((res: any) => {
      this.OPDCollection = res.data.sort(this.ArrayInDecending('id'));
      this.DataTablesFunctionCallAfterDataInit();
    });
  }

  Save() {
debugger;
    if (!this.myForm.valid) {
      return null;
    }
    this.day = [];
    for (let entry of this.selectedPeople1) {
      this.day.push(entry.name);
    }
    let startTime = new Date().toISOString().split('T')[0] + 'T' + this.startTime;
    let endTime = new Date().toISOString().split('T')[0] + 'T' + this.endTime;
    this.OPDTimings.days = this.day.toString();
    this.OPDTimings.startTime = new Date(startTime).toLocaleTimeString();
    this.OPDTimings.endTime = new Date(endTime).toLocaleTimeString();
    if (this.OPDTimings.id > 0) {
      this.apiService.OPDService.updateOPDTiming(this.OPDTimings).subscribe(res => {

        console.log(res);
        this.GetAllOPD();
        this.myForm.resetForm();
      })
    } else {
      this.apiService.OPDService.SaveOPDTiming(this.OPDTimings).subscribe((res: any) => {
        this.notification.create('success', 'Saved', 'OPD Timings Saved successfully');
        this.GetAllOPD();
        this.myForm.resetForm();
      });
    }
  }
  Reset() {
    this.myForm.resetForm();
    this.OPDTimings.id = -1;
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

  DataTablesFunctionCallAfterDataInit() {
    if (!this.flag) {
      this.dataTable.clear().destroy();
      this.dataTable = null;
    }

    this.chRef.detectChanges();
    const table: any = $('table');
    this.dataTable = table.DataTable({
      // enables horizontal scrolling
      dom: 'lBfrtip',
      'autoWidth': false,
      lengthMenu: [
        [10, 25, 50, -1],
        ['10 rows', '25 rows', '50 rows', 'Show all']
      ],
      buttons: [
        {
          extend: 'excelHtml5',
          title: 'Set OPD Timings',
          exportOptions: {
            columns: ':visible:not(.not-export-col)'
          }
        },
        {
          extend: 'csvHtml5',
          title: 'Set OPD Timings',
          exportOptions: {
            columns: ':visible:not(.not-export-col)'
          }
        },
        {
          extend: 'pdfHtml5',
          title: 'Set OPD Timings',
          exportOptions: {
            columns: ':visible:not(.not-export-col)'
          }
        }
        ,
        {
          extend: 'print',
          title: 'Set OPD Timings',
          exportOptions: {
            columns: [0, 1, 2, 3, 4, 5]
          }
        }
      ]
    });

          // tslint:disable-next-line:max-line-length
          $('div.dt-buttons button:nth-child(1)').removeClass('dt-button buttons-copy buttons-html5').addClass('btn btn-outline-warning').append('<i class="fa fa-file-excel-o"> </i>');
          // tslint:disable-next-line:max-line-length
          $('div.dt-buttons button:nth-child(2)').removeClass('dt-button buttons-copy buttons-html5').addClass('btn btn-outline-success').append('<i class="fa fa-columns"> </i>');
          // tslint:disable-next-line:max-line-length
          $('div.dt-buttons button:nth-child(3)').removeClass('dt-button buttons-copy buttons-html5').addClass('btn btn-outline-info').append('<i class="fa fa-file-pdf-o"> </i>');
          // tslint:disable-next-line:max-line-length
          $('div.dt-buttons button:nth-child(4)').removeClass('dt-button buttons-copy buttons-html5').addClass('btn btn-outline-danger').append('<i class="fa fa-print"> </i>');
          // $('div.dt-buttons button:nth-child(5)').removeClass('dt-button buttons-copy buttons-html5')
          //   .addClass('btn btn-outline-danger').append('<i class="fa fa-save"> </>');
          $('div.dt-buttons span').addClass('text');

    $('div.dt-buttons button:nth-child(1)').detach().appendTo('#destination');
    $('div.dt-buttons button:nth-child(1)').detach().appendTo('#destination');
    $('div.dt-buttons button:nth-child(1)').detach().appendTo('#destination');
    $('div.dt-buttons button:nth-child(1)').detach().appendTo('#destination');

    $('#example_wrapper').addClass('row');
    $('#example_length').addClass('col-lg-8 col-md-8');
    $('#example_filter').addClass('col-lg-8 col-md-8');

    $('#example_length select').css('width', '80px');
    $('#example_length select option:contains("10 rows")').text('10');
    $('#example_length select option:contains("25 rows")').text('25');
    $('#example_length select option:contains("50 rows")').text('50');
    $('#example_length select option:contains("Show all")').text('100').val('100');


    $('#example_paginate').addClass('col-13');

    let i = 1;
    $('#example tfoot th').each(function () {
      let title = $(this).text();
      if (i === 7) {

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
  EditRecord(id, $element) {
    let a = this.OPDCollection.find(x => x.id === id);
    this.OPDTimings.name = a.name;
    this.OPDTimings.status = a.status === 1 ? true : false;
    this.startTime = a.startTime.split('T')[1];
    this.OPDTimings.id = a.id;
    this.endTime = a.endTime.split('T')[1];
    this.selectedPeople1 = [];
    this.selectedDays = [];
    this.selectedDays = a.days.split(',');
    for (let entry of this.selectedDays) {
      this.selectedPeople1.push({
        name: entry
      });
    }
    $element.scrollIntoView({ behavior: 'smooth', block: 'start', inline: 'nearest' });
    setTimeout(() => {
      this.OPDName.nativeElement.focus();
    }, 1000);
  }
  DeleteData(event) {
    console.log(event);
    this.DeletedIndex = event;
    this.apiService.OPDService.DeleteOPDTimmings(this.DeletedIndex).subscribe((res: any) => {
      console.log(res);
      this.GetAllOPD();
    });
  }
}

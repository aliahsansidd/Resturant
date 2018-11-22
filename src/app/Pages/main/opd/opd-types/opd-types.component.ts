import { Component, OnInit, ViewChild, ChangeDetectorRef, ElementRef } from '@angular/core';
import { HttpService } from '../../../../Services/common/HttpService';
import { AlertModalComponent } from '../../../../CommonComponents/alert-modal/alert-modal.component';
import { ApiService } from '../../../../Services/common/apiService';
import { NzNotificationService, NzModalService } from 'ng-zorro-antd';
// import { PatientDetailsModalComponent } from '../../patient/patient-list/patient-details-modal/patient-details-modal.component';
import { RoutingService } from '../../../../Services/common/routing.service';
import { OpdTimingFormComponent } from '../opd-timming-form/opd-timming-form.component';
import { NgForm } from '@angular/forms';
declare var $;


@Component({
  selector: 'app-doctors-category',
  templateUrl: './opd-types.component.html',
  styleUrls: ['./opd-types.component.css']
})
export class OpdTypesComponent implements OnInit {
  selectPeople1 = []
  flag = true;
  dataTable: any;
  Name = '';
  IsActive = true;
  status = true;
  doctorCategory = {
    name: ''
  }
  Clock = Date.now();
  OPDTYPE1: any
  OPDTYPE = {
    name: '',
    status: true,
    id: -1
  }
  @ViewChild('f') myForm: NgForm;
  @ViewChild('opdType') opdType: ElementRef;
  DeletedIndex: any;
  // tslint:disable-next-line:max-line-length
  constructor(private _dataService: HttpService, private apiService: ApiService, private chRef: ChangeDetectorRef) { }

  public ngOnInit() {
    this.GetOPDType();
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

  GetOPDType() {
    this.apiService.OPDService.GetAllOPDType().subscribe((res: any) => {
      this.OPDTYPE1 = res.data.sort(this.ArrayInDecending('id'));
      this.DataTablesFunctionCallAfterDataInit()
    });
  }

  Reset() {
    this.OPDTYPE.id = -1;

    this.myForm.resetForm();
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
          title: 'Set Doctor Category',
          exportOptions: {
            columns: ':visible:not(.not-export-col)'
          }
        },
        {
          extend: 'csvHtml5',
          title: 'Set Doctor Category',
          exportOptions: {
            columns: ':visible:not(.not-export-col)'
          }
        },
        {
          extend: 'pdfHtml5',
          title: 'Set Doctor Category',
          exportOptions: {
            columns: ':visible:not(.not-export-col)'
          }
        }
        ,
        {
          extend: 'print',
          title: 'Set Doctor Category',
          exportOptions: {
            columns: [0, 1, 2 ]
          }
        }
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
      if (i === 4) {

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
  EditRecord(id, $element: any) {
    let a = this.OPDTYPE1.find(x => x.id === id);
    this.OPDTYPE.name = a.name;
    this.OPDTYPE.status = a.status === 1 ? true : false;
    this.OPDTYPE.id = a.id;
    $element.scrollIntoView({ behavior: 'smooth', block: 'start', inline: 'nearest' });
    setTimeout(() => {
      this.opdType.nativeElement.focus();
    }, 1000);
  }
  DeleteData(event) {
    this.DeletedIndex = event;
    this.apiService.OPDService.DeleteOPDType(this.DeletedIndex).subscribe((res: any) => {
      this.GetOPDType();
    });
  }
  onChange() {
    console.log(this.IsActive);
  }
  Save() {
    if (!this.myForm.valid) {
      return null;
    }
    if (this.OPDTYPE.id > 0) {
      this.apiService.OPDService.updateOPDType(this.OPDTYPE).subscribe(res => {
        console.log(res);
        this.GetOPDType();
        this.OPDTYPE.id = -1;
        this.myForm.resetForm();
      })
    } else {
      console.log(this.opdType);
      console.log(this.OPDTYPE);
      // console.log(this.opdType);
      // console.log(this.opdType);
      this.apiService.OPDService.SaveOPDType(this.OPDTYPE).subscribe((res: any) => {
        console.log(res);
        this.GetOPDType();
        this.myForm.resetForm();
      });
    }
  }

}

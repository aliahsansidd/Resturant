import { Component, OnInit, ViewChild, ChangeDetectorRef, ElementRef } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ApiService } from '../../../../Services/common/apiService';
import { NzNotificationService } from 'ng-zorro-antd';

declare var $;
@Component({
  selector: 'app-income-group',
  templateUrl: './income-group.component.html',
  styleUrls: ['./income-group.component.css']
})
export class IncomeGroupComponent implements OnInit {
  Status = true;
  Income = {
    description: '',
    status: true,
    createdOn: '2018-10-22T11:25:48.598Z',
    id: -1
  }

  incomeGroupArray: Array<any> = new Array<any>();
  flag = true;
  dataTable: any;
  DeletedIndex: any;
  @ViewChild('incomeDescription') incomeDescription: ElementRef;

  @ViewChild('f') myForm: NgForm;
  constructor(private apiService: ApiService,
    private notification: NzNotificationService,
    private chRef: ChangeDetectorRef) { }

  ngOnInit() {
    this.getAllIncomeGroup();

  }

  getAllIncomeGroup() {
    this.apiService.billingService.getAllIncomeGroup()
      .subscribe(
        (res: any) => {
          console.log(res);
          this.incomeGroupArray = res.data;
          this.DataTablesFunctionCallAfterDataInit();
        }
      )
  }

  saveIncomeGroup() {
    console.log(this.Income);
    if (this.Income.id > 0) {
      this.apiService.billingService.updateIncomeGroup(this.Income)
        .subscribe(
          (res: any) => {
            this.notification.create('success', 'Update', 'Update successfully');
            this.Reset();
            this.getAllIncomeGroup();
          },
          (error: any) => {
            this.notification.create('error', 'Error', 'Something Went Wrong');
          }
        )
    }
    else {
      this.apiService.billingService.saveIncomGroup(this.Income)
        .subscribe(
          (res: any) => {
            this.notification.create('success', 'Saved', 'Saved successfully');
            this.Reset();
            this.getAllIncomeGroup();
          },
          (error: any) => {
            this.notification.create('error', 'Error', 'Something Went Wrong');
          }
        )
    }

  }

  Reset() {
    this.myForm.resetForm();
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
          title: 'Add bed',
          exportOptions: {
            columns: ':visible:not(.not-export-col)'
          }

        },
        {
          extend: 'csvHtml5',
          title: 'Add bed',
          exportOptions: {
            columns: ':visible:not(.not-export-col)'
          }

        },
        {
          extend: 'pdfHtml5',
          title: 'Add bed',
          exportOptions: {
            columns: ':visible:not(.not-export-col)'
          }

        },
        {
          extend: 'print',
          title: 'Add bed',
          exportOptions: {
            columns: [0, 1, 2, 3]
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
      if (i === 5) {

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
    let a = this.incomeGroupArray.find(x => x.id === id);
    this.Income.description = a.description;
    this.Income.status = a.status === 1 ? true : false;
    //  this.WardCategory = a.startTime.split('T')[1];
    this.Income.id = a.id;
    $element.scrollIntoView({ behavior: 'smooth', block: 'start', inline: 'nearest' });
    setTimeout(() => {
      this.incomeDescription.nativeElement.focus();
    }, 1000);

  }

  DeleteData(event) {
    this.DeletedIndex = event;
    this.apiService.billingService.deleteIncomeGroup(this.DeletedIndex).subscribe((res: any) => {
      this.getAllIncomeGroup();
    });
  }

}

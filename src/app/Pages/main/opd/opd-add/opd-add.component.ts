import { Component, OnInit, ChangeDetectorRef, ViewChild, ElementRef } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ApiService } from '../../../../Services/common/apiService';
import { NzNotificationService } from 'ng-zorro-antd';

declare var $;
@Component({
  selector: 'app-add-opd',
  templateUrl: './opd-add.component.html',
  styleUrls: ['./opd-add.component.css']
})
export class OPDAddComponent implements OnInit {
  FillGrid: any = [];
  Fee;
  DocCategory;
  dataTable: any;
  flag = true;
  bsRangeValue: any = [new Date( ), new Date(2018, 19, 11)];

  AllOPDs: any;
  OPD = {
    name: '',
    description: '',
    consultancyTimingId: '',
    isVital: true,
    doctorCategoryId: '',
    isActive: true,
    id: -1
  }
  @ViewChild('OpdName') OpdName: ElementRef;
  selectOPdTimming: any;
  @ViewChild('fm') myForm: NgForm;
  OPDType: any;
  constructor(private chRef: ChangeDetectorRef, private apiService: ApiService,
    private notification: NzNotificationService) {
  }

  ngOnInit() {
    this.GetAllOPD();
    this.getOPDType();
    this.GetAllOPDTimming();
   // this.DataTablesFunctionCallAfterDataInit();
  }
  getOPDType() {
    this.apiService.OPDService.GetAllOPDType().subscribe((res: any) => {
      this.OPDType = res.data;
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
          title: 'Add New OPD',
          exportOptions: {
            columns: ':visible:not(.not-export-col)'
          }
        },
        {
          extend: 'csvHtml5',
          title: 'Add New OPD',
          exportOptions: {
            columns: ':visible:not(.not-export-col)'
          }
        },
        {
          extend: 'pdfHtml5',
          title: 'Add New OPD',
          exportOptions: {
            columns: ':visible:not(.not-export-col)'
          }
        }
        ,
        {
          extend: 'print',
          title: 'Add New OPD',
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
  Save() {
    if (!this.myForm.valid) {
      return null;
    }
    if (this.OPD.id > 0) {
      this.apiService.OPDService.updateOPDTiming(this.OPD).subscribe(res => {
        console.log(res);
        this.GetAllOPD();
        this.myForm.resetForm();
      })
    } else {
      this.apiService.OPDService.SaveNewOPD(this.OPD).subscribe((res: any) => {
        this.GetAllOPD();
        this.myForm.resetForm();
      });
    }
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
      this.AllOPDs = res.data.sort(this.ArrayInDecending('id'));
      this.DataTablesFunctionCallAfterDataInit();
    });
  }
  GetAllOPDTimming() {
    this.apiService.OPDService.GetAllOPDTimmings().subscribe((res: any) => {
      this.selectOPdTimming = res.data;

    },
      error => {
        this.notification.create('error', 'Error', 'Something Went Wrong');
      }
    );
  }





  DeleteRecord(index) {
    this.FillGrid.splice(index, 1);
  }

  getOPDTimmings(ids) {
    return this.selectOPdTimming.find(x => x.id === ids).name;
  }
  getOPDTypeForDT(id) {

    return this.OPDType.find(x => x.id === id).name

  }
  EditRecord(id, $element) {
    let opdFind = this.AllOPDs.find(x => x.id === id);
    this.OPD.name = opdFind.name;
    this.OPD.consultancyTimingId = opdFind.consultancyTimingId;
    this.OPD.isVital = opdFind.isVital;
    this.OPD.doctorCategoryId = opdFind.doctorCategoryId;
    this.OPD.id = opdFind.id;
    $element.scrollIntoView({ behavior: 'smooth', block: 'start', inline: 'nearest' });
    setTimeout(() => {
      this.OpdName.nativeElement.focus();
    }, 1000)

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

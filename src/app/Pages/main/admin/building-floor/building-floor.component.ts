import { Component, OnInit, ViewChild, ElementRef, ChangeDetectorRef, ChangeDetectionStrategy } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ApiService } from 'app/Services/common/apiService';
import { NzNotificationService } from 'ng-zorro-antd';
declare var $;

@Component({
  selector: 'app-building-floor',
  templateUrl: './building-floor.component.html',
  styleUrls: ['./building-floor.component.css']
})
export class BuildingFloorComponent implements OnInit {

  Floor = {
    name: null,
    status: true,
    createdOn: '',
    id: -1
  }
  bsValue: Date = new Date();
  bsRangeValue: any = [new Date(this.bsValue.getFullYear(), this.bsValue.getMonth(), 1), new Date()];
  dataTable: any;
  flag = true;
  @ViewChild('f') myForm: NgForm;
  BedCollection: any;
  DeletedIndex: any;
  @ViewChild('FloorNo') FloorNo: ElementRef;
  AllFloor: any;
  FloorData: any;
  constructor(private apiService: ApiService, private chRef: ChangeDetectorRef, private notification: NzNotificationService) { }

  ngOnInit() {
    this.GetAllFloor();
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
  selectRange() {
    setTimeout(() => {
      let startDate = new Date(this.bsRangeValue[0].toISOString().split('T')[0]);
      let endDate = new Date(this.bsRangeValue[1].toISOString().split('T')[0]);
      this.AllFloor = this.FloorData.filter((Bed) => {
        let a = new Date(Bed.createdOn.split('T')[0]);
        return a >= startDate && a <= endDate;
      });

    }, 250);

  }
  GetAllFloor() {
    this.apiService.BuildingInfo.GetallFloor().subscribe((res: any) => {
      this.AllFloor = res.data.sort(this.ArrayInDecending('id'));
      this.FloorData =  this.AllFloor;
      this.DataTablesFunctionCallAfterDataInit();
    });
  }

  Save() {
    if (!this.myForm.valid) {
      return null;
    }
    if (this.Floor.id > 0) {
      this.apiService.BuildingInfo.updateFloor(this.Floor).subscribe((res: any) => {
        this.Floor.id = -1;
        this.GetAllFloor();
        this.myForm.resetForm();
      })
    } else {
      this.apiService.BuildingInfo.CreateFloor(this.Floor).subscribe((res: any) => {
        this.notification.create('success', 'Saved', 'Saved successfully');
        this.GetAllFloor();
        this.myForm.resetForm();
      })
    }


  }
  Reset() {
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
    let a = this.AllFloor.find(x => x.id === id);
    this.Floor.name = a.name;
    this.Floor.status = a.status;
    //  this.WardCategory = a.startTime.split('T')[1];
    this.Floor.id = a.id;
    $element.scrollIntoView({ behavior: 'smooth', block: 'start', inline: 'nearest' });
    setTimeout(() => {
      this.FloorNo.nativeElement.focus();
    }, 1000);

  }
  DeleteData(event) {
    this.DeletedIndex = event;
    this.apiService.BuildingInfo.DeleteFloor(this.DeletedIndex).subscribe((res: any) => {
      this.GetAllFloor();
    });
  }

}

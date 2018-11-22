import { Component, OnInit, ChangeDetectorRef, ElementRef, ViewChild } from '@angular/core';
import { ApiService } from 'app/Services/common/apiService';
import { NzNotificationService } from 'ng-zorro-antd';
import { NgForm } from '@angular/forms';
declare var $;

@Component({
  selector: 'app-ambulance',
  templateUrl: './ambulance.component.html',
  styleUrls: ['./ambulance.component.css']
})
export class AmbulanceComponent implements OnInit {

  Ambulance = {
    regNo: '',
    brandName: '',
    version: '',
    category: '',
    centerName: '',
    location: '',
    chassisNo: '',
    engineNo: '',
    id: 0,
    status: 0
  }
  bsValue: Date = new Date();
  bsRangeValue: any = [new Date(this.bsValue.getFullYear(), this.bsValue.getMonth(), 1), new Date()];
  dataTable: any;
  flag = true;
  @ViewChild('f') myForm: NgForm;
  BedCollection: any;
  DeletedIndex: any;
  @ViewChild('brandNames') brandNames: ElementRef;
  Ambulances: any = [];
  AmbulanceCollection: any;


  constructor(private apiService: ApiService, private chRef: ChangeDetectorRef, private notification: NzNotificationService) { }

  ngOnInit() {
    this.GetAllAmbulance();
  }

  GetAllAmbulance() {
    this.apiService.AmbulanceManagement.GetAllAmbulance().subscribe((res: any) => {
      this.AmbulanceCollection = res.data;
      this.Ambulances = this.AmbulanceCollection;
      this.DataTablesFunctionCallAfterDataInit();
    })
  }


  selectRange() {
    setTimeout(() => {
      let startDate = new Date(this.bsRangeValue[0].toISOString().split('T')[0]);
      let endDate = new Date(this.bsRangeValue[1].toISOString().split('T')[0]);
      this.Ambulances = this.AmbulanceCollection.filter((Bed) => {
        let a = new Date(Bed.createdOn.split('T')[0]);
        return a >= startDate && a <= endDate;
      });

    }, 250);

  }



  Save() {
    let i: any;
    if (!this.myForm.valid) {
      this.notification.create('error', 'failed', 'Not Saved Successfully');
      return null;
    }
    if (this.Ambulance.id > 0) {
      this.apiService.AmbulanceManagement.UpdateAmbulance(this.Ambulance).subscribe((res: any) => {
        this.Ambulance.id = -1;
        this.GetAllAmbulance();
        this.myForm.resetForm();
      })
    }

    // tslint:disable-next-line:one-line
    else {
      // if (this.mia.length > 0) {
      this.apiService.AmbulanceManagement.SaveAmbulance(this.Ambulance).subscribe((res: any) => {
        this.GetAllAmbulance();
        this.myForm.resetForm();
        this.notification.create('success', 'Saved', 'Saved successfully');
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

  EditRecord(id, $element: any) {
    let a = this.AmbulanceCollection.find(x => x.id === id);
    this.Ambulance.brandName = a.brandName;
    this.Ambulance.category = a.category;
    this.Ambulance.centerName = a.centerName;
    this.Ambulance.chassisNo = a.chassisNo;
    this.Ambulance.engineNo = a.engineNo;
    this.Ambulance.regNo = a.regNo;
    this.Ambulance.version = a.version;
    this.Ambulance.id = a.id;
    $element.scrollIntoView({ behavior: 'smooth', block: 'start', inline: 'nearest' });
    setTimeout(() => {
      this.brandNames.nativeElement.focus();
    }, 1000);

  }
  DeleteData(event, showNotification) {
    this.DeletedIndex = event;
    this.apiService.AmbulanceManagement.DeleteAmbulance(this.DeletedIndex).subscribe((res: any) => {
      this.GetAllAmbulance();
      this.notification.create('success', 'Deleted', 'Successfully Deleted');
    });
    this.myForm.reset();
  }

}

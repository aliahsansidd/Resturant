import { Component, OnInit, ViewChild, ElementRef, ChangeDetectorRef } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ApiService } from '../../../../Services/common/apiService';
declare var $;

@Component({
  selector: 'app-group-of-companies',
  templateUrl: './group-of-companies.component.html',
  styleUrls: ['./group-of-companies.component.css']
})
export class GroupOfCompaniesComponent implements OnInit {
  GroupOfCompanies = {
    name: '',
    description: '',
    shortCode: '',
    id: 0
  }

  dataTable: any;
  flag = true;
  @ViewChild('f') myForm: NgForm;
  DeletedIndex: any;
  @ViewChild('Names') Name: ElementRef;
  GroupOfCompaniesCollection: any;
  constructor(private apiService: ApiService, private chRef: ChangeDetectorRef) { }

  ngOnInit() {
    this.GetAllGroupOfCompanies();
  }

  GetAllGroupOfCompanies() {
    this.apiService.insuranceService.GetAllGroupOfCompanies().subscribe((res: any) => {
      this.GroupOfCompaniesCollection = res.data.sort(this.ArrayInDecending('id'));
      this.DataTablesFunctionCallAfterDataInit();
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
  Save() {
    if (!this.myForm.valid) {
      return null;
    }
    if (this.GroupOfCompanies.id > 0) {
      this.apiService.insuranceService.updateGroupOfCompanies(this.GroupOfCompanies).subscribe((res: any) => {
        this.GroupOfCompanies.id = -1;
        this.GetAllGroupOfCompanies();
        this.myForm.resetForm();
      })
    } else {
      this.apiService.insuranceService.SaveGroupOfCompanies(this.GroupOfCompanies).subscribe((res: any) => {
        this.GetAllGroupOfCompanies();
        this.myForm.resetForm();
      })
    }


  }
  Reset() {
    this.myForm.resetForm();
    this.GroupOfCompanies.id = -1;
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
          title: 'Data export',
          exportOptions: {
            columns: ':visible:not(.not-export-col)'
          }
        },
        {
          extend: 'csvHtml5',
          title: 'Data export',
          exportOptions: {
            columns: ':visible:not(.not-export-col)'
          }
        },
        {
          extend: 'pdfHtml5',
          title: 'Data export',
          exportOptions: {
            columns: ':visible:not(.not-export-col)'
          }
        },
        {
          extend: 'print',
          title: 'Data export',
          exportOptions: {
            columns: [0, 1, 2, 3]
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
    let a = this.GroupOfCompaniesCollection.find(x => x.id === id);
    this.GroupOfCompanies.name = a.name;
    this.GroupOfCompanies.id = a.id;
    this.GroupOfCompanies.shortCode = a.shortCode;
    this.GroupOfCompanies.description = a.description;
    $element.scrollIntoView({ behavior: 'smooth', block: 'start', inline: 'nearest' });
    setTimeout(() => {
      this.Name.nativeElement.focus();
    }, 1000);

  }
  DeleteData(event) {
    this.DeletedIndex = event;
    this.apiService.insuranceService.DeleteGroupOfCompanies(this.DeletedIndex).subscribe((res: any) => {
      this.GetAllGroupOfCompanies();
    });
  }

}

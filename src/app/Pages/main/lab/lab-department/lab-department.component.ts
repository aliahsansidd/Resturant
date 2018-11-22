import { Component, OnInit, ViewChild, ChangeDetectorRef, ElementRef } from '@angular/core';
import { ApiService } from '../../../../Services/common/apiService';
import { NgForm } from '@angular/forms';
declare var $;

@Component({
  selector: 'app-lab-department',
  templateUrl: './lab-department.component.html',
  styleUrls: ['./lab-department.component.css']
})
export class LabDepartmentComponent implements OnInit {
  selectPeople1 = []
  flag = true;
  dataTable: any;
  Name = '';
  IsActive = true;
  status = true;

  Clock = Date.now();
  OPDTYPE1: any
  OPDTYPE = {
    name: '',
    fee: 0,
    status: true,
    id: -1
  }
  department = {
    name: '',
    status: false,
    id: 0
  }
  @ViewChild('f') myForm: NgForm;
  @ViewChild('opdType') opdType: ElementRef;
  DeletedIndex: any;
  departments: any;
  // tslint:disable-next-line:max-line-length
  constructor(private apiService: ApiService, private chRef: ChangeDetectorRef) { }

  public ngOnInit() {
    // this.GetLabType();
    this.apiService.labService.getAllLabDepartments().subscribe((res: any) => {
      console.log(res);
      this.departments = res.data;
    })
  }


  createDepartment(name) {
    if (this.department.id > 0) {
      this.apiService.labService.updateLabDepartments(this.department).subscribe((res: any) => {
        console.log(res);
        this.apiService.labService.getAllLabDepartments().subscribe((resp: any) => {
          console.log(resp);
          this.departments = resp.data;
        })
        this.DataTablesFunctionCallAfterDataInit();
      })
    } else {
      this.apiService.labService.createLabDepartment(this.department).subscribe((res: any) => {
        console.log(res);
        this.apiService.labService.getAllLabDepartments().subscribe((resp: any) => {
          console.log(resp);
          this.departments = resp.data;
        })
        this.DataTablesFunctionCallAfterDataInit();
      })
    }

  }
  GetLabType() {
    this.apiService.OPDService.GetAllOPDType().subscribe((res: any) => {
      this.OPDTYPE1 = res.data
      this.DataTablesFunctionCallAfterDataInit()
    });
  }

  Reset() {
    this.Name = '';
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
      columnDefs: [
        {
          targets: [4],
          visible: false,
          searchable: false
        }],
      order: [[3, 'desc']],
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
    let a = this.departments.find(x => x.id === id);
    this.department.name = a.name;
    this.department.status = a.status === 1 ? true : false;
    this.department.id = a.id;
    $element.scrollIntoView({ behavior: 'smooth', block: 'start', inline: 'nearest' });
    setTimeout(() => {
      this.opdType.nativeElement.focus();
    }, 1000);
  }
  DeleteData(event) {
    this.DeletedIndex = event;
    this.apiService.labService.deleteLabDepartment(this.DeletedIndex).subscribe((res: any) => {
      this.apiService.labService.getAllLabDepartments().subscribe((resp: any) => {
        this.departments = resp.data;
      })
    });
  }
  onChange() {
    console.log(this.IsActive);
  }

}


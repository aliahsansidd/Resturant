import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { ApiService } from 'app/Services/common/apiService';
import { NzNotificationService } from 'ng-zorro-antd';
import { Router } from '@angular/router';

declare var $;
@Component({
  selector: 'app-template',
  templateUrl: './templateOrValue.component.html',
  styleUrls: ['./templateOrValue.component.css']
})
export class TemplateOrValueComponent implements OnInit {
  test = {
    name: '',
    code: '',
    dependencyTests: '',
    remarks: '',
    price: 0,
    sampleType: '',
    sampleInstructions: '',
    isSampleNeeded: true,
    isResultEntry: true,
    isConductionRequired: true,
    isConductByDoctor: true,
    conductingInstructions: '',
    conductionFormat: '',
    testInformation: '',
    status: 0,
    createdOn: '',
    labDepartmentServicesId: 0,
    id: 0
  }
  labTestBuilder: Array<any> = new Array<any>();
  flag = true;
  // tslint:disable-next-line:no-unused-expression
  showSampleDropDown = false;
  sampleValue = false;
  InActive = true
  isValue = false;
  showTemplate = false;
  labTestUnit: Array<any> = new Array<any>();
  allTestBuilder: Array<any> = new Array<any>();
  public options: Object = {
    charCounterCount: true,
    // tslint:disable-next-line:max-line-length
    toolbarButtons: ['fullscreen', 'bold', 'italic', 'underline', '|', 'fontFamily', 'fontSize', 'color', 'inlineStyle', 'paragraphStyle', '|', 'paragraphFormat', 'align', 'formatOL', 'formatUL', 'outdent', 'indent', 'insertLink', 'insertTable', '|', 'specialCharacters', 'insertHR', 'insertImage']

  };
  dataTable: any;
  DeletedIndex: any;
  constructor(private apiService: ApiService,
    private notification: NzNotificationService,
    private router: Router,
    private chRef: ChangeDetectorRef) { }
  ngOnInit(): void {
    this.apiService.labService.getAllTestBuilder()
      .subscribe(
        (res: any) => {
          this.labTestBuilder = res.data;
        }
      )
  }
  DataTablesFunctionCallAfterDataInit() {
    if (!this.flag) {
      this.dataTable.destroy();
      this.dataTable = null;
    }
    this.chRef.detectChanges();
    const table: any = $('table');
    this.dataTable = table.DataTable({
      // enables horizontal scrolling
      dom: 'lBfrtip',
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
      if (i === 7) {
      } else {
        // tslint:disable-next-line:max-line-length
        $(this).html('<input class="form-control" style="width:80%; line-height: 1.36 !important;" type="text" placeholder="Search" />');
      }
      i++;

      if (i === 6) {

      } else {
        // tslint:disable-next-line:max-line-length
        $(this).html('<input class="form-control" style="width:80%; line-height: 1.5 !important;" type="text" placeholder="Search ' + title + '" />');
      }

      i++;
    });
    // Apply the search
    this.dataTable.columns().every(function () {
      let that = this;
      $('input', this.footer()).on('keyup change', function () {
        console.log(that.search());
        if (that.search() !== this.value) {
          console.log(this.value);
          that.searchValue = this.value;
          that
            .search(this.value)
            .draw();
        }
      });
    });

    this.flag = false;
  }
  DeleteData(event) {
    this.DeletedIndex = event;
    this.apiService.labService.deleteLabBuilder(this.DeletedIndex).subscribe((res: any) => {
      this.apiService.labService.getLabTestBuilder().subscribe((resp: any) => {
        this.labTestBuilder = resp.data;
      })
    });
  }
  EditRecord(id) {
    console.log('Id ==> ' + id);
    // tslint:disable-next-line:no-unused-expression
    this.router.navigate(['/main/lab/build-test/' + id]);
  }

}

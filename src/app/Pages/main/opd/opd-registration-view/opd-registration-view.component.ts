import { Component, OnInit, ChangeDetectorRef, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { ApiService } from '../../../../Services/common/apiService';
import { RoutingService } from '../../../../Services/common/routing.service';
import { NzModalService } from 'ng-zorro-antd';
import * as moment from 'moment';

declare var $;

@Component({
  selector: 'app-opd-registration-view',
  templateUrl: './opd-registration-view.component.html',
  styleUrls: ['./opd-registration-view.component.css']
})
export class OpdRegistrationViewComponent implements OnInit {

  // tslint:disable-next-line:no-input-rename
  @Input('patient') patient;
  dataTable: any;
  getAllOPD: Array<any> = new Array<any>();
  flag = true;
  color = '#ceb33e';
  minDate = new Date(2017, 5, 10);
  maxDate = new Date(2018, 9, 15);
  edit = false;
  deleteSuccess = false;

  bsValue: Date = new Date();
  bsRangeValue: any = [new Date(2017, 7, 4), new Date()];

  colorTheme = 'theme-green';
  value: string;
  searchValue: any;
  isVisible = false;
  isConfirmLoading = false;
  ReverseOPDData = [];
  // private patientDetailsModal = {
  //   route: 'patient-details-modal',
  //   content: PatientDetailsModalComponent,
  //   onOk() {
  //     // ok code here
  //   },
  //   footer: false,
  //   width: '660px',
  //   componentParams: {
  //     name: ''
  //   },
  //   okText: 'Add',
  //   cancelText: 'Close'
  // };
  name: any;
  consultancyID: any;
  doctorID: any;
  isVital: any;
  OPDArr: Array<any> = new Array<any>();

  // tslint:disable-next-line:max-line-length
  constructor(private apiService: ApiService,
    private chRef: ChangeDetectorRef,
    private route: Router,
    private modalService: NzModalService,
    private routingService: RoutingService) {
    // constructor(private title: Title, private chRef: ChangeDetectorRef) {
    //   this.title.setTitle('PatientList');
    // }
  }
  ngOnInit() {
    // localStorage.removeItem('patient');
    this.apiService.OPDService.GetAllOPD().subscribe((res: any) => {
      this.getAllOPD = res.data;
      console.log('getAllPatient', this.getAllOPD);
      for (let i = this.getAllOPD.length - 1; i >= 0; i--) {
        this.ReverseOPDData.push(this.getAllOPD[i]);
      }
      this.OPDArr = this.ReverseOPDData;
      console.log('OPD Arr', this.OPDArr);
      this.DataTablesFunctionCallAfterDataInit();

    })
  }
  // selectRange(bsRangeValue) {
  //   console.log(bsRangeValue);
  //   // tslint:disable-next-line:no-debugger
  //   debugger;
  //   let startDate = moment(bsRangeValue[0]).format('YYYY-MM-DD');
  //   let endDate = moment(bsRangeValue[1]).format('YYYY-MM-DD');
  //   this.OPDArr = this.ReverseOPDData.filter((patient) => {
  //     return patient.createdOn > startDate && patient.createdOn < endDate;
  //   });

  //   console.log('Patient Data', this.OPDArr);
  // }
  Reset() {
    this.dataTable.search('').columns().search('').draw();
    $('#example tfoot th').each(function () {
      let title = $(this).text();
      // tslint:disable-next-line:max-line-length
      $(this).html('<input class="form-control" value="" style="width:80%; line-height: 1.5 !important;" type="text" placeholder="Search ' + title + '" />');
    });

  }

  editPatient(index, patient) {
    this.edit = index;
    console.log('works!');
    localStorage.setItem('patient', JSON.stringify(patient));
    this.routingService.navigateTo(['main/patient/add-patient']);
    console.log(patient, 'patientDETAILS');
  }
  deletePatient(id, index) {
    console.log(id);
    this.apiService.patientService.DeletePatientById(id).subscribe(res => {
      console.log(res);
      this.getAllOPD.splice(id, 1);
      console.log(this.getAllOPD);
    })
    this.deleteSuccess = true;
    setTimeout(() => {
      this.deleteSuccess = false;
    }, 4000);
  }
  openOPDModal(opd) {
    console.log(opd);
    if (opd) {
      this.showModal(opd);
    }
  }

  showModal(opd) {
    this.isVisible = true;
    this.name = opd.name;
    this.consultancyID = opd.consultancyTimingId;
    this.doctorID = opd.doctorCategoryId
    this.isVital = opd.isVital;
  }

  handleOk() {
    this.isConfirmLoading = true;
    setTimeout(() => {
      this.isVisible = false;
      this.isConfirmLoading = false;
    }, 3000);
  }

  handleCancel() {
    this.isVisible = false;
  }

  DataTablesFunction() {
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
      if (i === 6) {
      } else {
        // tslint:disable-next-line:max-line-length
        $(this).html('<input class="form-control" style="width:80%; line-height: 1.36 !important;" type="text" placeholder="Search" />');
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

  reset() {
    this.DataTablesFunctionCallAfterDataInit();
  }

  editOPD() {
    
    // tslint:disable-next-line:no-debugger
    debugger;
    console.log('Edit OPD');
    this.routingService.navigateTo(['main/opd/opd-registration']);
  }

  exportExcel() {
    $('#example').dataTable().fnDestroy();
    $(document).ready(function () {
      $('#example').DataTable({
        dom: 'Bfrtip',
        buttons: [{
          extend: 'pdf',
          text: 'Save current page',
          exportOptions: {
            modifier: {
              page: 'current'
            }
          }
        }, {
          extend: 'excel',
          title: 'Customized EXCEL Title',
          filename: 'customized_excel_file_name'
        }, {
          extend: 'csv',
          filename: 'customized_csv_file_name'
        }]
      });
    });
  }
  DeleteData(event) {
    // this.DeletedIndex = event;
    // this.apiService.OPDService.DeleteOPDTimmings(this.DeletedIndex).subscribe((res: any) => {

    //   this.GetAllOPD();
    // });
  }

}

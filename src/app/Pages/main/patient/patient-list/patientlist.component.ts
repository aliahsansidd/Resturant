import { Component, OnInit, ChangeDetectorRef, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { ApiService } from '../../../../Services/common/apiService';
import { RoutingService } from '../../../../Services/common/routing.service';
import { NzModalService, NzNotificationService } from 'ng-zorro-antd';
import * as moment from 'moment';
declare var $;

@Component({
  selector: 'app-patientlist',
  templateUrl: './patientlist.component.html',
  styleUrls: ['./patientlist.component.css']
})
export class PatientlistComponent implements OnInit {
  // tslint:disable-next-line:no-input-rename
  @Input('patient') patient;
  dataTable: any;
  getAllPatients: Array<any> = new Array<any>();
  flag = true;
  color = '#ceb33e';
  minDate = new Date(2017, 5, 10);
  maxDate = new Date(2018, 9, 15);
  edit = false;
  deleteSuccess = false;

  bsValue: Date = new Date();
  bsRangeValue: any = [new Date(this.bsValue.getFullYear(), this.bsValue.getMonth(), 1), new Date()];

  colorTheme = 'theme-green';
  value: string;
  searchValue: any;
  isVisible = false;
  isConfirmLoading = false;
  ReversePatientData = [];
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
  familyHeadName: any;
  emergencyNumber: any;
  maritalStatus: any;
  religion: any;
  createdAt: any;
  dob: any;

  patientArr: Array<any> = new Array<any>();
  firstName: any;
  lastName: any;
  address: any;
  city: any;
  gender: any;
  cardExpiry: any;
  cnic: any;
  landlineNumber: any;
  displayId: any;

  // tslint:disable-next-line:max-line-length
  constructor(private apiService: ApiService,
    private chRef: ChangeDetectorRef,
    private route: Router,
    private modalService: NzModalService,
    private notification: NzNotificationService,
    // private detailModal: PatientDetailsModalComponent,
    private routingService: RoutingService) {
    // constructor(private title: Title, private chRef: ChangeDetectorRef) {
    //   this.title.setTitle('PatientList');
    // }
  }
  ngOnInit() {
    localStorage.removeItem('patient');
    this.apiService.patientService.getAllPatient().subscribe((res: any) => {
      this.getAllPatients = res.data;
      console.log('getAllPatient', this.getAllPatients);
      for (let i = this.getAllPatients.length - 1; i >= 0; i--) {
        this.ReversePatientData.push(this.getAllPatients[i]);
        console.log(this.ReversePatientData);
      }
    //  this.patientArr = this.ReversePatientData;
      console.log(res.data);
      this.DataTablesFunctionCallAfterDataInit();

    })
  }
  selectRange() {

    // tslint:disable-next-line:no-debugger
    debugger;

    setTimeout(() => {
      let startDate = new Date(this.bsRangeValue[0].toISOString().split('T')[0]);
      let endDate = new Date(this.bsRangeValue[1].toISOString().split('T')[0]);
      this.ReversePatientData = this.getAllPatients.filter((patient) => {
        debugger;
        let a = new Date(patient.createdOn.split('T')[0]);
        return a >= startDate && a <= endDate;
      });

    }, 250);


    console.log('Patient Data', this.patientArr);
  }
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
      this.ReversePatientData.splice(index, 1);
      this.notification.create('success', 'Delete Success', 'Patient Deleted Successfully!');
      this.DataTablesFunctionCallAfterDataInit();
      console.log(this.getAllPatients);
    })
    this.deleteSuccess = true;
    setTimeout(() => {
      this.deleteSuccess = false;
    }, 4000);
  }
  openPatientModal(patient) {
    this.createdAt = patient.createdOn.split('T')[0];
    console.log(patient);
    if (patient) {
      this.showModal(patient);
    }
  }

  showModal(patient) {
    console.log(patient);
    this.isVisible = true;
    this.familyHeadName = patient.familyHeadName;
    this.emergencyNumber = patient.emergencyNumber
    this.dob = patient.dob
    this.maritalStatus = patient.maritalStatus
    this.firstName = patient.firstName
    this.lastName = patient.lastName
    this.religion = patient.religion
    this.address = patient.address
    this.city = patient.city
    this.gender = patient.gender
    this.cardExpiry = patient.cardExpiry
    this.cnic = patient.cnic
    this.landlineNumber = patient.landlineNumber
    this.displayId = patient.displayId
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
      'autoWidth': false,
      lengthMenu: [
        [10, 25, 50, -1],
        ['10 rows', '25 rows', '50 rows', 'Show all']
      ],
      buttons: [
        {
          extend: 'excelHtml5',
          title: 'Patient List',
          exportOptions: {
            columns: ':visible:not(.not-export-col)'
          }
        },
        {
          extend: 'csvHtml5',
          title: 'Patient List',
          exportOptions: {
            columns: ':visible:not(.not-export-col)'
          }
        },
        {
          extend: 'pdfHtml5',
          title: 'Patient List',
          exportOptions: {
            columns: ':visible:not(.not-export-col)'
          }
        }
        ,
        {
          extend: 'print',
          title: 'Patient List',
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
      if (i === 8 || i === 7) {
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
    // let tableData = this.getAllPatients;
    // this.getAllPatients = [];
    // this.getAllPatients = tableData;
    this.DataTablesFunctionCallAfterDataInit();
  }
}

import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import * as moment from 'moment';
import { ApiService } from 'app/Services/common/apiService';
import { RoutingService } from 'app/Services/common/routing.service';
import { Router } from '@angular/router';
import { NzNotificationService } from 'ng-zorro-antd';
declare var $;

@Component({
  selector: 'app-death-registration-view',
  templateUrl: './death-registration-view.component.html',
  styleUrls: ['./death-registration-view.component.css']
})
export class DeathRegistrationViewComponent implements OnInit {
  dataTable: any;
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
  getAllBirth: any;
  DisplayBirth: any;
  AllPatient: any;

  // tslint:disable-next-line:max-line-length
  constructor(private apiService: ApiService,
    private chRef: ChangeDetectorRef,
    private routingService: RoutingService,
    private router: Router,
    private notification: NzNotificationService) {

  }
  ngOnInit() {
    this.apiService.patientService.getAllPatient().subscribe((res: any) => {
      this.AllPatient = res.data;
    })
    // localStorage.removeItem('patient');
    this.apiService.birthAndDeath.GetAllDeath().subscribe((res: any) => {
      this.getAllBirth = res.data.sort(this.ArrayInDecending('id'));
      debugger;
      this.DisplayBirth = this.getAllBirth;
      this.DataTablesFunctionCallAfterDataInit();
    })
  }
  navigateTo(route) {
    this.router.navigate([route]);
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
  selectRange(bsRangeValue) {
    console.log(bsRangeValue);
    // tslint:disable-next-line:no-debugger
    debugger;
    let startDate = moment(bsRangeValue[0]).format('YYYY-MM-DD');
    let endDate = moment(bsRangeValue[1]).format('YYYY-MM-DD');
    let a = this.getAllBirth;
    this.DisplayBirth = this.getAllBirth.filter((birth) => {
      return birth.createdOn > startDate && birth.createdOn < endDate;
    });
    this.DataTablesFunctionCallAfterDataInit();
    console.log('Patient Data', this.DisplayBirth);
  }


  getPatientName(id) {
    // tslint:disable-next-line:triple-equals
    let a = this.AllPatient.find(x => x.id == id);
    if (a === undefined) {
      return '';
    } else {
      return a.firstName + ' ' + a.lastName;
    }
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
    // this.edit = index;
    // console.log('works!');
    // localStorage.setItem('patient', JSON.stringify(patient));
    //  this.routingService.navigateTo(['child/death-registration-view/' + index]);
    //  this.router.navigate(['main/child/death-registration-view'], { queryParams: { id: index } });
    this.routingService.navigateTo(['main/child/death-registration/' + index]);
    // console.log(patient, 'patientDETAILS');
  }
  deletePatient(id, index) {
    console.log(id);
    this.apiService.patientService.DeletePatientById(id).subscribe(res => {
      console.log(res);
      this.getAllBirth();
    })
    this.deleteSuccess = true;
    setTimeout(() => {
      this.deleteSuccess = false;
    }, 4000);
  }

  DeleteData(id) {
    debugger;
    this.apiService.birthAndDeath.DeleteDeath(id).subscribe((res: any) => {
      this.notification.create('success', 'Deleted', 'Deleted successfully');
      this.apiService.birthAndDeath.GetAllDeath().subscribe((res2: any) => {
        this.getAllBirth = res2.data.sort(this.ArrayInDecending('id'));
        debugger;
      })
    })
  }

  openPatientModal(patient) {
    console.log(patient);
    if (patient) {
      this.showModal(patient);
    }
  }

  showModal(patient) {
    console.log(patient);
    this.isVisible = true;
    // this.familyHeadName = patient.familyHeadName;
    // this.emergencyNumber = patient.emergencyNumber
    // this.dob = patient.dob
    // this.maritalStatus = patient.maritalStatus
    // this.religion = patient.religion
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
          title: 'Death Registration'
        },
        {
          extend: 'csvHtml5',
          title: 'Death Registration'
        },
        {
          extend: 'pdfHtml5',
          title: 'Death Registration'
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

  reset() {
    // let tableData = this.getAllPatients;
    // this.getAllPatients = [];
    // this.getAllPatients = tableData;
    this.DataTablesFunctionCallAfterDataInit();
  }
}

import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { ApiService } from '../../../../Services/common/apiService';
import { RoutingService } from '../../../../Services/common/routing.service';
import * as moment from 'moment';
import { Router } from '@angular/router';
declare var $;

@Component({
  selector: 'app-appointment-registration-view',
  templateUrl: './appointment-registration-view.component.html',
  styleUrls: ['./appointment-registration-view.component.css']
})
export class AppointmentRegistrationViewComponent implements OnInit {
  dataTable: any;
  allAppointments: any;
  flag = true;
  color = '#ceb33e';
  minDate = new Date(2017, 5, 10);
  maxDate = new Date(2018, 9, 15);
  edit = false;
  deleteSuccess = false;
  doctorName: any;
  bsValue: Date = new Date();
  bsRangeValue: any = [new Date(this.bsValue.getFullYear(), this.bsValue.getMonth(), 1), new Date()];
  colorTheme = 'theme-green';
  value: string;
  searchValue: any;
  isVisible = false;
  reverseAppointmentData = [];
  allAppointmentsData: any;
  constructor(private apiService: ApiService, private router: Router,
     private routingService: RoutingService, private chRef: ChangeDetectorRef) { }

  ngOnInit() {
    this.apiService.appointment.getAllAppointments().subscribe((res: any) => {
      this.allAppointments = res.data;
      this.allAppointmentsData = this.allAppointments;
      console.log(this.allAppointments, 'All Appointments are:');
    this.DataTablesFunctionCallAfterDataInit();

    })
  }
  selectRanges() {
    setTimeout(() => {
      let startDate = new Date(this.bsRangeValue[0].toISOString().split('T')[0]);
      let endDate = new Date(this.bsRangeValue[1].toISOString().split('T')[0]);
      this.allAppointmentsData = this.allAppointments.filter((adduser) => {
        let a = new Date(adduser.createdOn.split('T')[0]);
        return a >= startDate && a <= endDate;
      });

    }, 250);
  }
  selectRange(bsRangeValue) {
    console.log(bsRangeValue);
  }
  sendToOPD(appointment) {
    // this.api
    // this.apiService.appointment.sendAppointmentToOpd(appointment, true);
    this.router.navigate(['main/opd/opd-registration'], {queryParams: {id: appointment.id, docid: appointment.doctorId, si: true}});
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
    // setTimeout(() => {
    //   document.getElementById('listName').focus();
    // }, 200);
    // console.log(index);
    // console.log('data', data, 'list', listId);
    // console.log(this.sid);
  }
  // deletePatient(id, index) {
  //   console.log(id);
  //   this.apiService.patientService.DeletePatientById(id).subscribe(res => {
  //     console.log(res);
  //     this.getAllPatients.splice(id, 1);
  //     console.log(this.getAllPatients);
  //   })
  //   this.deleteSuccess = true;
  //   setTimeout(() => {
  //     this.deleteSuccess = false;
  //   }, 4000);
  // }
  // openModal(value) {
  //   console.log(value);
  //   //  $('#myModal').appendTo("body").modal('show');
  //   $('#exampleModalCenter').modal().show();
  //   $('#exampleModalCenter').remove();
  // }
  // showModal(): void {
  //   this.isVisible = true;
  // }

  // handleOk(): void {
  //   console.log('Button ok clicked!');
  //   this.isVisible = false;
  // }

  // handleCancel(): void {
  //   console.log('Button cancel clicked!');
  //   this.isVisible = false;
  // }
  // openPatientModal(patient) {
  //   console.log(patient);
  //   if (patient) {
  //     this.showModal(patient);
  //   }
  // }

  // showModal(patient) {
  //   console.log(patient);
  //   this.isVisible = true;
  //   this.familyHeadName = patient.familyHeadName;
  //   this.emergencyNumber = patient.emergencyNumber
  //   this.dob = patient.dob
  //   this.maritalStatus = patient.maritalStatus
  //   this.religion = patient.religion
  // }

  // handleOk() {
  //   this.isConfirmLoading = true;
  //   setTimeout(() => {
  //     this.isVisible = false;
  //     this.isConfirmLoading = false;
  //   }, 3000);
  // }

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

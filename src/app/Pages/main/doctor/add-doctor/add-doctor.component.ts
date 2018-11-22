import { Component, OnInit, ViewChild, ChangeDetectorRef } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ApiService } from '../../../../Services/common/apiService';
import { NzNotificationService } from 'ng-zorro-antd';
declare var $;
@Component({
  selector: 'app-add-doctor',
  templateUrl: './add-doctor.component.html',
  styleUrls: ['./add-doctor.component.css']
})
export class AddDoctorComponent implements OnInit {
  dataTable: any;
  flag = true;
  applicationUserDoctorId: any;
  doctorCategoryId: any;
  contact1 = '';
  contact2 = '';
  status = true;
  OPD = [];
  AddDoctor1: any;
  allDoctors: Array<any> = new Array<any>();
  filteredDoctors: Array<any> = new Array<any>();

  doctorData = [{
    category: '',
    doctor: '',
    id: -1
  }
  ]
  AddDoctor = {
    applicationUserDoctorId: '',
    doctorCategoryId: '',
    status: true,
    id: -1
  }
  Doctor = [
    { value: 1, text: 'ali usman' }

  ]

  SelectedOPD = [];
  SelectDoctor = [];


  Status = true;
  @ViewChild('f') myForm: NgForm;
  DeletedIndex: any;
  OPDType: any;
  selectedOPDs: any = [];
  // tslint:disable-next-line:max-line-length
  constructor(private apiService: ApiService, private chRef: ChangeDetectorRef,
    private notification: NzNotificationService) { }

  public ngOnInit() {
    this.getAllDoctors();
    this.GetAddDoctor();
    this.apiService.OPDService.GetAllOPDType().subscribe((res: any) => {
      this.OPDType = res.data
    });
    this.apiService.user.getAllUser()
      .subscribe(
        (res: any) => {
          console.log('Users', res);
        }
      )
  }

  getAllDoctors() {
    let count = 0;
    this.apiService.user.getAllUser()
      .subscribe(
        (res: any) => {
          this.allDoctors = res.data.result;

          for (let i = 0; i < this.allDoctors.length; i++) {
            for (let j = 0; j < this.allDoctors[i].roles.length; j++) {
              if (this.allDoctors[i].roles[j].name === 'Doctor') {
                this.filteredDoctors[count] = this.allDoctors[i];
                count++;
              }
            }
          }
          console.log('Filered', this.filteredDoctors)
        }
      )

  }

  GetAddDoctor() {
    this.apiService.OPDService.GellAllAddDoctor().subscribe((res: any) => {
      this.AddDoctor1 = res.data.sort(this.ArrayInDecending('id'));
      this.DataTablesFunctionCallAfterDataInit()
    });

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
  DataTablesFunctionCallAfterDataInit() {
    if (!this.flag) {
      this.dataTable.destroy();
      this.dataTable = null;
    }
    this.chRef.detectChanges();
    const table: any = $('#example');
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
          title: 'Register Doctor',
          exportOptions: {
            columns: ':visible:not(.not-export-col)'
          }
        },
        {
          extend: 'csvHtml5',
          title: 'Register Doctor',
          exportOptions: {
            columns: ':visible:not(.not-export-col)'
          }
        },
        {
          extend: 'pdfHtml5',
          title: 'Register Doctor',
          exportOptions: {
            columns: ':visible:not(.not-export-col)'
          }
        }
        ,
        {
          extend: 'print',
          title: 'Register Doctor',
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
  EditRecord(id) {
    let a = this.AddDoctor1.find(x => x.id === id);
    this.AddDoctor.doctorCategoryId = a.doctorCategoryId;
    this.AddDoctor.applicationUserDoctorId = a.applicationUserDoctorId;
    // this.AddDoctor.contact1 = a.contact1;
    // this.AddDoctor.contact2 = a.contact2;
    this.AddDoctor.status = a.status === 1 ? true : false;
    this.AddDoctor.id = a.id;
  }
  DeleteData(event) {
    this.DeletedIndex = event;
    this.apiService.OPDService.DeleteAddDoctor(this.DeletedIndex).subscribe((res: any) => {
      this.GetAddDoctor();
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
  onChange() {

  }
  Save(doctor) {
    if (!this.myForm.valid) {
      return null;
    }
    for (let entry of this.SelectedOPD) {
      this.selectedOPDs.push(entry.id);
    }
    if (this.AddDoctor.id > 0) {
      this.apiService.OPDService.updateAddDoctor(this.AddDoctor).subscribe(res => {
        console.log(res);
        this.GetAddDoctor();
        this.AddDoctor.id = -1;
        this.myForm.resetForm();
        this.notification.create('success', 'Update', 'Update successfully');
      })
    } else {
      console.log(this.AddDoctor);
      this.apiService.OPDService.SaveAddDoctor(this.AddDoctor).subscribe((res: any) => {
        console.log(res);
        this.GetAddDoctor();
        this.myForm.resetForm();
        this.notification.create('success', 'Saved', 'Saved successfully');
      });
    }
  }
}

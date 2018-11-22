import { Component, OnInit, ChangeDetectorRef, TemplateRef } from '@angular/core';
import { RoutingService } from '../../../../Services/common/routing.service';
import { ApiService } from '../../../../Services/common/apiService';
import * as moment from 'moment';
import { NzModalRef, NzModalService, NzNotificationService } from 'ng-zorro-antd';
import { isNullOrUndefined } from 'util';
declare var $;
@Component({
  selector: 'app-accident-patient-view',
  templateUrl: './accident-patient-view.component.html',
  styleUrls: ['./accident-patient-view.component.css']
})
export class AccidentPatientViewComponent implements OnInit {
  dataTable: any;
  flag = true;
  color = '#ceb33e';
  minDate = new Date(2017, 5, 10);
  maxDate = new Date(2018, 9, 15);
  edit = false;
  deleteSuccess = false;
  SelectedID: any;
  broughterDetails =
    {
      name: '',
      cnic: '',
      phone: '',
      address: ''
    };
  ambulanceDetails = {
    name: '',
    vehicleNo: '',
    centerNo: '',
    location: '',
    madadgarName: ''
  };

  public options: Object = {
    charCounterCount: true,
    // tslint:disable-next-line:max-line-length
    toolbarButtons: ['fullscreen', 'bold', 'italic', 'underline', '|', 'fontFamily', 'fontSize', 'color', 'inlineStyle', 'paragraphStyle', '|', 'paragraphFormat', 'align', 'formatOL', 'formatUL', 'outdent', 'indent', 'insertLink', 'insertTable', '|', 'specialCharacters', 'insertHR', 'insertImage']

  };



  bsValue: Date = new Date();
  bsRangeValue: any = [new Date(2017, 7, 4), new Date()];

  colorTheme = 'theme-green';
  value: string;
  searchValue: any;
  isVisible = false;
  isConfirmLoading = false;
  getAllBirth: any;
  DisplayBirth: any;
  getAllAccidentPatient: any;
  DisplayAccidentPatient: any;

  tplModal: NzModalRef;
  AccidentAndEmergency: any;
  // tslint:disable-next-line:max-line-length
  constructor(private apiService: ApiService,
    private chRef: ChangeDetectorRef,
    private routingService: RoutingService,
    private modalService: NzModalService,
    private notification: NzNotificationService) {

  }
  ngOnInit() {
    // localStorage.removeItem('patient');
    this.apiService.accidentAndEmergency.GetAllAccidentAndEmergency().subscribe((res: any) => {
      console.log(res.data);
      this.getAllAccidentPatient = res.data.sort(this.ArrayInDecending('id'));
      this.DisplayAccidentPatient = this.getAllAccidentPatient;
      this.DataTablesFunctionCallAfterDataInit();
    })
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

    console.log('Patient Data', this.DisplayBirth);
  }
  Reset() {
    this.dataTable.search('').columns().search('').draw();
    $('#example tfoot th').each(function () {
      let title = $(this).text();
      // tslint:disable-next-line:max-line-length
      $(this).html('<input class="form-control" value="" style="width:80%; line-height: 1.5 !important;" type="text" placeholder="Search ' + title + '" />');
    });

  }

  editPatient(id) {
    this.NavigateToAccidentPatient(id)
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

  openPatientModal(patient) {
    console.log(patient);
    if (patient) {
      this.showModal(patient);
    }
  }
  createTplModal(tplTitle: TemplateRef<{}>, tplContent: TemplateRef<{}>, tplFooter: TemplateRef<{}>, item): void {
    this.tplModal = this.modalService.create({
      nzTitle: tplTitle,
      nzContent: tplContent,
      nzFooter: tplFooter,
      nzMaskClosable: false,
      nzClosable: false,
      nzOnOk: () => console.log('Click ok')
    });
    // tslint:disable-next-line:max-line-length
    this.broughterDetails.name = item.broughterDetails.length > 0 ? isNullOrUndefined(item.broughterDetails[0].name) ? '' : item.broughterDetails[0].name : '';
    // tslint:disable-next-line:max-line-length
    this.broughterDetails.address = item.broughterDetails.length > 0 ? isNullOrUndefined(item.broughterDetails[0].address) ? '' : item.broughterDetails[0].address : '';
    // tslint:disable-next-line:max-line-length
    this.broughterDetails.cnic = item.broughterDetails.length > 0 ? isNullOrUndefined(item.broughterDetails[0].cnic) ? '' : item.broughterDetails[0].cnic : '';
    // tslint:disable-next-line:max-line-length
    this.broughterDetails.phone = item.broughterDetails.length > 0 ? isNullOrUndefined(item.broughterDetails[0].phone) ? '' : item.broughterDetails[0].phone : '';
    // tslint:disable-next-line:max-line-length
    this.ambulanceDetails.name = item.ambulanceDetails.length > 0 ? isNullOrUndefined(item.ambulanceDetails[0].name) ? '' : item.ambulanceDetails[0].name : '';
    // tslint:disable-next-line:max-line-length
    this.ambulanceDetails.centerNo = item.ambulanceDetails.length > 0 ? isNullOrUndefined(item.ambulanceDetails[0].centerNo) ? '' : item.ambulanceDetails[0].centerNo : '';
    // tslint:disable-next-line:max-line-length
    this.ambulanceDetails.madadgarName = item.ambulanceDetails.length > 0 ? isNullOrUndefined(item.ambulanceDetails[0].madadgarName) ? '' : item.ambulanceDetails[0].madadgarName : '';
    // tslint:disable-next-line:max-line-length
    this.ambulanceDetails.vehicleNo = item.ambulanceDetails.length > 0 ? isNullOrUndefined(item.ambulanceDetails[0].vehicleNo) ? '' : item.ambulanceDetails[0].vehicleNo : '';
    this.SelectedID = item.id;
    console.log(this.SelectedID);
  }
  NavigateToAccidentPatient(id) {
    this.routingService.navigateTo(['main/accident-emergency/add-patient-accident/' + id]);
  }

  editPatientByModal() {
    this.NavigateToAccidentPatient(this.SelectedID)
    this.destroyTplModal();
  }

  destroyTplModal(): void {
    this.tplModal.destroy();
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
      if (i === 7 || i === 6) {
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

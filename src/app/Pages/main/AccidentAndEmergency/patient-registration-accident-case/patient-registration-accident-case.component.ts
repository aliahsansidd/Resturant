import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { NzModalService, NzModalRef, NzNotificationService } from 'ng-zorro-antd';
import { ApiService } from '../../../../Services/common/apiService';
import { isNullOrUndefined } from 'util';
import { ActivatedRoute } from '@angular/router';
import { NgForm } from '@angular/forms';

declare var $;
@Component({
  selector: 'app-patient-registration-accident-case',
  templateUrl: './patient-registration-accident-case.component.html',
  styleUrls: ['./patient-registration-accident-case.component.css']
})
export class PatientRegistrationAccidentCaseComponent implements OnInit {

  tplModal: NzModalRef;
  AccidentAndEmergency = {
    patientID: 0,
    mrNo: '',
    mlNo: '',
    erNo: '',
    broughtDeath: false,
    guardian: '',
    gender: null,
    complaint: null,
    address: '',
    cnic: '',
    patientName: '',
    phone: '',
    catastrophicID: null,
    age: 0,
    status: 0,
    broughterDetails: [],
    ambulanceDetails: [],
    id: 0
  }

  Status = [
    { value: 1, text: 'Treated' },
    { value: 2, text: 'Death' },
    { value: 3, text: 'Discharge' },
    { value: 4, text: 'Admitted' },
  ];

  broughterDetails =
    {
      name: '',
      cnic: '',
      phone: '',
      address: '',
      modeOfArrival: 0,
      accidentAndEmergencyID: 0,
      id: 0
    }
  ambulanceDetails = {
    name: '',
    vehicleNo: '',
    centerNo: '',
    location: '',
    madadgarName: '',
    accidentAndEmergencyID: 0,
    id: 0
  }

  ShowERInput = false;
  isVisible = false;
  isConfirmLoading = false;
  AllPatientToFind: any;
  @ViewChild('#f') myform: NgForm;
  patient: any;
  AllCatastrophicEvents: any;
  constructor(private modalService: NzModalService,
    private apiService: ApiService,
    private route: ActivatedRoute,
    private notification: NzNotificationService) { }

  createTplModal(tplTitle: TemplateRef<{}>, tplContent: TemplateRef<{}>, tplFooter: TemplateRef<{}>): void {
    this.tplModal = this.modalService.create({
      nzTitle: tplTitle,
      nzContent: tplContent,
      nzFooter: tplFooter,
      nzMaskClosable: false,
      nzClosable: false,
      nzOnOk: () => console.log('Click ok')
    });
  }

  GetAllCatastrophic() {
    this.apiService.accidentAndEmergency.GetAllCatastrophic().subscribe((res: any) => {
      this.AllCatastrophicEvents = res.data.filter(x => x.status === 1);
    })
  }

  AssignValueToControl(id) {
    this.apiService.accidentAndEmergency.GetSingleAccidentAndEmergency(id).subscribe((res: any) => {
      debugger;
      this.AccidentAndEmergency.address = res.address;
      this.AccidentAndEmergency.age = res.age;
      this.AccidentAndEmergency.broughtDeath = res.broughtDeath;
      this.AccidentAndEmergency.catastrophicID = res.catastrophicID;
      this.AccidentAndEmergency.cnic = res.cnic;
      this.AccidentAndEmergency.complaint = res.complaint;
      this.AccidentAndEmergency.erNo = res.erNo;
      this.AccidentAndEmergency.gender = res.gender;
      this.AccidentAndEmergency.guardian = res.guardian;
      this.AccidentAndEmergency.id = res.id;
      this.AccidentAndEmergency.mlNo = res.mlNo;
      this.AccidentAndEmergency.mrNo = res.mrNo;
      this.AccidentAndEmergency.patientID = res.patientID;
      this.AccidentAndEmergency.phone = res.phone;
      this.AccidentAndEmergency.status = res.status;
      this.AccidentAndEmergency.patientName = res.patientName;

      // Assign Broughter Details Start

      // tslint:disable-next-line:max-line-length
      this.broughterDetails.name = res.broughterDetails.length > 0 ? isNullOrUndefined(res.broughterDetails[0].name) ? '' : res.broughterDetails[0].name : '';
      // tslint:disable-next-line:max-line-length
      this.broughterDetails.address = res.broughterDetails.length > 0 ? isNullOrUndefined(res.broughterDetails[0].address) ? '' : res.broughterDetails[0].address : '';
      // tslint:disable-next-line:max-line-length
      this.broughterDetails.cnic = res.broughterDetails.length > 0 ? isNullOrUndefined(res.broughterDetails[0].cnic) ? '' : res.broughterDetails[0].cnic : '';
      // tslint:disable-next-line:max-line-length
      this.broughterDetails.phone = res.broughterDetails.length > 0 ? isNullOrUndefined(res.broughterDetails[0].phone) ? '' : res.broughterDetails[0].phone : '';
      // tslint:disable-next-line:max-line-length
      this.broughterDetails.modeOfArrival = res.broughterDetails.length > 0 ? isNullOrUndefined(res.broughterDetails[0].modeOfArrival) ? '' : res.broughterDetails[0].modeOfArrival : '';
      // tslint:disable-next-line:max-line-length
      this.broughterDetails.id = res.ambulanceDetails.length > 0 ? isNullOrUndefined(res.ambulanceDetails[0].id) ? '' : res.ambulanceDetails[0].id : '';
      // tslint:disable-next-line:max-line-length
      this.broughterDetails.accidentAndEmergencyID = res.ambulanceDetails.length > 0 ? isNullOrUndefined(res.ambulanceDetails[0].accidentAndEmergencyID) ? '' : res.ambulanceDetails[0].accidentAndEmergencyID : '';

      // tslint:disable-next-line:max-line-length
      this.ambulanceDetails.name = res.ambulanceDetails.length > 0 ? isNullOrUndefined(res.ambulanceDetails[0].name) ? '' : res.ambulanceDetails[0].name : '';
      // tslint:disable-next-line:max-line-length
      this.ambulanceDetails.centerNo = res.ambulanceDetails.length > 0 ? isNullOrUndefined(res.ambulanceDetails[0].centerNo) ? '' : res.ambulanceDetails[0].centerNo : '';
      // tslint:disable-next-line:max-line-length
      this.ambulanceDetails.madadgarName = res.ambulanceDetails.length > 0 ? isNullOrUndefined(res.ambulanceDetails[0].madadgarName) ? '' : res.ambulanceDetails[0].madadgarName : '';
      // tslint:disable-next-line:max-line-length
      this.ambulanceDetails.vehicleNo = res.ambulanceDetails.length > 0 ? isNullOrUndefined(res.ambulanceDetails[0].vehicleNo) ? '' : res.ambulanceDetails[0].vehicleNo : '';
      // tslint:disable-next-line:max-line-length
      this.ambulanceDetails.location = res.ambulanceDetails.length > 0 ? isNullOrUndefined(res.ambulanceDetails[0].location) ? '' : res.ambulanceDetails[0].location : '';
      // tslint:disable-next-line:max-line-length
      this.ambulanceDetails.id = res.ambulanceDetails.length > 0 ? isNullOrUndefined(res.ambulanceDetails[0].id) ? '' : res.ambulanceDetails[0].id : '';
      // tslint:disable-next-line:max-line-length
      this.ambulanceDetails.accidentAndEmergencyID = res.ambulanceDetails.length > 0 ? isNullOrUndefined(res.ambulanceDetails[0].accidentAndEmergencyID) ? '' : res.ambulanceDetails[0].accidentAndEmergencyID : '';
    })
  }

  destroyTplModal(): void {
    this.tplModal.destroy();
  }

  getPatientByID(id) {
    this.apiService.patientService.getPatientById(id).subscribe((res: any) => {
      this.AssignvaluetoControl(res.data);
    })
  }
  AssignvaluetoControl(data) {
    this.patient = data;

    this.AccidentAndEmergency.patientName = this.patient.firstName + ' ' + this.patient.lastName;
    this.AccidentAndEmergency.gender = this.patient.gender;
    this.AccidentAndEmergency.mrNo = this.patient.displayId;
    this.AccidentAndEmergency.guardian = this.patient.familyHeadName;
    this.AccidentAndEmergency.age = this.patient.age;
    this.AccidentAndEmergency.cnic = this.patient.cnic;
    this.AccidentAndEmergency.address = this.patient.address;
    this.AccidentAndEmergency.patientID = this.patient.id;
    this.AccidentAndEmergency.phone = this.patient.cellNumber;
  }

  showModal(patient) {
    console.log(patient);
    this.isVisible = true;
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

  getAllPatient() {
    this.apiService.patientService.getAllPatient().subscribe((res: any) => {
      this.AllPatientToFind = res.data;
    })
  }

  Save() {
    debugger;
    this.AccidentAndEmergency.broughterDetails.push(this.broughterDetails);
    this.AccidentAndEmergency.ambulanceDetails.push(this.ambulanceDetails);
    this.apiService.accidentAndEmergency.SaveAccidentAndEmergency(this.AccidentAndEmergency).subscribe((res: any) => {
      this.notification.create('success', 'Success', 'Saved Successfully');
      this.AccidentAndEmergency = res.data;
    },
      (error) => {
        this.notification.create('error', 'Error', 'Something went wrong')
      }
    );
  }

  ngOnInit() {

    let a = this.route.snapshot.params.id;
    if (!isNullOrUndefined(a)) {
      this.AssignValueToControl(a);
    }
    debugger;
    this.getAllPatient();
    this.apiService.patientService.$addPatientObservable.subscribe(res => {
      console.log(res);
      this.getPatientByID(res);
      this.handleCancel();
    });
    this.GetAllCatastrophic();
  }
  openModal(value) {
    console.log(value);
    //  $('#myModal').appendTo('body').modal('show');
    $('#exampleModalCenter').modal().show();
    $('#exampleModalCenter').remove();
  }
  closeModal(value) {
    console.log(value);
    $('#exampleModalCenter').modal().hide();
    $('.modal-backdrop').remove();
  }
}

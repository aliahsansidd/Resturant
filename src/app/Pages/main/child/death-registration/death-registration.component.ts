import { Component, OnInit, ViewChild } from '@angular/core';
import * as moment from 'moment';
import { ApiService } from 'app/Services/common/apiService';
import { isNullOrUndefined } from 'util';
import { SearchFieldComponent } from 'app/CommonComponents/search-field/search-field.component';
import { ActivatedRoute, Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { NzNotificationService } from 'ng-zorro-antd';
@Component({
  selector: 'app-death-registration',
  templateUrl: './death-registration.component.html',
  styleUrls: ['./death-registration.component.css']
})
export class DeathRegistrationComponent implements OnInit {
  PatientData: any;
  PatientDetails: any = [];

  @ViewChild(SearchFieldComponent)
  searchField: SearchFieldComponent;
  MrNo = '';
  Death =
    {
      deathDate: '',
      deathTime: '',
      admissionDate: '',
      admissionTime: '',
      displayId: '',
      type: null,
      bookSrNumber: '',
      occupation: '',
      province: '',
      townOrVillage: '',
      patientId: 0,
      deathDateTime: '',
      admissionDateTime: '',
      admissionNo: '',
      reasonOfDeath: null,
      isCertificatePrinted: true,
      status: 0,
      id: 0,
      name: '',
      PatientDetails: {
        familyHeadName: '',
        gender: '',
        maritalStatus: '',
        address: '',
        id: ''
      },
      age: ''
    }
  formattedDOB: any;
  cardDOB: any;
  currentDate: moment.Moment;
  isVisible = false;
  isConfirmLoading = false;
  DataToPrint: any;
  @ViewChild('fm') myForm: NgForm;
  // tslint:disable-next-line:max-line-length
  constructor(private apiService: ApiService, private _route: Router, private route: ActivatedRoute, private notification: NzNotificationService) { }

  ngOnInit() {
    this.getAllPatient();
    this.apiService.patientService.$addPatientObservable.subscribe(res => {
      debugger;
      console.log(res);
      this.FilterByMrNo(res, false);
      this.handleCancel();
    })
    let a = this.route.snapshot.params.id;
    if (!isNullOrUndefined(a)) {
      this.AssignValueToControl(a);
    }
  }
  navigateTo(route) {
    this._route.navigate([route]);
  }
  getAllPatient() {
    this.apiService.patientService.getAllPatient().subscribe((res: any) => {
      this.PatientData = res.data;

      if (this.Death.id > 0) {
        this.FilterByMrNo(this.Death.patientId, false);
      }

    })
  }

  AssignValueToControl(id) {
    this.apiService.birthAndDeath.GetDeathByID(id).subscribe((res: any) => {
      debugger;
      this.Death.admissionDate = res.data.admissionDateTime.split('T')[0];
      this.Death.age = res.data.age;
      this.Death.admissionTime = res.data.admissionDateTime.split('T')[1];
      this.Death.deathDate = res.data.deathDateTime.split('T')[0];
      this.Death.deathTime = res.data.deathDateTime.split('T')[1];
      this.Death.bookSrNumber = res.data.bookSrNumber;
      this.Death.displayId = res.data.displayId;
      this.Death.id = res.data.id;
      this.Death.isCertificatePrinted = res.data.isCertificatePrinted;
      this.Death.name = res.data.name;
      this.Death.occupation = res.data.occupation;
      this.Death.patientId = res.data.patientId;
      this.FilterByMrNo(this.Death.patientId, false);
      this.Death.province = res.data.province;
      this.Death.reasonOfDeath = res.data.reasonOfDeath;
      this.Death.status = res.data.status;
      this.Death.townOrVillage = res.data.townOrVillage;
      this.Death.type = res.data.type;
      this.Death.admissionNo = res.data.admissionNo;
    })
  }

  getFullname(rowData): string {

    // tslint:disable-next-line:max-line-length
    let firstName = rowData[0].firstName;
    let MiddleName = isNullOrUndefined(rowData[0].middleName) ? '' : rowData[0].middleName;
    let lastName = isNullOrUndefined(rowData[0].lastName) ? '' : rowData[0].lastName;
    return firstName + ' ' + MiddleName + ' ' + lastName;
  }

  public calculatePatientAge(birthday): string {
    this.formattedDOB = moment(birthday).format('YYYY/MM/DD');
    this.cardDOB = moment(birthday).format('DD/MMM/YYYY');
    this.Death.age = birthday;
    console.log(this.formattedDOB);
    console.log(this.cardDOB);
    console.log(this.Death.age);
    let end = moment(this.formattedDOB);
    this.currentDate = moment();
    console.log(this.currentDate);
    let currentDate = moment(this.currentDate); // new date
    let dob = moment(end); // DOB

    let years = currentDate.diff(dob, 'year');
    dob.add(years, 'years');

    let months = currentDate.diff(dob, 'months');
    dob.add(months, 'months');

    let days = currentDate.diff(dob, 'days');
    if (dob < this.currentDate) {
      return years + 'Y ' + months + 'M ' + days + 'D'
      // this.patient.age = this.finalAge;
    } else {
      // this.error = true;
      // this.finalAge = 'Date Cannot be higher than the current date';
      // this.patient.age = this.finalAge;
      // setTimeout(() => {
      //   console.log('timeOUT');
      //   this.finalAge = 'Select Date of Birth';
      //   this.patient.age = this.finalAge;
      // }, 3000);
      return '';
    }
    // console.log(this.finalAge);

    // 8 years 5 months 2 days

  }

  FilterByMrNo(IdAndMr, isMr) {
    debugger;
    let x = [];
    if (isMr) {
      x = this.PatientData.filter(y => y.displayId === IdAndMr);
    } else {
      x = this.PatientData.filter(y => y.id === IdAndMr);
    }
    if (x.length > 0) {
      this.Death.PatientDetails.id = x[0].id;
      this.Death.PatientDetails.address = x[0].address;
      this.Death.PatientDetails.familyHeadName = x[0].familyHeadName;
      this.Death.displayId = x[0].displayId;
      this.Death.PatientDetails.gender = String(x[0].gender).toLowerCase();
      this.Death.PatientDetails.maritalStatus = x[0].maritalStatus;
      this.Death.name = this.getFullname(x);
      this.Death.age = this.calculatePatientAge(x[0].dob);
      this.Death.patientId = x[0].id;

    }
  }
  Save() {
    if (this.myForm.invalid) {
      return null;
    }
    this.Death.admissionDateTime = new Date(this.Death.admissionDate).toISOString().split('T')[0] + 'T' + this.Death.admissionTime;
    this.Death.deathDateTime = new Date(this.Death.deathDate).toISOString().split('T')[0] + 'T' + this.Death.deathTime;
    if (this.Death.id > 0) {
      this.apiService.birthAndDeath.UpdateDeath(this.Death).subscribe((res: any) => {
        debugger;
        this.notification.create('Updated', 'Updated', 'Updated successfully');
        this.DataToPrint = this.Death;
      });
    } else {
      this.apiService.birthAndDeath.SaveDeath(this.Death).subscribe((res: any) => {
        debugger;
        this.notification.create('success', 'Saved', 'Saved successfully');
        this.DataToPrint = this.Death;
      });
    }


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

    this.searchField.searchItem = [];
    this.searchField.value = '';
  }

}

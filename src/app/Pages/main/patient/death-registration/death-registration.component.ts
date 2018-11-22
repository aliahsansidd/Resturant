import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../../../Services/common/apiService';
import { isNullOrUndefined } from 'util';
import { PatientRegistrationComponent } from '../patient-registration/patient-registration.component';
import * as moment from 'moment';
@Component({
  selector: 'app-death-registration',
  templateUrl: './death-registration.component.html',
  styleUrls: ['./death-registration.component.css']
})
export class DeathRegistrationComponent implements OnInit {
  PatientData: any;
  PatientDetails: any = [];
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
      patientId: 0,
      deathDateTime: '',
      admissionDateTime: '',
      admissionNo: '',
      reasonOfDeath: null,
      isCertificatePrinted: true,
      status: 0,
      id: 0,
      name: '',
      PatientDetails: [],
      age: ''
    }
  formattedDOB: any;
  cardDOB: any;
  currentDate: moment.Moment;
  isVisible = false;
  isConfirmLoading = false;
  constructor(private apiService: ApiService) { }

  ngOnInit() {
    debugger;
    this.getAllPatient();
  }
  getAllPatient() {
    this.apiService.patientService.getAllPatient().subscribe((res: any) => {
      debugger;
      this.PatientData = res.data;
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
  FilterByMrNo() {
    debugger;
    this.Death.PatientDetails = this.PatientData.filter(x => x.displayId === this.Death.displayId);
    if (this.Death.PatientDetails.length > 0) {
      this.Death.name = this.getFullname(this.Death.PatientDetails);
      this.Death.age = this.calculatePatientAge(this.Death.PatientDetails[0].dob);
      this.Death.patientId = this.Death.PatientDetails[0].id;
    }
  }
  Save() {
    debugger;
    this.Death.admissionDateTime = new Date(this.Death.admissionDate).toISOString().split('T')[0] + 'T' + this.Death.admissionTime;
    this.Death.deathDateTime = new Date(this.Death.deathDate).toISOString().split('T')[0] + 'T' + this.Death.deathTime;
    this.apiService.birthAndDeath.SaveDeath(this.Death).subscribe((res: any) => {
debugger;
    });
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

}

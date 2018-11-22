import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';
import { Router } from '@angular/router';
import { subscribeOn } from 'rxjs-compat/operator/subscribeOn';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { ApiService } from '../../../../Services/common/apiService';
import { NzNotificationService, NzModalService } from 'ng-zorro-antd';


declare var $;

@Component({
  selector: 'app-patient-registration',
  templateUrl: './patient-registration.component.html',
  styleUrls: ['./patient-registration.component.css']
})
export class PatientRegistrationComponent implements OnInit {

  patient = {
    firstName: '',
    lastName: '',
    familyHeadName: '',
    cellNumber: '',
    landLineNumber: '',
    emergencyNumber: '',
    address: '',
    cnic: '',
    city: '',
    dob: '',
    age: '',
    gender: 'Male',
    religion: 'Muslim',
    maritalStatus: 'UnMarried',
    displayId: '',
    id: '',
    Status: true,
    createdOn: '',
    cardExpiry: ''
  };
  ShowERInput = false;
  firstnameinvalid = true;
  firstnamevalid = false;

  middlenameinvalid = true;
  middlenamevalid = false;
  disable = false;

  telnumberinvalid = true;
  telnumbervalid = false;
  // Religions = [
  //   { value: 1, text: 'Muslim' },
  //   { value: 2, text: 'Hindu' },
  //   { value: 3, text: 'other' }
  // ];

  Patient = {
    Rel: 1
  };
  patientForm: FormGroup;
  fname: any = /^[A-Z a-z]+$/;
  phone: any = /^[0-9]+$/;
  phone_valid: any = /^[0-9]+$/;
  number: any = /^[0-9]+$/;
  newDate: any;
  validity: any;
  expiryDate: any;
  getAllPatients: any;
  calculatedAge: any = '0 years';
  age: any;
  currentDate: any;
  finalAge: any;
  calculatedDays: any;
  calculatedYears: any;
  calculatedMonths: any;
  formattedDOB: any;
  cardDOB: string;
  patientId: any;
  expiry: any;
  error = false;
  genderType: any;
  cardExpiryInYears: any;
  cardImage: any;
  // tslint:disable-next-line:max-line-length
  constructor(private route: Router, private apiService: ApiService, private _sanitizer: DomSanitizer, private fb: FormBuilder , private notification: NzNotificationService) {
    this.patientForm = this.fb.group({
      FirstName: [undefined, [Validators.pattern(/[a-zA-Z]*/)]],
      LastName: [undefined, [Validators.pattern(/[a-zA-Z]*/)]],
      Guardian: [undefined, [Validators.pattern(/[a-zA-Z]*/)]],
      CellNumber: [undefined, [Validators.pattern(/\d{11}/)]],
      Emergency: [undefined, [Validators.pattern(/\d{11}/)]],
      LandLine: [undefined, [Validators.pattern(/\d{11}/)]],
      Address: [undefined, [Validators.required]],
      CNIC: [undefined, [Validators.pattern(/\d{14}/)]],
      DOB: [undefined, [Validators.required]],
      City: [undefined, [Validators.pattern(/[a-zA-Z]*/)]],
      Age: [undefined],
      MaritalStatus: [undefined],
      Gender: {
        Male: [undefined],
        Female: [undefined]
      },
      Religion: [undefined]
    });
  }


  ngOnInit() {
    this.cardExpiryInYears = 5;
    this.apiService.card.getCardDetails().subscribe((res: any) => {
      // this.cardExpiryInYears = res.data[4].value;
      this.cardImage = this._sanitizer.bypassSecurityTrustResourceUrl('data:image/jpg;base64,' + res.data[2].value);
      console.log(this.cardExpiryInYears);
    })
    // this.newDate = this.apiService.date.getCurrentDate();
    // this.expiryDate = this.apiService.date.getExpiryDate();
    this.newDate = new Date();
        let currentDate = this.newDate.getDate();
        let currentMonth = this.newDate.getMonth() + 1;
        let currentYear = this.newDate.getFullYear();
        this.validity = this.newDate.getFullYear() + this.cardExpiryInYears;
         this.newDate = currentDate + '/' + currentMonth + '/' + currentYear;
            this.expiryDate = currentDate + '/' + currentMonth + '/' + this.validity;
        // setTimeout(() => {
        //     console.log('TIMEOUT');
        // }, 20000)
    // })
    console.log(localStorage.length);
    if (localStorage.length > 1) {
    this.patient = JSON.parse(localStorage.getItem('patient'));
      this.calculatePatientAge(this.patient.dob);
  }
    // this.genderType = this.patient.gender;
    console.log(this.expiryDate);
    this.firstnameinvalid = true;
    this.firstnamevalid = false;
    // let dob = this.patient.dob;
    this.middlenameinvalid = true;
    this.middlenamevalid = false;

    this.telnumberinvalid = true;
    this.telnumbervalid = false;
  }
  // shouldFormDisable() {
  //   console.log(this.patientForm.controls.email.value);
  //   // tslint:disable-next-line:max-line-length
  //   const firstName = this.patientForm.controls.firstName.value === null ||
  //  this.patientForm.controls.firstName.value === '' || this.patientForm.controls.firstName.value === undefined;
  //   return firstName || this.patientForm.invalid;
  // }
  setGender(value) {
    this.patient.gender = value;
  }
  setMaritalStatus(value) {
    this.patient.maritalStatus = value;
  }
  toggleError() {
    $('[data-toggle="popover"]').popover();
  }
  // genderSet(gender) {
  //   console.log(gender);
  //   this.genderType = gender;
  // }

  calculatePatientAge(birthday) {
    this.formattedDOB = moment(birthday).format('YYYY/MM/DD');
    this.cardDOB = moment(birthday).format('DD/MMM/YYYY');
    this.patient.dob = birthday;
    console.log(this.formattedDOB);
    console.log(this.cardDOB);
    console.log(this.patient.dob);
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
      this.finalAge = years + 'Y ' + months + 'M ' + days + 'D'
      this.patient.age = this.finalAge;
    } else {
      this.error = true;
      // this.finalAge = 'Date Cannot be higher than the current date';
      // this.patient.age = this.finalAge;
      setTimeout(() => {
        console.log('timeOUT');
        this.finalAge = 'Select Date of Birth';
        this.patient.age = this.finalAge;
      }, 3000);
    }
    console.log(this.finalAge);


  }
  createPatient(patient) {
    console.log(patient);
      if (localStorage.length <= 1) {
        console.log(localStorage.length, 'LOcal Storage');
        this.apiService.patientService.AddPatient(patient).subscribe((res: any)  => {
        console.log(res, 'patientDATA');
        patient.displayId = res.data.displayId;
        patient.id = res.data.id;
        patient.cardExpiry = this.expiryDate;
        patient.createdOn = this.newDate;
          localStorage.setItem('patient', JSON.stringify(patient));
        this.route.navigate(['main/patient/patient-summary']);
          })
      // )
    } else {
      console.log(patient);
      this.patient = {
        firstName: patient.firstName,
        lastName: patient.lastName,
        familyHeadName: patient.familyHeadName,
        cellNumber: patient.cellNumber,
        landLineNumber: patient.landLineNumber,
        emergencyNumber: patient.emergencyNumber,
        address: patient.address,
        cnic: patient.cnic,
        city: patient.city,
        dob: patient.dob,
        age: patient.age,
        gender: patient.gender,
        religion: patient.religion,
        maritalStatus: patient.maritalStatus,
        displayId: patient.displayId,
        id: patient.id,
        Status: true,
        cardExpiry: patient.cardExpiry,
        createdOn: patient.createdOn
      };
      localStorage.setItem('patient', JSON.stringify(this.patient));
      this.apiService.patientService.UpdatePatient(this.patient).subscribe(res => {
        console.log(res);
      })
       this.route.navigate(['main/patient/patient-summary']);
    }
  }
  onSubmit(patient) {
    console.log(patient);
    if (this.patientForm.valid) {
      this.createPatient(patient);
      this.notification.create('success', 'Saved', 'Saved successfully');
      console.log('form submitted');
    } else {
      Object.keys(this.patientForm.controls).forEach(field => { // {1}
        const control = this.patientForm.get(field);
        console.log(control);        // {2}
        control.markAsTouched({ onlySelf: true });       // {3}
      });
    }
  }
  isFieldValid(field: string) {
    // return !this.patientForm.get(field).invalid;
    return !this.patientForm.get(field).valid && this.patientForm.get(field).touched;
  }
  validateAllFormFields(formGroup: FormGroup) {
    console.log(formGroup);        // {1}
    console.log(formGroup.controls);        // {1}
  Object.keys(formGroup.controls).forEach(field => {  // {2}
    const control = formGroup.get(field);             // {3}
    if (control instanceof FormControl) {             // {4}
      control.markAsTouched({ onlySelf: true });
    } else if (control instanceof FormGroup) {        // {5}
      this.validateAllFormFields(control);            // {6}
    }
  });
}
  resetFields() {
  return  this.patient = {
    firstName: '',
    lastName: '',
    familyHeadName: '',
    cellNumber: '',
    landLineNumber: '',
    emergencyNumber: '',
    address: '',
    cnic: '',
    city: '',
    dob: '',
    gender: 'Male',
    religion: 'Muslim',
    maritalStatus: 'UnMarried',
    age: '',
    displayId: '',
    id: '',
    Status: true,
    createdOn: '',
    cardExpiry: ''
  };
}
}

import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';
import { ApiService } from '../../../../Services/common/apiService';
import * as moment from 'moment';
@Component({
  selector: 'app-registersummary',
  templateUrl: './registersummary.component.html',
  styleUrls: ['./registersummary.component.css']
})
export class RegisterSummaryComponent implements OnInit {
  patient = {
    firstName: '',
    middleName: '',
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
    gender: '',
    religion: '',
    maritalStatus: '',
    Status: true,
    cardExpiry: '',
    createdOn: '',
    displayId: ''
  };
  cardPrint = {
    card: 'background'
  }
  newDate: any;
  hidePreviewCard = false;
  expiryDate: any;
  cardPrice: any;
  background: 'background';
  showCard = true;
  cardImage: any;
  cardImageBack: any;
  toPrint = false;
  blankCardPrint = false;
  switchValue = false;
  showCardBackArea = false;
  formattedDOB: string;
  cardDOB: string;
  currentDate: moment.Moment;
  finalAge: string;
  error: boolean;
  constructor(private apiService: ApiService, private route: Router, private _sanitizer: DomSanitizer) {
    this.patient = JSON.parse(localStorage.getItem('patient'));
    this.patient.displayId = this.patient.displayId.toUpperCase();
    this.calculatePatientAge(this.patient.dob);
    // this.apiService.patientService.$addPatientObservable.subscribe(res => {
    //   console.log(res);
    //   this.patient = res;
    //   console.log(this.patient.firstName);
    // })
   }

  ngOnInit() {
    this.newDate = this.apiService.date.getCurrentDate();
    this.expiryDate = this.patient.cardExpiry;
    this.apiService.card.getCardDetails().subscribe((res: any) => {
      console.log(res);
      this.cardPrice = res.data[0].value;
      this.cardImage = this._sanitizer.bypassSecurityTrustResourceUrl('data:image/jpg;base64,' + res.data[2].value);
      this.cardImageBack = this._sanitizer.bypassSecurityTrustResourceUrl('data:image/jpg;base64,' + res.data[3].value);
    })
  }
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
  switched(value) {
    console.log('Switched', value);
    if (value === true) {
      this.showCardBackArea = true;
    } else {
      this.showCardBackArea = false;
    }
  }
  print() {
    // this.printCard('blank');
    this.toPrint = true;
    console.log(this.showCard);
      if (this.showCard === true) {
        this.hidePreviewCard = true;
        console.log(this.showCard);
        let a = document.getElementById('image-card').innerHTML;
      document.body.innerHTML = a;
      window.print();
      location.reload();
    } else {
      this.blankCardPrint = true;
      console.log(this.showCard);
      let a = document.getElementById('image-card').innerHTML;
      document.body.innerHTML = a;
      window.print();
      location.reload();
    }
    // let printContents, popupWin;
    // printContents = document.getElementById('printable-card').innerHTML;
    // // popupWin = window.open('', '_blank', 'top=0,left=0,height=100%,width=auto');
    // popupWin = window.open();
    // popupWin.document.open();
    // popupWin.document.write(`
    //   <html>
    //     <head>
    //       <title>Print tab</title>
    //       <style>
    //       //........Customized style.......
    //       </style>
    //     </head>
    // <body onload="window.print();window.close()">${printContents}</body>
    //   </html>`
    // );
    // popupWin.document.close();
    // let b = document.body.innerHTML;
  }
  edit() {
    this.route.navigate(['main/patient/add-patient']);
  }
  printCard(option) {
    if (option === 'blank') {
      this.showCard = false;
    console.log(this.showCard);
  } else if (option === 'background') {
    this.showCard = true;
    console.log(this.showCard);
  }
  }
}

import { Component, OnInit } from '@angular/core';
// import { Patient } from '../../Modals/patient.model';
@Component({
  selector: 'app-opd-summary',
  templateUrl: './opd-summary.component.html',
  styleUrls: ['./opd-summary.component.css']
})
export class OpdSummaryComponent implements OnInit {
  patient = {
    firstname: '',
    middlename: '',
    lastname: '',
    familyheadname: '',
    telnumber: '',
    landlinenumber: '',
    emergencynumber: '',
    address: '',
    Cnic: '',
    City: '',
    DOB: '',
    Age: '',
    Gender: '',
    Religion: '',
    MaritalStatus: '',
    Status: true
  };

  constructor() { }

  ngOnInit() {
  }

}

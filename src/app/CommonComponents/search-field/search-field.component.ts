import { Component, OnInit, Input, Output } from '@angular/core';
import { ApiService } from '../../Services/common/apiService';

@Component({
  selector: 'app-search-field',
  templateUrl: './search-field.component.html',
  styleUrls: ['./search-field.component.css']
})
export class SearchFieldComponent implements OnInit {
  searchItem = [];
  patientData = [];
  people = [];
  value = '';
  @Input('patientData')
  set index(value) {
    console.log(value);
    this.patientData = value;
  }
  @Output()
  outputItem = this.searchItem;
  // @Input('patientData')
  // set peep(value) {
  //   // this.patientData = value;
  // }
  // patientData: any;
  hide = false;
  constructor(private apiService: ApiService) {
    // this.apiService.patientService.AddPatient(this.searchItem);
   }

  ngOnInit() {
    console.log(this.patientData);
    console.log(this.searchItem);
  }
  SelectedRecord(index) {
    console.log(index);
    this.apiService.patientService.sendPatientToSummary(index);
    // this.SelectedIndexOfAnArray = this.searchItem[index];
    // console.log(this.SelectedIndexOfAnArray);
    // this.apiService.patientService.getPatientById(this.SelectedIndexOfAnArray.id).subscribe((res: any) => {
    //   console.log(res);
    //   this.mrNumber = res.data.displayId;
    //   this.fullName = res.data.firstName + ' ' + res.data.lastName;
    //   this.cellNumber = res.data.cellNumber;
    //   this.firstName = res.data.firstName;
    // });

    // this.isDisabled = true;
  }
  onInput(value) {
    console.log(this.patientData);
    let self = this;
    this.searchItem = this.patientData.filter(function (patient) {
      console.log(value);
      if (patient.firstName.toLowerCase().includes(value.toLowerCase())) {
        return patient
      } else if (patient.displayId.toLowerCase().includes(value.toLowerCase())) {
        return patient;
      } else if (patient.cellNumber.includes(value)) {
        return patient;
      } else if ((patient.firstName.toLowerCase() + ' ' + patient.lastName.toLowerCase()).includes(value)) {
        return patient;
      } else if (value === '' || value === undefined) {
        self.hide = true;
        console.log(self.hide);
        return self.hide;
      }
    });
    if (value === '') {
      this.searchItem = [];
    }
  }
}

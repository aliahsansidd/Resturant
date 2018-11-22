import { Component, OnInit } from '@angular/core';
import { text } from '@angular/core/src/render3/instructions';

declare var $;
@Component({
  selector: 'app-patient-registration-accident-case',
  templateUrl: './patient-registration-accident-case.component.html',
  styleUrls: ['./patient-registration-accident-case.component.css']
})
export class PatientRegistrationAccidentCaseComponent implements OnInit {
  Complaint = [
    { value: 1, text: 'road Accident' },
    { value: 2, text: 'others' }
  ];

  Brought = [
    { value: 1, text: 'Alive' },
  ];
  Status = [
    { value: 1, text: 'Treated' },
    { value: 2, text: 'Death' },
    { value: 3, text: 'Discharge' },
    { value: 4, text: 'Admitted' },
  ];
  Catastrophic = [
    { value: 1, text: 'heatwave' },
    { value: 2, text: 'tsunami' }
  ]
  ambulance = [
    { value: 1, text: 'car' },
    { value: 2, text: 'other' }
  ]
  ShowERInput = false;
  constructor() { }

  ngOnInit() {
    $('#dia_login').on('shown', function() {
    $('#Broughtername').focus();
  })
  }
  openModal(value) {
    console.log(value);
    //  $('#myModal').appendTo("body").modal('show');
    $('#exampleModalCenter').modal().show();
    $('#exampleModalCenter').remove();
  }
  closeModal(value) {
    console.log(value);
    $('#exampleModalCenter').modal().hide();
    $('.modal-backdrop').remove();
  }
}

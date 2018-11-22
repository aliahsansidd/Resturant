import { Component, OnInit } from '@angular/core';
import { canActivateMainChildGuard } from '../../../Services/common/mainguard.service';

@Component({
  selector: 'app-patient',
  templateUrl: './patient.component.html',
  styleUrls: ['./patient.component.css']
})
export class PatientComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}

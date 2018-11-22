import { Component, OnInit } from '@angular/core';
import { canActivateMainChildGuard } from '../../../Services/common/mainguard.service';

@Component({
  selector: 'app-doctor',
  providers: [canActivateMainChildGuard],
  templateUrl: './doctor.component.html',
  styleUrls: ['./doctor.component.css']
})
export class DoctorComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}

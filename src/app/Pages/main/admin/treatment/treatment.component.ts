import { Component, OnInit } from '@angular/core';
import { canActivateMainChildGuard } from '../../../../Services/common/mainguard.service';

@Component({
  selector: 'app-treatment',
  providers: [canActivateMainChildGuard],
  templateUrl: './treatment.component.html',
  styleUrls: ['./treatment.component.css']
})
export class TreatmentComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}

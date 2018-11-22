import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-income-setup',
  templateUrl: './income-setup.component.html',
  styleUrls: ['./income-setup.component.css']
})
export class IncomeSetupComponent implements OnInit {
  Status = true;
  Income = {
    id: '',
    description: '',
    status: '',
  }

  @ViewChild('f') myForm: NgForm;
  constructor() { }

  ngOnInit() {
  }

}

import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-create-account',
  templateUrl: './create-account.component.html',
  styleUrls: ['./create-account.component.css']
})
export class CreateAccountComponent implements OnInit {
  level = {
    code: '',
    Description: '',
    Order: '',
    Digits: ''
  }
  @ViewChild('f') myForm: NgForm;
  constructor() { }

  ngOnInit() {
  }

}


import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-setup',
  templateUrl: './setup.component.html',
  styleUrls: ['./setup.component.css']
})
export class SetupComponent implements OnInit {

  level = {
    code: '',
    description: '',
    order: '',
    digits: ''
  }
  @ViewChild('f') myForm: NgForm;
  constructor() { }

  ngOnInit() {
  }

  saveLevel(level) {
    console.log(level);
  }

}

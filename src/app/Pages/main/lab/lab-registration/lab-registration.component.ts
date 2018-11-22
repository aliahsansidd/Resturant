import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-lab-registration',
  templateUrl: './lab-registration.component.html',
  styleUrls: ['./lab-registration.component.css']
})
export class LabRegistrationComponent implements OnInit {
  PanelVisible = false;
abc = {

}

  constructor() { }


  ngOnInit() {
  }

  PanelVisible1() {
    if (this.abc === 'yes') {
       this.PanelVisible = true ;
    } else {
      this.PanelVisible = false ;
    }
  }
}

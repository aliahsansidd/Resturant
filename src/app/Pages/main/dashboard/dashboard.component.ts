import { Component, OnInit } from '@angular/core';
import { ApiService } from 'app/Services/common/apiService';
import { Router } from '@angular/router';
import * as moment from 'moment';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  totalPatient: any;
  originalCardPrice: any;
  dupCardPrice: any;
  registeredTodayArray: any = [];
  registeredToday: any;
  cardLoader = true;
  registeredLoader = true;
  totalPatientLoader = true;
  constructor(private apiService: ApiService, private _route: Router) { }

  ngOnInit() {
    this.apiService.patientService.getAllPatient().subscribe((res: any) => {
      console.log(res);
      this.totalPatientLoader = false;
      this.totalPatient = res.data.length;
      for (let i = 0; i < this.totalPatient; i++) {
        let created = res.data[i].createdOn.split('T');
        console.log(created);
        let date = moment().format('YYYY-MM-DD');
        // console.log(JSON.stringify(date));
        // let currentDate = JSON.stringify(date);
        console.log(date);
        console.log(created[0]);
        if (created[0] === date) {
          this.registeredTodayArray.push(res.data[i].firstName);
          console.log(this.registeredTodayArray);
          this.registeredLoader = false;
          this.registeredToday = this.registeredTodayArray.length;
          // this.registeredToday = this.registeredToday.length;
        } else {
          this.registeredLoader = false;
          this.registeredToday = 0;
        }
      }
    })
    this.apiService.card.getCardDetails().subscribe((res: any) => {
      console.log(res);
      this.cardLoader = false;
      this.originalCardPrice = res.data[0].value;
      this.dupCardPrice = res.data[1].value;
    })
  }
  navigateTo(route) {
    this._route.navigate([route]);
  }

  // getTotalPatient() {
  //   this.apiService.patientService.getAllPatient().subscribe((res => {
  //     console.log(res);
  //   }))
  // }
}

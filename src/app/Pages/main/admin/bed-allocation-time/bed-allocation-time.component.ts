import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-bed-allocation-time',
  templateUrl: './bed-allocation-time.component.html',
  styleUrls: ['./bed-allocation-time.component.css']
})
export class BedAllocationTimeComponent implements OnInit {

  dateNow: any = new Date().toISOString().split('T')[0];
  constructor() { }

  ngOnInit() {
  }

}

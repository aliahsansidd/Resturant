import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';

@Component({
    selector: 'app-bed-time',
    templateUrl: './bed-time.component.html',
    styleUrls: ['./bed-time.component.css']
})
export class BedTimeComponent implements OnInit {
    BedTime: any = '';
    constructor() { }

    ngOnInit() {
    }

}

import { Injectable } from '@angular/core';
// import { environment } from '../../environments/environment';
import * as moment from 'moment';
import { CardService } from './CardService';
import { ApiService } from '../common/apiService';


@Injectable()
export class DateService {
    headers: any;
    newDate: any;
    validity: any;
    expiryDate: any;
    defaultExpiry = '';
    constructor(private card: CardService) {
        // this.card.getCardDetails().subscribe((res: any) => {
        //     console.log(res);
        //     this.defaultExpiry = res.data[4].value;
        //     console.log(this.defaultExpiry);
        // })
    }
    getCurrentDate() {
        this.newDate = new Date();
        let currentDate = this.newDate.getDate();
        let currentMonth = this.newDate.getMonth() + 1;
        let currentYear = this.newDate.getFullYear();
        this.validity = this.newDate.getFullYear() + this.defaultExpiry;
        return this.newDate = currentDate + '/' + currentMonth + '/' + currentYear;
    }
 getExpiryDate() {
        console.log(this.defaultExpiry);
        if (this.defaultExpiry !== '' || 'undefined') {
        this.newDate = new Date();
        let currentDate = this.newDate.getDate();
        let currentMonth = this.newDate.getMonth() + 1;
        let currentYear = this.newDate.getFullYear();
        this.validity = this.newDate.getFullYear() + this.defaultExpiry;
         this.newDate = currentDate + '/' + currentMonth + '/' + currentYear;
         this.expiryDate = currentDate + '/' + currentMonth + '/' + this.validity;
    }
    }
};


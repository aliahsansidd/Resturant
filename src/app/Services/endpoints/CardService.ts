import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpService } from '../common/HttpService';

@Injectable()
export class CardService {

  constructor(private http: HttpService ) { }
  updateCardDetails(data) {
        return this.http.put('/api/lov/update', data);
    }
    setCardExpiry(data) {
        return this.http.put('/api/lov/update', data);
    }
    getCardDetails() {
        return this.http.get('/api/lov/GetByGroup?groupName=Patient');
    }
}

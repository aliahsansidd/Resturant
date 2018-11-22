import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpService } from '../common/HttpService';

@Injectable()
export class ConsultancyService {

    constructor(private http: HttpService) { }


    getAllConsultancy() {
      return  this.http.get('/api/consultancytiming/get');
    }
}

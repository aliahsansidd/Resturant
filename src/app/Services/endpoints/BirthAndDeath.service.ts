import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpService } from '../common/HttpService';
import { Observable } from 'rxjs';

@Injectable()
export class BirthAndDeath {

    constructor(private http: HttpService) { }
    SaveBirth(data) {
        return this.http.post('/api/birth/create', data);
    }
    GetAllBirth() {
        return this.http.get('/api/birth/get');
    }

    UpdateBirth(data) {
        return this.http.put('/api/birth/update', data)
    }
    GetBirthByID(id) {
        return this.http.get('/api/birth/getsingle?id=' + id);
    }
    DeleteBirth(id) {
        return this.http.delete('/api/birth/delete/' + id);
    }

    // Death Registration
    SaveDeath(data) {
        return this.http.post('/api/death/create', data)
    }
    UpdateDeath(data) {
        return this.http.put('/api/death/update', data)
    }
    GetAllDeath() {
        return this.http.get('/api/death/get');
    }
    GetDeathByID(id) {
        return this.http.get('/api/death/getsingle?id=' + id);
    }
    DeleteDeath(id) {
        return this.http.delete('/api/death/delete/' + id);
    }

    // demo api
    getAllDoctor() {
        return this.http.get('/api/doctor/get');
    }
    // updateOPDType(data) {
    //     return this.http.put('/api/doctorcategory/update', data)
    // }
    // GetAllOPDTimmings() {
    //     return this.http.get('/api/consultancytiming/get');
    // }
    // SaveOPDTiming(data) {
    //     return this.http.post('/api/consultancytiming/create', data);
    // }
    // DeleteOPDTimmings(id) {
    //     return this.http.delete('/api/consultancytiming/' + id);
    // }

}

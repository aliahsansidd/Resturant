import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpService } from '../common/HttpService';
import { Observable } from 'rxjs';

@Injectable()
export class OPDService {

    constructor(private http: HttpService) { }
    updateOPDTiming(data) {
        return this.http.put('/api/consultancytiming/update', data);
    }
    getOpdById(id) {
        console.log(id);
        return this.http.get('/api/opd/getsingle?id=' + id);
    }
    updateOPDType(data) {
        return this.http.put('/api/doctorcategory/update', data)
    }
    GetAllOPDTimmings() {
        return this.http.get('/api/consultancytiming/get');
    }
    SaveOPDTiming(data) {
        return this.http.post('/api/consultancytiming/create', data);
    }
    DeleteOPDTimmings(id) {
        return this.http.delete('/api/consultancytiming/' + id);
    }
    SaveNewOPD(data) {
        return this.http.post('/api/opd/create', data);
    }
    GetAllOPDType() {
        return this.http.get('/api/doctorcategory/get');
    }
    SaveOPDType(data) {
        return this.http.post('/api/doctorcategory/create', data);
    }
    DeleteOPDType(id) {
        return this.http.delete('/api/doctorcategory/' + id);
    }

    GetAllOPD() {
        return this.http.get('/api/opd/get');
    }
    // ADD DOCTOR's API
    DeleteAddDoctor(id) {
        return this.http.delete('/api/doctor' + id);
    }
    SaveAddDoctor(data) {
        return this.http.post('/api/doctor/create', data);
    }
    GellAllAddDoctor() {
        return this.http.get('/api/doctor/get');
    }
    updateAddDoctor(data) {
        return this.http.put('/api/doctor', data);
    }


    addOPD(body) {
        return this.http.post('/api/opd/create', body);
    }
    getOPD(id) {
        return this.http.get('/api/opd/' + id);
    }
    deleteOPD(id) {
        return this.http.delete('/api/opd/delete/?id=' + id);
    }
    updateOPD(data) {
        return this.http.put('/api/opd/update', data);
    }
    saveOPDDoctor(data) {
        return this.http.post('/api/doctoropd/create', data);
    }
    getDoctorCategorybyID(id) {
        return this.http.get('/api/doctorcategory/' + id);
    }
    getDoctorOPD() {
        return this.http.get('/api/doctoropd/get');
    }
}

import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpService } from '../common/HttpService';
import { Observable } from 'rxjs';

@Injectable()
export class InsuranceService {

    constructor(private http: HttpService) { }
    //  client group api start
    updateClientGroup(data) {
        return this.http.put('/api/clientgroup/update', data)
    }
    GetAllClientGroup() {
        return this.http.get('/api/clientgroup/get');
    }
    SaveClientGroup(data) {
        return this.http.post('/api/clientgroup/create', data);
    }
    DeleteClientGroup(id) {
        return this.http.delete('/api/clientgroup/' + id);
    }
    //  client group api end

    //  client type api start
    updateClientType(data) {
        return this.http.put('/api/clienttype/update', data)
    }
    GetAllClientType() {
        return this.http.get('/api/clienttype/get');
    }
    SaveClientType(data) {
        return this.http.post('/api/clienttype/create', data);
    }
    DeleteClientType(id) {
        return this.http.delete('/api/clienttype/' + id);
    }
    //  client type api end

    // insurance companies api start
    updateInsuranceCompanies(data) {
        return this.http.put('/api/insurancecompanies/update', data)
    }
    GetAllInsuranceCompanies() {
        return this.http.get('/api/insurancecompanies/get');
    }
    SaveInsuranceCompanies(data) {
        return this.http.post('/api/insurancecompanies/create', data);
    }
    DeleteInsuranceCompanies(id) {
        return this.http.delete('/api/insurancecompanies/' + id);
    }

    // insurance company api end

    // cpt category api start
    updateCptCategory(data) {
        return this.http.put('/api/insurancecompanies/update', data)
    }
    GetAllCptCategory() {
        return this.http.get('/api/insurancecompanies/get');
    }
    SaveCptCategory(data) {
        return this.http.post('/api/insurancecompanies/create', data);
    }
    DeleteCptCategory(id) {
        return this.http.delete('/api/insurancecompanies/' + id);
    }
    // cpt category api end

    // group of companies api start
    updateGroupOfCompanies(data) {
        return this.http.put('/api/groupofcompanies/update', data)
    }
    GetAllGroupOfCompanies() {
        return this.http.get('/api/groupofcompanies/get');
    }
    SaveGroupOfCompanies(data) {
        return this.http.post('/api/groupofcompanies/create', data);
    }
    DeleteGroupOfCompanies(id) {
        return this.http.delete('/api/groupofcompanies/' + id);
    }
    // group of companies api end
}

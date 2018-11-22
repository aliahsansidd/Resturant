import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpService } from '../common/HttpService';
import { Observable } from 'rxjs';

@Injectable()
export class AccidentAndEmergencyService {

    constructor(private http: HttpService) { }
    //  Catastrophic Event api start
    updateCatastrophic(data) {
        return this.http.put('/api/catastrophicevent/update', data)
    }
    GetAllCatastrophic() {
        return this.http.get('/api/catastrophicevent/get');
    }
    SaveCatastrophic(data) {
        return this.http.post('/api/catastrophicevent/create', data);
    }
    DeleteCatastrophic(id) {
        return this.http.delete('/api/catastrophicevent/' + id);
    }
    //  Catastrophic Event api end

    // Accident And Emergency Api Start
    updateAccidentAndEmergency(data) {
        return this.http.put('/api/accidentandemergency/update', data)
    }
    GetAllAccidentAndEmergency() {
        return this.http.get('/api/accidentandemergency/get');
    }
    SaveAccidentAndEmergency(data) {
        return this.http.post('/api/accidentandemergency/create', data);
    }
    DeleteAccidentAndEmergency(id) {
        return this.http.delete('/api/accidentandemergency/' + id);
    }
    GetSingleAccidentAndEmergency(id) {
        return this.http.get('/api/accidentandemergency/' + id);
    }
}

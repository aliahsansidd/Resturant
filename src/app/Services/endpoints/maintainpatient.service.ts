import { Injectable } from '@angular/core';
import { Response, Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import { Subject } from 'rxjs/Rx';
import { HttpService } from '../common/HttpService';

@Injectable({
    providedIn: 'root'
})
export class MaintainPatientService {
    callAlertSubject = new Subject<any>();
    $callAlertObservable = this.callAlertSubject.asObservable();
    addPatientSubject = new Subject<any>();
    $addPatientObservable = this.addPatientSubject.asObservable();
    constructor(private http: HttpService) { }

    sendPatientToSummary(patient) {
        this.addPatientSubject.next(patient);
    }
    callAlertModal(condition) {
        console.log(condition);
        this.callAlertSubject.next(condition);
    }
    AddPatient(data) {
        return this.http.post('/api/patient/create', data);
    };
    UpdatePatient(data) {
        return this.http.put('/api/patient/update', data);
    }
    DeletePatientById(id) {
        return this.http.delete('/api/patient/delete?id=' + id);
    }
    getAllPatient() {
        return this.http.get('/api/patient/get');
    }
    getPatientById(id) {
        return this.http.get('/api/patient/getsingle?id=' + id);
    }
    // ahsan
    PatientById(id) {
        return this.http.get('/api/patient/' + id);
    }
}

import { Injectable } from '@angular/core';
import { HttpService } from '../common/HttpService';
import { Subject } from 'rxjs/Rx';

@Injectable()
export class OpdRegistrationService {
    doctorDaysSubject = new Subject<any>();
    $doctorDaysObservable = this.doctorDaysSubject.asObservable();
    constructor(private http: HttpService) { }

    RegisterForOPD(data) {
        return this.http.post('/api/opdregistration/create', data);
    }

    // passing days of doctor to Behaviour Subject (Observable)

    sendDoctorDays(days) {
        console.log(days);
        this.doctorDaysSubject.next(days);
    }
}

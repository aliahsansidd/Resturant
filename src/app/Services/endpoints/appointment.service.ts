import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';
import { HttpService } from '../common/HttpService';
import { Subject } from 'rxjs';

@Injectable()
export class AppointmentSerive {
    sendAppointmentToOpdSubject = new Subject<any>();
    $sendAppointmentToOpdObservable = this.sendAppointmentToOpdSubject.asObservable();
    constructor(private http: HttpService) { }


    getAllAppointments() {
        return this.http.get('/api/appointment/get');
    }
    getSingleAppointment(id) {
        return this.http.get('/api/appointment/getsingle?id=' + id);
    }
    createAppointment(data) {
        return this.http.post('/api/appointment/create', data);
    }
    sendAppointmentToOpd(appointment, boolean) {
        console.log(appointment);
        this.sendAppointmentToOpdSubject.next({appointment, boolean});
    }

    // OPD TIME SLOT
    getOpdTimeSlot(data) {
        return this.http.put('/api/doctoropdtimeslot/getbydoctoropd', data);
    }
}

import { Injectable } from '@angular/core';
import { HttpService } from '../common/HttpService';

@Injectable()
export class DoctorService {
    constructor(private http: HttpService) { }
    getAllDoctors() {
        return this.http.get('/api/doctor/get');
    }
    getSingleDoctor(id) {
        console.log(id);
        return this.http.get('/api/doctor/' + id);
    }
    getDoctorCategoryById(id) {
        return this.http.get('/api/doctorcategory/getsingle?id=' + id);
    }
    getAllDoctorOPD() {
        return this.http.get('/api/doctoropd/get');
    }
    getSingleDoctorOPD(id) {
        return this.http.get('/api/doctoropd/getsingle?id=' + id);
    }

}


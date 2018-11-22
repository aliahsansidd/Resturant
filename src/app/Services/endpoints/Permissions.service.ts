import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import { HttpService } from '../common/HttpService';

@Injectable({
    providedIn: 'root'
})
export class PermissionsService {
    constructor(private http: HttpService) { }
    AddPermission(data) {
        return this.http.post('/api/patient/create', data);
    };
    // UpdatePermission(data) {
    //     return this.http.put('api/patient/update', data);
    // }
    DeletePatientById(id) {
        return this.http.delete('api/patient/delete?id=' + id);
    }
    getAllPermissions() {
        return this.http.get('/api/role/permissions');
    }
    // getPatientById(id) {
    //     return this.http.get('/api/patient/getsingle');
    // }
}

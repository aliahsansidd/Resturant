import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';
import { HttpService } from '../common/HttpService';

@Injectable()
export class RoleManagementService {

    LongProcessArray = {};
    constructor(private http: HttpService) { }


    getAllRoles() {
        return this.http.get('/api/role/get');
    }
    getSingleRole(id) {
        return this.http.get(`/api/role/getsingle?id=${id}`);
        // return this.http.get('/api/role/getsingle?id=' + id);
    }
    createRole(data) {
        return this.http.post('/api/role/create', data);
    }
    updateRole(data) {
        return this.http.put('/api/role/update', data);
    }
    getRolePermission() {
        return this.http.get('/api/role/permissions');
    }
    getRole() {
        return this.http.get('/api/role');
    }
    deleteRole(id) {
        return this.http.delete(`/api/role/${id}`);
    }
    // postRole(data) {
    //     return this.http.post('/api/role', data);
    // }
    // editRole(data) {
    //     return this.http.put('/api/role', data);
    // }
    // deleteRole(id) {
    //     return this.http.get('/api/role/' + id);
    // }
    // getRolebyId(id) {
    //     return this.http.get(`/api/role/${id}`);
    // }
    // getResponseMessage() {
    //     return this.http.get('/api/role/getresponsemessage');
    // }

    // post(url: string, model: any): Observable<any> {
    //     let body = JSON.stringify(model);
    //     return this._http.post(url, model)
    //         .map((response: Response) => {
    //             return <any>response.json();
    //         }).catch((error: any) => this.handleError(error));
    // }

    // put(url: string, id: number, model: any): Observable<any> {
    //     let body = JSON.stringify(model);
    //     return this._http.put(url + '/' + id, model)
    //         .map((response: Response) => {
    //             return <any>response.json();
    //         }).catch((error: any) => this.handleError(error));
    // }

    // delete(url: string, id: number): Observable<any> {
    //     return this._http.delete(url + '/' + id)
    //         .map((response: Response) => {
    //             return <any>response.json();
    //         }).catch((error: any) => this.handleError(error));
    // }

    // private handleError(error: any) {
    //     return Observable.throw(error || 'Server error');
    // }
}

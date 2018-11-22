import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpService } from '../common/HttpService';
import { Observable } from 'rxjs';

@Injectable()
export class BuildingInfo {

    constructor(private http: HttpService) { }
    // Building Info Add Category Api's
    GetallBuildingInfo() {
        return this.http.get('/api/buildingmaterialcategory/get')
    }
    updateBuildingInfo(data) {
        return this.http.put('/api/buildingmaterialcategory', data)
    }
    CreateBuildingInfo(data) {
        return this.http.post('/api/buildingmaterialcategory/create', data);
    }
    DeleteBuildingInfo(id) {
        return this.http.delete('/api/buildingmaterialcategory/' + id);
    }

    //   Building Service Api's

    GetallServiceInfo() {
        return this.http.get('/api/buildingmaterial/get');
    }
    CreateServiceInfo(data) {
        return this.http.post('/api/buildingmaterial/create', data);
    }
    updateServiceInfo(data) {
        return this.http.put('/api/buildingmaterial/update', data)
    }
    DeleteServiceInfo(id) {
        return this.http.delete('/api/buildingmaterial/delete/' + id);
    }
    getSingleServiceInfo(id) {
        return this.http.get('/api/buildingmaterial/' + id);
    }
    //   Building Floor Api's

    GetallFloor() {
        return this.http.get('/api/buildingfloor/get');
    }
    CreateFloor(data) {
        return this.http.post('/api/buildingfloor/create', data);
    }
    updateFloor(data) {
        return this.http.put('/api/buildingfloor/update', data)
    }
    DeleteFloor(id) {
        return this.http.delete('/api/buildingfloor/delete/' + id);
    }
    getSingleFloor(id) {
        return this.http.get('/api/buildingfloor/' + id);
    }
}


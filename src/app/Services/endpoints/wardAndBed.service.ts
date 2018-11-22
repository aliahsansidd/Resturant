import { Injectable } from '@angular/core';
import { HttpService } from '../common/HttpService';
@Injectable()
export class WardAndBedService {

    constructor(private http: HttpService) { }
    CreateWardCategory(data) {
        return this.http.post('/api/wardcategory/create', data);
    }
    GetAllWardCategory() {
        return this.http.get('/api/wardcategory/get');
    }
    getSingleRoom(id) {
        return this.http.get('/api/room/getsingle?id=' + id);
    }
    DeleteWardCategory(id) {
        return this.http.delete('/api/wardcategory/delete/' + id);
    }
    UpdateWardCategory(data) {
        return this.http.put('/api/wardcategory/update', data);
    }
    CreateRooms(data) {
        return this.http.post('/api/room/create', data);
    }
    GetAllRooms() {
        return this.http.get('/api/room/get');
    }
    DeleteRooms(id) {
        return this.http.delete('/api/room/delete/' + id);
    }
    UpdateRooms(data) {
        return this.http.put('/api/room/update', data);
    }
    CreateBed(data) {
        return this.http.post('/api/bed/create', data);
    }
    GetAllBed() {
        return this.http.get('/api/bed/get');
    }
    DeleteBed(id) {
        return this.http.delete('/api/bed/delete/' + id);
    }
    UpdateBed(data) {
        return this.http.put('/api/bed/update', data);
    }
}

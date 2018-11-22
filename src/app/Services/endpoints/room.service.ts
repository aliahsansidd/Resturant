import { Injectable } from '@angular/core';
import { HttpService } from '../common/HttpService';

@Injectable()
export class RoomService {

    constructor(private http: HttpService) { }
    getRoomById(id) {
        return this.http.get('/api/room/getsingle?id=' + id);
    }
}

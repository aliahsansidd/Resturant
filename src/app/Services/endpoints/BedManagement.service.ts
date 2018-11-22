import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpService } from '../common/HttpService';
import { Observable } from 'rxjs';

@Injectable()
export class BedManagementService {

    constructor(private http: HttpService) { }

    // Bed Allocation
    GetallBedAllocation() {
        return this.http.get('/api/bedallocation/get')
    }
    updateBedAllocation(data) {
        return this.http.put('/api/bedallocation', data)
    }
    CreateBedAllocation(data) {
        return this.http.post('/api/bedallocation/create', data);
    }
    TransferBed(data) {
        return this.http.post('/api/bedallocation/transferbed', data);
    }
    DeleteBedAllocation(id) {
        return this.http.delete('/api/bedallocation/' + id);
    }
}

import { Injectable } from '@angular/core';
import { HttpService } from '../common/HttpService';

@Injectable()
export class LabService {
    constructor(private http: HttpService) { }
    createLabDepartment(data) {
        return this.http.post('/api/labdepartment/create', data);
    }
    getAllLabDepartments() {
        return this.http.get('/api/labdepartment/get');
    }

    // Lab Services
    createLabService(data) {
        return this.http.post('/api/labdepartmentservices/create', data);
    }
    getAllLabServices() {
        return this.http.get('/api/labdepartmentservices/get');
    }

    // Lab Testing Unit
    createLabTestUnit(data) {
        return this.http.post('/api/labtestingunit/create', data);
    }
    getAllTestingUnits() {
        return this.http.get('/api/labtestingunit/get');
    }

    // Rate Sheet
    createRateSheet(data) {
        return this.http.post('/api/ratesheet/create', data);
    }
    getAllRates() {
        return this.http.get('/api/ratesheet/get');
    }

    postLabTestByValue(data) {
        return this.http.post('/api/labtestbyvalue/create', data);
    }

    postLabTestBuilder(data) {
        return this.http.post('/api/labtestbuilder/create', data);
    }

    getAllTestBuilder() {
        return this.http.get('/api/labtestbuilder/get')
    }

    updateLabDepartments(data) {
        return this.http.put('/api/labdepartment/update', data);
    }
    deleteLabDepartment(id) {
        return this.http.delete('/api/labdepartment/' + id);
    }
    createLabTestTemplate(data) {
        return this.http.post('/api/labtesttemplate/create', data);
    }
    createTestBuilder(data) {
        return this.http.post('/api/labtestbuilder/create', data);
    }
    getLabTestBuilder() {
        return this.http.get('/api/labtestbuilder/get');
    }
    getSampleType() {
        return this.http.get('/api/labsampletype/get');
    }

    postSampleType(data) {
        return this.http.post('/api/labsampletype/create', data);
    }

    getAllSampleType() {
        return this.http.get('/api/labsampletype/get');
    }

    updateSampleType(data) {
        return this.http.put('/api/labsampletype/update', data);
    }

    deleteSampleType(id) {
        return this.http.delete('/api/labsampletype/' + id);
    }
    deleteLabBuilder(id) {
        return this.http.delete('/api/labtestbuilder/delete/' + id);
    }
    getOneLabTestBuilder(id) {
        return this.http.get('/api/labtestbuilder/getsingle/?id=' + id);
    }
    getSingleTestTemplate(id) {
        return this.http.get('/api/labtesttemplate/getsingle/?id=' + id);
    }
}

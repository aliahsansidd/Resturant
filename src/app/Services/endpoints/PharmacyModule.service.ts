import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpService } from '../common/HttpService';
import { Observable } from 'rxjs';

@Injectable()
export class PharmacyModuleService {

    constructor(private http: HttpService) { }
// -----------------------------------------------Product Category Starts--------------------------------------------------- //
updateProductCategory(data) {
        return this.http.put('/api/productcategory/update', data)
    }
    GetAllProductCat() {
        return this.http.get('/api/productcategory/get');
    }
    SaveProductCategory(data) {
        return this.http.post('/api/productcategory/create', data);
    }
    DeleteProductCategory(id) {
        return this.http.delete('/api/productcategory/' + id);
    }
// -----------------------------------------------Product Category Ends--------------------------------------------------- //


// -----------------------------------------------Product Type Starts--------------------------------------------------- //
    updateProductType(data) {
        return this.http.put('/api/producttype/update', data)
    }
    GetAllProductType() {
        return this.http.get('/api/producttype/get');
    }
    SaveProductType(data) {
        return this.http.post('/api/producttype/create', data);
    }
    DeleteProductType(id) {
        return this.http.delete('/api/producttype/' + id);
    }
 // -----------------------------------------------Product Type Ends--------------------------------------------------- //

 // -----------------------------------------------Products Unit Starts--------------------------------------------------- //
 updateProductsUnit(data) {
    return this.http.put('/api/productunit/update', data)
}
GetAllProductsUnit() {
    return this.http.get('/api/productunit/get');
}
SaveProductsUnit(data) {
    return this.http.post('/api/productunit/create', data);
}
DeleteProductsUnit(id) {
    return this.http.delete('/api/productunit/' + id);
}
// -----------------------------------------------Products Unit Ends--------------------------------------------------- //

// ----------------------------------------Products Measurement Unit Starts------------------------------------------- //
updateProductMeasurementUnit(data) {
    return this.http.put('/api/productmeasurementunit/update', data)
}
GetAllProductMeasurementUnit() {
    return this.http.get('/api/productmeasurementunit/get');
}
SaveProductMeasurementUnit(data) {
    return this.http.post('/api/productmeasurementunit/create', data);
}
DeleteProductMeasurementUnit(id) {
    return this.http.delete('/api/productmeasurementunit/' + id);
}
// ----------------------------------------Products Measurement Unit Ends-------------------------------------------- //

// -----------------------------------------------Products Generic Starts--------------------------------------------------- //
 updateProductGeneric(data) {
    return this.http.put('/api/productchemical/update', data)
}
GetAllProductGeneric() {
    return this.http.get('/api/productchemical/get');
}
SaveProductGeneric(data) {
    return this.http.post('/api/productchemical/create', data);
}
DeleteProductGeneric(id) {
    return this.http.delete('/api/productchemical/' + id);
}
// -----------------------------------------------Products Generic Ends--------------------------------------------------- //

// ------------------------------------------------Brand Name Starts--------------------------------------------------- //
updateBrandName(data) {
    return this.http.put('/api/brand/update', data)
}
GetAllBrandName() {
    return this.http.get('/api/brand/get');
}
SaveBrandName(data) {
    return this.http.post('/api/brand/create', data);
}
DeleteBrandName(id) {
    return this.http.delete('/api/brand/' + id);
}
// -------------------------------------------------Brand Name Ends--------------------------------------------------- //

// ------------------------------------------------Rack Management Starts--------------------------------------------------- //
updateRackName(data) {
    return this.http.put('/api/racks/update', data)
}
GetAllRackName() {
    return this.http.get('/api/racks/get');
}
SaveRackName(data) {
    return this.http.post('/api/racks/create', data);
}
DeleteRackName(id) {
    return this.http.delete('/api/racks/' + id);
}
// -------------------------------------------------Rack Management Ends--------------------------------------------------- //

}

import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';

@Injectable()
export class DataService {
    TimeAlowedForLongProcess = 20000;

    LongProcessArray = {};
    constructor(private _http: Http) { }

    get(url: string): Observable<any> {
        return this._http.get(url)
            .map((response: Response) => {
                return <any>response.json();
            });
    }

    post(url: string, model: any): Observable<any> {
        let body = JSON.stringify(model);
        return this._http.post(url, model)
            .map((response: Response) => {
                return <any>response.json();
            }).catch((error: any) => this.handleError(error));
    }

    put(url: string, id: number, model: any): Observable<any> {
        let body = JSON.stringify(model);
        return this._http.put(url + '/' + id, model)
            .map((response: Response) => {
                return <any>response.json();
            }).catch((error: any) => this.handleError(error));
    }

    delete(url: string, id: number): Observable<any> {
        return this._http.delete(url + '/' + id)
            .map((response: Response) => {
                return <any>response.json();
            }).catch((error: any) => this.handleError(error));
    }

    private handleError(error: any) {
        return Observable.throw(error || 'Server error');
    }
}

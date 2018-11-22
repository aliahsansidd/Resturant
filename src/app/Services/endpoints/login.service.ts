import { Injectable } from '@angular/core';
import { Headers } from '@angular/http';
import { HttpHeaders, HttpClient } from '@angular/common/http';



@Injectable()
export class LoginService {
    headers: any;
    constructor(private http: HttpClient) {
    }
    // createAuthorizationHeader(headers: Headers) {
    //     headers.append('Authorization', 'Basic ' +
    //       btoa('username:password'))
    //   }
    login(email: string, password: string) {
    const headers = new Headers({
        'content-type': 'application/json',
        'token': 'b2e684d7-8807-4232-b5fc-1a6e80c175c0'
      });
    //   const options = new RequestOptions({
    //     headers: headers
    //   });
    let options =  {headers: new  HttpHeaders({ 'token': 'b2e684d7-8807-4232-b5fc-1a6e80c175c0'})};
    return this.http.post('/api/auth/login', {emailId: email, password: password}, options);
    }
    logout() {
        return this.http.post('/api/auth/logout', '');
    }
    getUser() {
        return this.http.get('/api/user/get');
    }
};


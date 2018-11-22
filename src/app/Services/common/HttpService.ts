import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Rx';
// Import RxJs required methods
import { HttpClient, HttpHeaders } from '@angular/common/http';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import { environment } from 'environments/environment';
import { LocalStorageService } from '../endpoints/localStorage.service';

@Injectable()
export class HttpService {
  constructor(private http: HttpClient, private localstorage: LocalStorageService) { }

  createAuthorizationHeader(headers: HttpHeaders) {
    // console.log(this.localstorage.getToken());
    const token = this.localstorage.getToken();
    // console.log(token);
    if (token) {
      return headers.append('Authorization', token);
    } else {
      return headers;
    }
  }

  post(url, data) {
    const headers = this.createAuthorizationHeader(new HttpHeaders());
    return (
      this.http.post(url, data, {
        headers: headers
      })
        .map(res => res)
        // ...errors if any
        .catch((error: any) =>
          Observable.throw(this.showErrorSnackBar(error))
        )
    );
  }

  get(url) {
    const headers = this.createAuthorizationHeader(new HttpHeaders());
    this.createAuthorizationHeader(headers);
    return (
      this.http
        .get(url, {
          headers: headers
        })
        .map(res => res)
        // ...errors if any
        .catch((error: any) =>
          Observable.throw(this.showErrorSnackBar(error))
        )
    );
  }

  put(url, data) {
    const headers = this.createAuthorizationHeader(new HttpHeaders());
    this.createAuthorizationHeader(headers);
    return (
      this.http
        .put(url, data, {
          headers: headers
        })
        .map(res => res)
        // ...errors if any
        .catch((error: any) =>
          Observable.throw(this.showErrorSnackBar(error))
        )
    );
  }

  delete(url) {
    const headers = this.createAuthorizationHeader(new HttpHeaders());
    this.createAuthorizationHeader(headers);
    return (
      this.http
        .delete(url, {
          headers: headers
        })
        .map(res => res)
        // ...errors if any
        .catch((error: any) =>
          Observable.throw(this.showErrorSnackBar(error))
        )
    );
  }

  showErrorSnackBar(err) {
    return err.error;
    // this.snackBar.open(err.message, "close", {
    //   duration: 2000,

    //   extraClasses: ["error-snack-bar"]
    // });
  }

  imageUpload(url, file, path, name) {
    // let formData: FormData = new FormData();
    // formData.append('file', file);
    // formData.append('filename', file.name);
    // formData.append('path', path);
    const data = {
      file: file,
      filename: name,
      path: path
    };
    // formData);

    const headers = new HttpHeaders();
    this.createAuthorizationHeader(headers);
    return this.http
      .post(url, data, {
        headers: headers
      })
      .map(res => res)
      .catch((error: any) =>
        Observable.throw(this.showErrorSnackBar(error))
      );
  }

  isAuthenticated() {
    const headers = this.createAuthorizationHeader(new HttpHeaders());

    return this.http
      .get(environment.api + '/users/me', {
        headers: headers
      })
      .map(res => res)
      .catch((error: any) =>
        Observable.throw(this.showErrorSnackBar(error))
      );
  }
}

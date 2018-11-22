import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable()
export class LocalStorageService {

  constructor(public router: Router, ) { }
  saveToken(token: any) {
    localStorage.setItem('Authorization', 'bearer' + ' ' + token);
  }

  getToken() {
    return localStorage.getItem('Authorization');

  }

  saveUser(user: any) {
    localStorage.setItem('user', JSON.stringify(user));
  }

  getUser() {
    return JSON.parse(localStorage.getItem('userId'));
  }
  deleteUser() {
    return localStorage.removeItem('user');
  }

  deleteToken() {
    return localStorage.removeItem('Authorization');
  }
  updateUser(data) {
    this.saveToken(data.token);
    this.saveUser(data.user);
  }
}

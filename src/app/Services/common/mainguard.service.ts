import { Location } from '@angular/common';
import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, CanActivateChild, Router, RouterStateSnapshot } from '@angular/router';
import { Subject } from 'rxjs';
import { HttpService } from './HttpService';
import { ApiService } from './apiService';
import { LocalStorageService } from '../endpoints/localStorage.service';


@Injectable()
// tslint:disable-next-line:class-name
export class canActivateMainChildGuard implements CanActivate {
  allStartups;
  constructor(
    private router: Router,
    private apiService: ApiService,
    private http: HttpService,
    private location: Location,
    private localstorage: LocalStorageService
  ) {
  }
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const authenticated = this.http.isAuthenticated();

    const subject = new Subject<boolean>();
    const self = this;
    authenticated.subscribe(
      (res) => {
            console.log(res);
        //   this.setAuthenticatedUser(res., res.data.token);
          subject.next(true);
          return;
          // for (const i in startups) {
          //   console.log(startups[i]);
          //   console.log('all startups', this.allStartups);
          //   if (startups[i]._id.toString() === currentSid.toString()) {
          //     this.setAuthenticatedUser(res.data.data, res.data.token);
          //     subject.next(true);
          //     return;
          //   }
          // }
        //   this.setAuthenticatedUser(res.data.data, res.data.token);
        //   subject.next(true);
        //   return
        // else {
        //   this.setAuthenticatedUser(res.data.data, res.data.token);
        //   subject.next(true);
        // }
        // console.log(this.apiService.user.getNotificationIdStatus());
        // if (this.apiService.user.getNotificationIdStatus()) {
        //   const pushId = this.apiService.user.getPushId();
        //   this.apiService.user.saveUserPushIdEvent(pushId);
        // }
        // this.router.navigate(['auth/login']);
        // subject.next(false);
      },
      // (err) => {
      //   console.log('err aya hai');
      //   console.log('error occur', err);
      //   subject.next(false);
      //   window.location.reload();
      // }
    );

    return subject.asObservable().first();

  }

  setAuthenticatedUser(data, token) {
    this.apiService.user.saveuser(data);
    this.localstorage.saveToken(token);
  }
}

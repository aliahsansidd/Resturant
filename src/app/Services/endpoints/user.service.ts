import { Injectable } from '@angular/core';
import { HttpService } from '../common/HttpService';
import { Subject } from 'rxjs/Rx';
@Injectable()
export class UserService {
  loginuser: any;
  editUserSubject = new Subject<any>();
  $editUserObservable = this.editUserSubject.asObservable();
  constructor(private http: HttpService) { }
  sendUser(user) {
    console.log(user);
    this.editUserSubject.next(user);
  }
  createUser(data) {
      return this.http.post('/api/user/create', data);
  }
  getAllUser() {
    return this.http.get('/api/user/get');
  }
  getSingleUser(id) {
    return this.http.get('/api/user/getsingle?id=' + id);
  }
  deleteSingleUser(id) {
    return this.http.delete(`/api/user/${id}`)
  }
  verifyme() {
    return this.http.get('/users/me');
  }
  getAllDiseases() {
    return this.http.get('https://disease-info-api.herokuapp.com/diseases');
  }

  saveuser(user) {
    this.loginuser = user;
  }

  updateUser(data) {
    return this.http.put('/api/user/update', data);
  }

  getuser() {
    return this.loginuser;
    // return this.apiService.localstorage.getUser();
  }

  isMentor(sid) {
    const userStartups = this.getuser().startups;
    for (let i = 0; i < userStartups.length; i++) {
      if (sid === userStartups[i]._id) {
        return userStartups[i].dtype === 'mentor' ? true : false;
      }
    }
  }

  // getusertask() {
  //   return this.httpService.get('');
  // }
  logOut() {
    // this.apiService.localstorage.deleteToken();
    // this.apiService.localstorage.deleteUser();
  }
  // checkUser(userId) {
  //   // used for comment section ( show delete icons on comments if same user is logged in)

  //   // if (this.getuser()._id === userId) {
  //   //   return true;
  //   // }
  //   return false;
  // }
  // deactivateUser(userID) {
  //   // return this.httpService.delete(
  //   //   "/startups/" +
  //   //     this.apiService.localstorage.getStartup()._id +
  //   //     "/member/status/" +
  //   //     UserID
  //   // );
  // }
}

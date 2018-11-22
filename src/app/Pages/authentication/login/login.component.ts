import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormsModule, NgForm } from '@angular/forms';
// import { DataService } from '../../Services/data.service';
import jwt_decode from 'jwt-decode';
import { canActivateMainChildGuard } from '../../../Services/common/mainguard.service';
import { RoutingService } from '../../../Services/common/routing.service';
import { LoginService } from '../../../Services/endpoints/login.service';
import { LocalStorageService } from '../../../Services/endpoints/localStorage.service';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { NzNotificationService } from 'ng-zorro-antd';

// import { ApiService } from '../../../services/apiService';
// import { LoginService } from '../../../Services/login.service';



@Component({
  selector: 'app-login',
  providers: [LoginService],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  @ViewChild('f') myForm: NgForm;
  registerForm: FormGroup;
  submitted = false;
  loginForm: any;
  email: any;
  password: any;
  authenticatedToken: any;
  login = false;
  user = {
    email: '',
    password: ''
  }
  constructor(
    private loginService: LoginService,
    private routingService: RoutingService,
    private localStorage: LocalStorageService,
    private mainGuardService: canActivateMainChildGuard,
    private spinnerService: Ng4LoadingSpinnerService,
    private notification: NzNotificationService,
    private fb: FormBuilder
  ) { }
  ngOnInit() {
  //   this.loginForm = this.fb.group({
  //     email: ['', [Validators.required, Validators.email]],
  //     password: ['', [Validators.required, Validators.minLength(6)]]
  // });
  // console.log(this.loginForm);
  }
  // get f() { return this.loginForm.controls; }

  loginUser() {
      this.submitted = true;
      console.log(this.myForm);
      console.log(this.user.email);
    console.log(this.user.password);
      // stop here if form is invalid
      const email = this.user.email;
      const password = this.user.password;
      if (!this.myForm.valid) {
        return null;
      }
    this.login = true;
    this.spinnerService.show();
    this.loginForm = this.loginService.login(email, password).subscribe((res: any) => {
      this.authenticatedToken = res.data.access_token;
      this
        .mainGuardService
        .setAuthenticatedUser(res.data.data, res.data.access_token);
        console.log(this.authenticatedToken);
      let currentUser = jwt_decode(this.authenticatedToken);
      console.log(currentUser);
      this.routingService.navigateTo(['main']);
      this.spinnerService.hide();
    },
      (error) => {
        console.log(error);
        this.spinnerService.hide();
        this.notification.create('error', 'Error', 'Something went wrong')
      }
    );
  }
  logout() {
    localStorage.clear();
    this.routingService.navigateTo(['auth']);
  }
}




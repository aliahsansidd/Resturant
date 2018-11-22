import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CommonModule } from '@angular/common';
import { FormBuilder } from '@angular/forms';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { NgZorroAntdModule } from 'ng-zorro-antd';
import { NzModalService } from 'ng-zorro-antd';
import { ApiService } from '../../../Services/common/apiService';
import { HttpService } from '../../../services/common/http.service';
import { LocalstorageService } from '../../../services/common/localstorage.service';
import { MessagingService } from '../../../services/common/messaging.service';
import { RoutingService } from '../../../Services/common/routing.service';
import { LoginComponent } from './login.component';

class RouterStub {
  navigate(params) {
    // testing
  }
}
describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        NgZorroAntdModule.forRoot(),
        // NgZorroAntdModule.forRoot({
        //   extraFontName: 'anticon',
        //   extraFontUrl: './assets/fonts/iconfont'
        // }),
        FormsModule,
        ReactiveFormsModule,
        CommonModule,
        RouterTestingModule
      ],
      declarations: [LoginComponent],
      providers: [ApiService, HttpService, LocalstorageService, RoutingService
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Should create a form with three controls', () => {
    component.ngOnInit();
    expect(component.loginForm.contains('userName')).toBeTruthy();
    expect(component.loginForm.contains('password')).toBeTruthy();
    expect(component.loginForm.contains('remember')).toBeTruthy();
  });

  it('Should make the username field to follow the email pattern', () => {
    component.ngOnInit();
    const username = component.loginForm.get('userName');
    username.setValue('zubair@sudofy.com');
    expect(username.valid).toBeTruthy();
  });

  it('Should make the username field required', () => {
    component.ngOnInit();
    const username = component.loginForm.get('userName');
    username.setValue(' ');
    expect(username.valid).toBeFalsy();
  });

  it('Should make the password field required', () => {
    component.ngOnInit();
    const password = component.loginForm.get('password');
    password.setValue('');
    expect(password.valid).toBeFalsy();
  });

  it('Should redirect to given URL', () => {
    const service = TestBed.get(RoutingService);
    const spy = spyOn(service, 'navigateTo');
    component.navigateTo(['signup']);
    expect(spy).toHaveBeenCalledWith(['signup']);
  });

  it('Should make the form invalid', () => {
    component.loginForm.controls['userName'].setValue('example');
    component.loginForm.controls['password'].setValue('123');
    const formInValidity = component.shouldFormDisable();
    expect(formInValidity).toBeTruthy();
  });

  it('should open reset password modal on clicking Reset Password Button', () => {
    const service = TestBed.get(NzModalService);
    // tslint:disable-next-line:no-empty
    const spy = spyOn(service, 'open').and.returnValue({ subscribe: () => { } });
    component.OpenResetPasswordModal();
    expect(spy).toHaveBeenCalled();
  });
  // property binding testing
  it('should call navigate function on signup button click', () => {
    const signupButton = fixture.debugElement.query(By.css('.signup-navigate-button'));
    const spy = spyOn(component, 'navigateTo');
    signupButton.triggerEventHandler('click', undefined);

    expect(spy).toHaveBeenCalled();
  });
  it('should call login function on login button click', () => {
    const loginButton = fixture.debugElement.query(By.css('.login-btn'));
    const spy = spyOn(component, 'login');
    loginButton.triggerEventHandler('click', undefined);

    expect(spy).toHaveBeenCalled();
  });
  it('should call OpenResetPasswordModal function on forget Password button click', () => {
    const forgetPasswordButton = fixture.debugElement.query(By.css('.forget-pass-btn'));
    const spy = spyOn(component, 'OpenResetPasswordModal');
    forgetPasswordButton.triggerEventHandler('click', undefined);

    expect(spy).toHaveBeenCalled();
  });
});

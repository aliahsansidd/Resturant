import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpService } from '../../../../Services/common/HttpService';
import { ApiService } from '../../../../Services/common/apiService';
import { NgForm } from '@angular/forms';
import { NzNotificationService } from 'ng-zorro-antd';
import { Router } from '@angular/router';
// import { Adduser } from ../../Modals/adduser.model;
declare var $;

@Component({
  selector: 'app-adduser',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent implements OnInit {
  @ViewChild('f') myForm: NgForm;
  ShowERInput = false;
  Active = true;
  checked = false;
  AllRoles: any;
  SelectedRoles = [];

  adduser = {
    id: '',
    firstName: '',
    lastName: '',
    picture: '' ,
    email: '',
    password: '' ,
    confirmpassword: '',
    fullName: '',
    cellNumber: '',
    status: 1,
    createdOn: '',
    roles: [
      {
        userid: '',
        id: '',
        name: ''
      }
    ]
  };
  Adduser = {
    Rel: 1
  };
  AssignRoles = ['User', 'Admin', 'Other'];

  Status = [
    { value: 1, text: 'Active' },
    { value: 2, text: 'InActive' }
  ];
  Roles = [];
  UserImagebase64textString: any;
  userImage: any;
  userData: any;
  PanelVisible = false;
  constructor(private http: HttpService,
     private apiService: ApiService, private notification: NzNotificationService,
     private router: Router) { }

  ngOnInit() {
    this.userData = JSON.parse(localStorage.getItem('user'));
    console.log(this.userData, 'DATA');
    if (this.userData !== null) {
      this.checked = true;
      this.PanelVisible = true;
    this.adduser.firstName = this.userData.firstName;
    this.adduser.lastName = this.userData.lastName;
    this.adduser.cellNumber = this.userData.cellNumber;
    this.adduser.picture = this.userData.picture;
    this.adduser.email = this.userData.email;
    this.SelectedRoles = this.userData.roles;
    this.adduser.roles = this.userData.roles;
    this.adduser.id = this.userData.id;
    this.adduser.fullName = this.userData.fullName
    this.adduser.createdOn = this.userData.createdOn
    // this.adduser.firstname = this.userData.firstName;
    // this.adduser.firstname = this.userData.firstName;
  }
    this.apiService.roleService.getAllRoles().subscribe((res: any) => {
      console.log(res);
      this.AllRoles = res.data;
      for (let i = 0; i <= this.AllRoles.length; i++) {
        this.Roles.push(this.AllRoles[i]);
        console.log(this.Roles);
      }
    })
  }
  handleBackImage(evt) {
    console.log(evt);
    let files = evt.target.files;
    let file = files[0];

    if (files && file) {
      let reader = new FileReader();

      reader.onload = this._handleBackImageReader.bind(this);
      this.readBackURL(evt);
      reader.readAsBinaryString(file);
    }
  }
  _handleBackImageReader(readerEvt) {
    let binaryString = readerEvt.target.result;
    this.UserImagebase64textString = btoa(binaryString);
    console.log(btoa(binaryString));
  }
  readBackURL(event) {
    if (event.target.files && event.target.files[0]) {
      let reader = new FileReader();
      // tslint:disable-next-line:no-shadowed-variable
      reader.onload = (event: any = ProgressEvent) => {
        $('#front-image')
                    .attr('src', event.target.result)
                    .width(323.52)
                    .height(204);
        this.userImage = (<FileReader>event.target).result;
        // console.log(this.url);
      }
      reader.readAsDataURL(event.target.files[0]);
    }
  }
  ShowLoginForm(value = false) {
    console.log(value);
    if (value === true) {
      this.ShowERInput = false;
    } else if (value === false) {
      this.ShowERInput = true;
    }
  }

  goToList() {
    this.router.navigate(['main/user/user-manage'])
  }
  resetForm() {
    localStorage.removeItem('user');
    this.adduser.id = '';
    this.myForm.form.reset();
  }
  AddUser(user) {
    console.log(user);
    // console.log(this.myForm);
    if (this.myForm.invalid) {
      console.log('invalid');
      return null;
    }
    if (user.id !== '') {
      console.log(this.adduser);
      this.apiService.user.updateUser(this.adduser).subscribe(res => {
        console.log(res);
        this.notification.create('success', 'Update', 'User Update Successfully')
        localStorage.removeItem('user');
        this.adduser.id = '';
        this.myForm.form.reset();
        return;
      })
    } else {
   let body = {
      firstName: user.firstName,
      middleName: user.middlename,
      lastName: user.lastName,
      userName: user.firstname,
      email: user.email,
      countryCode: user.countrycode,
      countryId: user.countryId,
      password: user.password,
      confirmPassword: user.confirmpassword,
      cellNumber: user.cellNumber,
      isLocked: true,
      roles: this.SelectedRoles,
      picture: this.UserImagebase64textString,
    }
    if (body.password !== body.confirmPassword) {
      this.notification.create('error', 'Invalid Form', 'Passwords do not match');
      return;
    } else {
    console.log('this is the body', body);
    this.apiService.user.createUser(body).subscribe(res => {
  console.log('res', res);
  this.notification.create('success', 'User Created', 'User created successfully');
  this.myForm.form.reset();
},
  (err) => {
    console.log(err);
    // this.notification.create('error', 'User Error', `${err.meta.message}`);
  }
  )
}
}
}
}

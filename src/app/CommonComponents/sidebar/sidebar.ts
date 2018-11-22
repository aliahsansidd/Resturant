import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../../Services/common/apiService';
import jwt_decode from 'jwt-decode';
import { DomSanitizer } from '../../../../node_modules/@angular/platform-browser';
declare var $: any;

@Component({
  selector: 'app-sidebar-cmp',
  templateUrl: 'sidebar.html'
})

export class SidebarComponent implements OnInit {
  showMenu = '';
  showSubMenu = '';
  showSubSubMenu =  '';
  addActive = '';
  firstName: any;
  userImage: any;
  constructor(private router: Router, private apiService: ApiService, private _sanitizer: DomSanitizer) {
    let token = localStorage.getItem('Authorization').split('bearer');
    // console.log(token[1]);
    let decodedToken = jwt_decode(token[1]);
    let userId = decodedToken.userId;
    console.log(decodedToken);
this.apiService.user.getSingleUser(userId).subscribe((res: any) => {
    // console.log(res);
    this.userImage = this._sanitizer.bypassSecurityTrustResourceUrl('data:image/jpg;base64,' + res.data.picture);
    // this.userImage = res.data.picture;
    // console.log(this.userImage);
    this.firstName = res.data.firstName;
  });

  }
  addExpandClass(element: any) {
    if (element === this.showMenu) {
      this.showMenu = '0';
    } else {
      this.showMenu = element;
    }
  }
  addSubExpandClass(element: any) {
    if (element === this.showSubMenu) {
      this.showSubMenu = '0';
    } else {
      this.showSubMenu = element;
    }
  }
  addSubSubExpandClass(element: any) {
    if (element === this.showSubSubMenu) {
      this.showSubSubMenu = '0';
    } else {
      this.showSubSubMenu = element;
    }
  }
  addActiveMenu(element: any) {
    if (element === this.addActive) {
      this.addActive = '0';
    } else {
      this.addActive = element;
    }
  }

  ngOnInit() {
    /* Sparklines can also take their values from the first argument   passed to the sparkline() function */
    const myvalues2 = [
      10, 8, 5, 7, 4, 2, 8, 10, 8, 5, 6, 4, 1, 7, 4, 5, 8, 10, 8, 5, 6, 4, 4, 1, 7, 4, 5, 8, 10, 8, 5, 6, 4, 4
    ];
    /* Sparklines chart js  ends */
  }
}

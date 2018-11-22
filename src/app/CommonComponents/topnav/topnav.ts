import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { RoutingService } from '../../Services/common/routing.service';
import jwt_decode from 'jwt-decode';
import { ApiService } from '../../Services/common/apiService';
declare var $: any;

@Component({
    selector: 'app-top-nav',
    templateUrl: 'topnav.html',
})
export class TopNavComponent {
  isActive = false;
  token: any;
  userImage: any;
  firstName: any;
  constructor(private router: RoutingService, private apiService: ApiService) {
    let token = localStorage.getItem('Authorization').split('bearer');
      // console.log(token[1]);
      let decodedToken = jwt_decode(token[1]);
      let userId = decodedToken.userId;
      console.log(decodedToken);
  this.apiService.user.getSingleUser(userId).subscribe((res: any) => {
      // console.log(res);
      this.userImage = res.data.picture;
      // console.log(this.userImage);
      this.firstName = res.data.firstName;
    });
  }
  logout() {
    // this.loginService.logout().subscribe(res => {
    //   console.log(res);
    // })
    localStorage.clear();
    this.router.navigateTo(['auth']);
  }
  eventCalled() {
    $('body').toggleClass('menuclose');
  }

  event2Called() {
    $('body').toggleClass('menuclose-right');
  }
  changeTheme(color: string): void {
    let link: any = $('<link>');
    link
      .appendTo('head')
      .attr({type : 'text/css', rel : 'stylesheet'})
      .attr('href', 'themes/app-' + color + '.css');
  }

  rtl(): void {
    let body: any = $('body');
    body.toggleClass('rtl');
  }

  sidebarToggler(): void  {
    let sidebar: any = $('#sidebar');
    let mainContainer: any = $('.main-container');
    sidebar.toggleClass('sidebar-left-zero');
    mainContainer.toggleClass('main-container-ml-zero');
  }
}

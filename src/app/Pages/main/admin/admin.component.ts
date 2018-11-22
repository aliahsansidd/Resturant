import { Component, OnInit } from '@angular/core';
import { canActivateMainChildGuard } from '../../../Services/common/mainguard.service';

@Component({
  selector: 'app-admin',
  providers: [canActivateMainChildGuard],
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}

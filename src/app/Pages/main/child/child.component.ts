import { Component, OnInit } from '@angular/core';
import { canActivateMainChildGuard } from '../../../Services/common/mainguard.service';

@Component({
  selector: 'app-child',
  providers: [canActivateMainChildGuard],
  templateUrl: './child.component.html',
  styleUrls: ['./child.component.css']
})
export class ChildComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}

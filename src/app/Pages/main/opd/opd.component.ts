import { Component, OnInit } from '@angular/core';
import { canActivateMainChildGuard } from '../../../Services/common/mainguard.service';

@Component({
  selector: 'app-opd',
  providers: [canActivateMainChildGuard],
  templateUrl: './opd.component.html',
  styleUrls: ['./opd.component.css']
})
export class OpdComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}

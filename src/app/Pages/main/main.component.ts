import { Component, OnInit } from '@angular/core';
import { canActivateMainChildGuard } from '../../Services/common/mainguard.service';

@Component({
  selector: 'app-main',
  providers: [canActivateMainChildGuard],
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {
  constructor(
  ) {
  }

  ngOnInit() {
  }

}

import { Component, OnInit, NgModule, ChangeDetectorRef, ViewChild, Input, ElementRef } from '@angular/core';
import { FormBuilder, Validators , NgForm} from '@angular/forms';
import { HttpService } from '../../../../Services/common/HttpService';
import { ApiService } from '../../../../Services/common/apiService';
import { canActivateMainChildGuard } from '../../../../Services/common/mainguard.service';
declare var $;
@Component({
  selector: 'app-services',
  providers: [canActivateMainChildGuard],
  templateUrl: './services.component.html',
  styleUrls: ['./services.component.css']
})

export class ServicesComponent implements OnInit {
  @ViewChild('NameControl') name: ElementRef;
  @ViewChild('f') myForm: NgForm;
  serviceInfo: any;
  dataTable: any;
  flag = true;
  // tslint:disable-next-line:max-line-length
  constructor(private fb: FormBuilder, private _dataSerice: HttpService, private chRef: ChangeDetectorRef, private apiService: ApiService) {

   }

  ngOnInit() {

  }

}

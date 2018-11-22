import { Component, OnInit, NgModule, ChangeDetectorRef, ViewChild, Input, ElementRef } from '@angular/core';
import { FormBuilder, Validators, NgForm } from '@angular/forms';
import { HttpService } from '../../../../../Services/common/HttpService';
import { ApiService } from '../../../../../Services/common/apiService';
import { RoutingService } from '../../../../../Services/common/routing.service';
import { ActivatedRoute } from '@angular/router';
import { NzNotificationService, NzModalService } from 'ng-zorro-antd';

declare var $;
@Component({
  selector: 'app-add-supplier',
  templateUrl: './add-supplier.component.html',
  styleUrls: ['./add-supplier.component.css']
})
export class AddSupplierComponent implements OnInit {
  Active = true;
  dataTable: any;
  flag = true;
  patientForm: any;
  AddServices = {
    buildingMaterialCategoryId: 0,
    equipmentName: '',
    equipmentCode: '',
    vendorName: '',
    contactPerson: '',
    contact1: '',
    contact2: '',
    contact3: '',
    address: '',
    purchaseDate: '',
    warrantyType: '',
    dates: new Date().toISOString().split('T')[0],
    scheduledMaintenance: '',
    id: 0
  }


  @ViewChild('NameControl') name: ElementRef;
  @ViewChild('f') myForm: NgForm;
  serviceInfo: any;
  BuildingCat: any;
  // tslint:disable-next-line:max-line-length
  constructor(private chRef: ChangeDetectorRef, private apiService: ApiService, private _routingService: RoutingService, private route: ActivatedRoute, private notification: NzNotificationService) {
  }

  ngOnInit() {
  }

  Reset() {
    this.myForm.reset();
  }

}




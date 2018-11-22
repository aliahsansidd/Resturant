import { Component, OnInit, NgModule, ChangeDetectorRef, ViewChild, Input, ElementRef } from '@angular/core';
import { FormBuilder, Validators, NgForm } from '@angular/forms';
import { HttpService } from '../../../../../Services/common/HttpService';
import { ApiService } from '../../../../../Services/common/apiService';
import { RoutingService } from '../../../../../Services/common/routing.service';
import { ActivatedRoute, Router } from '@angular/router';
import { NzNotificationService, NzModalService } from 'ng-zorro-antd';

declare var $;
@Component({
  selector: 'app-add-services',
  templateUrl: './add-services.component.html',
  styleUrls: ['./add-services.component.css']
})
export class AddServicesComponent implements OnInit {
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
    warrantyExpires: '',
    scheduledMaintenance: '',
    createdOn: '',
    id: 0
  }

  @ViewChild('NameControl') name: ElementRef;
  @ViewChild('f') myForm: NgForm;
  serviceInfo: any;
  BuildingCat: any;
  // tslint:disable-next-line:max-line-length
  constructor(private chRef: ChangeDetectorRef, private _route: Router , private apiService: ApiService, private _routingService: RoutingService, private route: ActivatedRoute, private notification: NzNotificationService) {
  }

  ngOnInit() {
    let a = this.route.snapshot.params.id;
    this.apiService.BuildingInfo.getSingleServiceInfo(a).subscribe((res: any) => {
      let b = res;
      this.AddServices.buildingMaterialCategoryId = b.buildingMaterialCategoryId;

      this.AddServices.equipmentName = b.equipmentName;
      this.AddServices.equipmentCode = b.equipmentCode;
      this.AddServices.vendorName = b.vendorName;
      this.AddServices.contactPerson = b.contactPerson;
      this.AddServices.contact1 = b.contact1;
      this.AddServices.contact2 = b.contact2;
      this.AddServices.contact3 = b.contact3;
      this.AddServices.address = b.address;
      this.AddServices.purchaseDate = new Date(b.purchaseDate).toDateString();
      this.AddServices.warrantyType = b.warrantyType;
      this.AddServices.warrantyExpires = new Date(b.warrantyExpires).toDateString();
      this.AddServices.scheduledMaintenance = new Date(b.scheduledMaintenance).toDateString();
      this.AddServices.id = b.id;

    });
    console.log(a);
    this.GetCategory();
    this.GetServiceInfo();

  }
  DataTablesFunctionCallAfterDataInit() {
    if (!this.flag) {
      this.dataTable.clear().destroy();
      this.dataTable = null;
    }
    this.chRef.detectChanges();
    const table: any = $('table');
    this.dataTable = table.DataTable({
      // enables horizontal scrolling
      dom: 'lBfrtip',
      'autoWidth': true,
      lengthMenu: [
        [10, 25, 50, -1],
        ['10 rows', '25 rows', '50 rows', 'Show all']
      ],
      buttons: [
        {
          extend: 'excelHtml5',
          title: 'Data export'
        },
        {
          extend: 'csvHtml5',
          title: 'Data export'
        },
        {
          extend: 'pdfHtml5',
          title: 'Data export'
        }
        ,
        'print'
      ]
    });

    // tslint:disable-next-line:max-line-length
    $('div.dt-buttons button:nth-child(1)').removeClass('dt-button buttons-copy buttons-html5').addClass('btn btn-outline-warning').append('<i class="fa fa-file-excel-o"> </i>');
    // tslint:disable-next-line:max-line-length
    $('div.dt-buttons button:nth-child(2)').removeClass('dt-button buttons-copy buttons-html5').addClass('btn btn-outline-success').append('<i class="fa fa-columns"> </i>');
    // tslint:disable-next-line:max-line-length
    $('div.dt-buttons button:nth-child(3)').removeClass('dt-button buttons-copy buttons-html5').addClass('btn btn-outline-info').append('<i class="fa fa-file-pdf-o"> </i>');
    // tslint:disable-next-line:max-line-length
    $('div.dt-buttons button:nth-child(4)').removeClass('dt-button buttons-copy buttons-html5').addClass('btn btn-outline-danger').append('<i class="fa fa-print"> </i>');
    // $('div.dt-buttons button:nth-child(5)').removeClass('dt-button buttons-copy buttons-html5')
    //   .addClass('btn btn-outline-danger').append('<i class="fa fa-save"> </>');
    $('div.dt-buttons span').addClass('text');

    $('div.dt-buttons button:nth-child(1)').detach().appendTo('#destination');
    $('div.dt-buttons button:nth-child(1)').detach().appendTo('#destination');
    $('div.dt-buttons button:nth-child(1)').detach().appendTo('#destination');
    $('div.dt-buttons button:nth-child(1)').detach().appendTo('#destination');

    $('#example_wrapper').addClass('row');
    $('#example_length').addClass('col-lg-8 col-md-8');
    $('#example_filter').addClass('col-lg-8 col-md-8');

    $('#example_length select').css('width', '80px');
    $('#example_length select option:contains("10 rows")').text('10');
    $('#example_length select option:contains("25 rows")').text('25');
    $('#example_length select option:contains("50 rows")').text('50');
    $('#example_length select option:contains("Show all")').text('100').val('100');


    $('#example_paginate').addClass('col-13');

    let i = 1;
    $('#example tfoot th').each(function () {
      let title = $(this).text();
      if (i === 7) {

      } else {
        // tslint:disable-next-line:max-line-length
        $(this).html('<input class="form-control" style="width:80%; line-height: 1.5 !important;" type="text" placeholder="Search" />');
      }

      i++;
    });
    // Apply the search
    this.dataTable.columns().every(function () {
      let that = this;
      $('input', this.footer()).on('keyup change', function () {
        if (that.search() !== this.value) {
          that
            .search(this.value)
            .draw();
        }
      });
    });

    this.flag = false;
  }
  navigateTo(route) {
    this._route.navigate([route]);
  }
  GetServiceInfo() {
    this.apiService.BuildingInfo.GetallServiceInfo().subscribe((res: any) => {
      this.serviceInfo = res.data;
      this.DataTablesFunctionCallAfterDataInit();
    });
  }
  GetCategory() {
    this.apiService.BuildingInfo.GetallBuildingInfo().subscribe((res: any) => {
      this.BuildingCat = res.data;
    })
  }
  Reset() {
    this.myForm.resetForm();
  }
  Save() {

    if (!this.myForm.valid) {
      return null;
    }
    if (this.AddServices.id > 0) {
      this.apiService.BuildingInfo.updateServiceInfo(this.AddServices).subscribe(res => {


        console.log(res);
        this.GetServiceInfo();
        this.AddServices.id = -1;
        this.myForm.resetForm();
      })
    } else {
      this.apiService.BuildingInfo.CreateServiceInfo(this.AddServices).subscribe((res: any) => {

        this.notification.create('success', 'saved', 'Saved Successfully');
        this.GetServiceInfo();
        this.myForm.resetForm();
      });
    }
  }
}




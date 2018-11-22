import { Component, OnInit, NgModule, ChangeDetectorRef, ViewChild, Input, ElementRef } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpService } from '../../../../Services/common/HttpService';
import { FormBuilder, Validators, FormGroup, FormControl, NgForm } from '@angular/forms';
import { Jsonp } from '@angular/http';
import { ApiService } from '../../../../Services/common/apiService';
import { NzNotificationService, NzModalService } from 'ng-zorro-antd';
import { RoutingService } from '../../../../Services/common/routing.service';
import { Router } from '../../../../../../node_modules/@angular/router';
declare var $;
@Component({
  selector: 'app-building-information-category',
  templateUrl: './building-information-category.component.html',
  styleUrls: ['./building-information-category.component.css']
})
export class BuildingInformationCategoryComponent implements OnInit {
  Active = true;
  dataTable: any;
  flag = true;

  bsValue: Date = new Date();
  bsRangeValue: any = [new Date(this.bsValue.getFullYear(), this.bsValue.getMonth(), 1), new Date()];
  colorTheme = 'theme-green';
  pattern: any = '[a-zA-Z ]*';
  BuildingInfo = {
    name: '',
    description: '',
    status: true,
    createdOn: '',
    id: 0
  }
  buildingInfo: any;
  DeletedIndex: any;
  @ViewChild('NameControl') name: ElementRef;
  @ViewChild('f') myForm: NgForm;
  @ViewChild('BuildingType') BuildingType: ElementRef;
  BuildingInfo1: any;
  // tslint:disable-next-line:max-line-length
  nodes = [{
    title: 'Roles',
    key: '100',
    expanded: true,
    children: [{
      title: 'Doctors',
      key: '1001',
      expanded: true,
      children: [
        { title: 'leaf', key: '10010', isLeaf: true },
        { title: 'leaf', key: '10011', isLeaf: true },
        { title: 'leaf', key: '10012', isLeaf: true }
      ]
    }, {
      title: 'Admin',
      key: '1002',
      children: [
        { title: 'leaf', key: '10020', isLeaf: true }
      ]
    }, {
      title: 'Users',
      key: '1003',
      children: [
        { title: 'leaf', key: '10030', isLeaf: true },
        { title: 'leaf', key: '10031', isLeaf: true }
      ]
    }]
  }];
  buildingData: any;
  // tslint:disable-next-line:max-line-length
  constructor( private _dataSerice: HttpService, private chRef: ChangeDetectorRef, private apiService: ApiService, private notifiaction: NzNotificationService) {
  }

  ngOnInit() {
    this.GetBuildingInfo();
  }
  GetBuildingInfo() {
    this.apiService.BuildingInfo.GetallBuildingInfo().subscribe((res: any) => {
      console.log(res);
      this.buildingInfo = res.data.sort(this.ArrayInDecending('id'));
      this.buildingData = this.buildingInfo
      this.DataTablesFunctionCallAfterDataInit();
    });
  }
  selectRange() {
    setTimeout(() => {
      let startDate = new Date(this.bsRangeValue[0].toISOString().split('T')[0]);
      let endDate = new Date(this.bsRangeValue[1].toISOString().split('T')[0]);
      this.buildingInfo = this.buildingData.filter((BuildingInfo) => {
        let a = new Date(BuildingInfo.createdOn.split('T')[0]);
        return a >= startDate && a <= endDate;
      });

    }, 250);
  }
  ResetTable() {
    this.dataTable.search('').columns().search('').draw();
    $('#example tfoot th').each(function () {
      let title = $(this).text();
      // tslint:disable-next-line:max-line-length
      $(this).html('<input class="form-control" value="" style="width:80%; line-height: 1.5 !important;" type="text" placeholder="Search ' + title + '" />');
    });
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
      'autoWidth': false,
      lengthMenu: [
        [10, 25, 50, -1],
        ['10 rows', '25 rows', '50 rows', 'Show all']
      ],
      buttons: [
        {
          extend: 'excelHtml5',
          title: 'Building Info',
          exportOptions: {
            columns: ':visible:not(.not-export-col)'
          }
        },
        {
          extend: 'csvHtml5',
          title: 'Building Info',
          exportOptions: {
            columns: ':visible:not(.not-export-col)'
          }
        },
        {
          extend: 'pdfHtml5',
          title: 'Building Info',
          exportOptions: {
            columns: ':visible:not(.not-export-col)'
          }
        }
        ,
        {
          extend: 'print',
          title: 'Building Info',
          exportOptions: {
            columns: [0, 1, 2]
          }
        }
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
      if (i === 4) {

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
  Reset() {
    this.myForm.resetForm();
  }
  ArrayInDecending(prop) {
    return function (a, b) {
      if (a[prop] > b[prop]) {
        return 1;
      } else if (a[prop] < b[prop]) {
        return -1;
      }
      return 0;
    }
  }
  Save() {
    if (!this.myForm.valid) {
      return null;
    }
    if (this.BuildingInfo.id > 0) {
      this.apiService.BuildingInfo.updateBuildingInfo(this.BuildingInfo).subscribe(res => {
        console.log(res);
        this.GetBuildingInfo();
        this.BuildingInfo.id = -1;
        this.myForm.resetForm();
      })
    } else {
      this.apiService.BuildingInfo.CreateBuildingInfo(this.BuildingInfo).subscribe((res: any) => {
        console.log(res);
        this.notifiaction.create('success', 'save', 'Saved Successfully');
        this.GetBuildingInfo();
        this.myForm.resetForm();
      });
    }
  }
  EditRecord(id, $element) {
    let a = this.buildingInfo.find(x => x.id === id);
    this.BuildingInfo.name = a.name;
    this.BuildingInfo.description = a.description;
    this.BuildingInfo.status = a.status === 1 ? true : false;
    this.BuildingInfo.id = a.id;
    $element.scrollIntoView({ behavior: 'smooth', block: 'start', inline: 'nearest' });
    setTimeout(() => {
      this.BuildingType.nativeElement.focus();
    }, 1000);
  }
  DeleteData(event) {
    this.DeletedIndex = event;
    this.apiService.BuildingInfo.DeleteBuildingInfo(this.DeletedIndex).subscribe((res: any) => {
      this.GetBuildingInfo();
    });
  }
}

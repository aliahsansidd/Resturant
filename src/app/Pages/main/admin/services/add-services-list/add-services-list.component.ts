import { Component, OnInit, ChangeDetectorRef, ViewChild, Input, ElementRef } from '@angular/core';
import { ApiService } from '../../../../../Services/common/apiService';
import { Router, ActivatedRoute } from '@angular/router';
import { RoutingService } from '../../../../../Services/common/routing.service';
declare var $;
@Component({
  selector: 'app-add-services-list',
  templateUrl: './add-services-list.component.html',
  styleUrls: ['./add-services-list.component.css']
})
export class AddServicesListComponent implements OnInit {
  dataTable: any;
  getAllPatients: any;
  flag = true;
  color = '#ceb33e';
  minDate = new Date(2017, 5, 10);
  maxDate = new Date(2018, 9, 15);
  colorTheme = 'theme-green';
  serviceInfo: any;
  BuildingCat: any;
  DeletedIndex: any;
  bsValue: Date = new Date();
  bsRangeValue: any = [new Date(this.bsValue.getFullYear(), this.bsValue.getMonth(), 1), new Date()];

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
  @ViewChild('BuildingType') BuildingType: ElementRef;
  BuidlingInfoService: any;
  BuildingCatData: any;
  serviceInfoData: any;
  constructor(private apiService: ApiService, private chRef: ChangeDetectorRef,
    private routingService: RoutingService, private router: Router, private activatedRoute: ActivatedRoute) {
  }

  ngOnInit() {
    this.GetCategory();
    this.GetServiceInfo();
    this.DataTablesFunctionCallAfterDataInit();
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
          title: 'Service List',
          exportOptions: {
            columns: ':visible:not(.not-export-col)'
          }
        },
        {
          extend: 'csvHtml5',
          title: 'Service List',
          exportOptions: {
            columns: ':visible:not(.not-export-col)'
          }
        },
        {
          extend: 'pdfHtml5',
          title: 'Service List',
          exportOptions: {
            columns: ':visible:not(.not-export-col)'
          }
        }
        ,
        {
          extend: 'print',
          title: 'Service List',
          exportOptions: {
            columns: [0, 1, 2, 3, 4 , 5 , 6]
          }
        }
      ]
    });

    // tslint:disable-next-line:max-line-length
    $('div.dt-buttons button:nth-child(1)').removeClass('dt-button buttons-copy buttons-html5').addClass('btn btn-outline-warning').append('&nbsp;<i class="fa fa-file-excel-o"> </i>');
    // tslint:disable-next-line:max-line-length
    $('div.dt-buttons button:nth-child(2)').removeClass('dt-button buttons-copy buttons-html5').addClass('btn btn-outline-success').append('&nbsp;<i class="fa fa-columns"> </i>');
    // tslint:disable-next-line:max-line-length
    $('div.dt-buttons button:nth-child(3)').removeClass('dt-button buttons-copy buttons-html5').addClass('btn btn-outline-info').append('&nbsp;<i class="fa fa-file-pdf-o"> </i>');
    // tslint:disable-next-line:max-line-length
    $('div.dt-buttons button:nth-child(4)').removeClass('dt-button buttons-copy buttons-html5').addClass('btn btn-outline-danger').append('&nbsp;<i class="fa fa-print"> </i>');
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
      if (i === 8 ) {

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
  GetServiceInfo() {
    this.apiService.BuildingInfo.GetallServiceInfo().subscribe((res: any) => {
      this.serviceInfo = res.data.sort(this.ArrayInDecending('id'));
      this.serviceInfoData = this.serviceInfo;
      this.DataTablesFunctionCallAfterDataInit();
    });
  }
  selectRange() {
    setTimeout(() => {
      let startDate = new Date(this.bsRangeValue[0].toISOString().split('T')[0]);
      let endDate = new Date(this.bsRangeValue[1].toISOString().split('T')[0]);
      this.serviceInfo = this.serviceInfoData.filter((AddServices) => {
        let a = new Date(AddServices.createdOn.split('T')[0]);
        return a >= startDate && a <= endDate;
      });

    }, 250);
  }
  GetCategory() {
    this.apiService.BuildingInfo.GetallBuildingInfo().subscribe((res: any) => {
      this.BuildingCat = res.data;
      this.BuildingCatData = this.BuildingCat
    })
  }
  GetBuildingCatName(id) {
    return this.BuildingCat.find(x => x.id === id).name;
  }
  EditRecord(id, $element) {
    this.routingService.navigateTo(['main/admin/services/add-services', id]);
   let a = this.BuidlingInfoService.find(x => x.id === id);
    this.AddServices.buildingMaterialCategoryId = a.buildingMaterialCategoryId;
    this.AddServices.equipmentName = a.equipmentName;
    this.AddServices.equipmentCode = a.equipmentCode;
    this.AddServices.vendorName = a.vendorName;
    this.AddServices.contactPerson = a.contactPerson
    this.AddServices.contact1 = a.contact1;
    this.AddServices.contact2 = a.contact2;
    this.AddServices.contact3 = a.contact3;
    this.AddServices.address = a.address;
    this.AddServices.purchaseDate = a.purchaseDate;
    this.AddServices.warrantyType = a.warrantyType;
    this.AddServices.warrantyExpires = a.warrantyExpires;
    this.AddServices.scheduledMaintenance = a.scheduledMaintenance;
    this.AddServices.id = a.id;
  }
  DeleteData(event) {
    this.DeletedIndex = event;
    this.apiService.BuildingInfo.DeleteServiceInfo(this.DeletedIndex).subscribe((res: any) => {
      this.GetServiceInfo();
    });
  }

}

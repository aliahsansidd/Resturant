import { Component, OnInit, ChangeDetectorRef, ElementRef, ViewChild } from '@angular/core';
import { isNullOrUndefined } from 'util';
import { ApiService } from '../../../../Services/common/apiService';
import { NgForm } from '@angular/forms';
import { NzNotificationService, NzModalService } from 'ng-zorro-antd';
declare var $;
@Component({
  selector: 'app-ward-category',
  templateUrl: './ward-category.component.html',
  styleUrls: ['./ward-category.component.css']
})
export class WardCategoryComponent implements OnInit {
  AllocationType = false;
  AllocationType1 = false;
  isDisabled = true;
  isDisabled1 = true;
  DailyPrice;
  HourlyPrice;
  Status = true;
  mytime;
  AllocationTypeError = false;
  WardCategory = {
    name: '',
    type: '',
    price: 0,
    status: true,
    id: 0,
    visitorStartTime: '',
    visitorEndTime: '',
    createdOn: ''
  }
  bsValue: Date = new Date();
  bsRangeValue: any = [new Date(this.bsValue.getFullYear(), this.bsValue.getMonth(), 1), new Date()];
  WardCategoryColl: any;
  checkDailyCheckbox = false;
  @ViewChild('f') myForm: NgForm;
  @ViewChild('WardName') WardName: ElementRef;
  dataTable: any;
  flag = true;
  DeletedIndex: any;
  disabledTime = false;
  lastWardCat = '' ;
  ShowERInput = false ;
  WardCategoryCollData: any;
  constructor(private apiService: ApiService, private chRef: ChangeDetectorRef, private notification: NzNotificationService) { }


  ngOnInit() {
    this.getAllWardCategory();
  }
  checkDailyCheckboxMethod() {
    if (this.checkDailyCheckbox) {
      this.WardCategory.visitorStartTime = '12:00:00';
      this.WardCategory.visitorEndTime = '12:00:00'
      this.disabledTime = true;
    } else {
      this.WardCategory.visitorEndTime = '';
      this.WardCategory.visitorStartTime = '';
      this.disabledTime = false;
    }

  }
  getAllWardCategory() {
    this.apiService.wardAndBedService.GetAllWardCategory().subscribe((res: any) => {
      this.WardCategoryColl = res.data.sort(this.ArrayInDecending('id'));
      this.WardCategoryCollData = this.WardCategoryColl
      console.log(this.WardCategoryColl);
      let a = [];
      this.WardCategoryColl
      .map((index) => {
        a.push(index.name)
      });
      let lastElement = a[a.length - 1];
      this.lastWardCat = lastElement;
      console.log(lastElement);
      this.DataTablesFunctionCallAfterDataInit();
    });
  }
  ValidateWardCatName(name) {
    // tslint:disable-next-line:triple-equals
    let a =  this.WardCategoryColl.filter(x => x.name == name);
    if (a.length > 0) {
      this.ShowERInput  = true ;
    } else {
      this.ShowERInput = false;
    }
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
  DailyChange() {
    this.HourlyPrice = (+this.DailyPrice / 24).toFixed(2);
    this.AllocationTypeError = false;
    if (isNullOrUndefined(this.DailyPrice)) {
      this.HourlyPrice = '';
      this.AllocationTypeError = true;
    }
  }
  HourlyChange() {
    this.DailyPrice = (+this.HourlyPrice * 24).toFixed(2);
    this.AllocationTypeError = false;
    if (isNullOrUndefined(this.HourlyPrice)) {
      this.DailyPrice = '';
      this.AllocationTypeError = true;
    }
  }
  trigger() {
    if (this.AllocationType) {
      this.isDisabled = false;
      this.isDisabled1 = true;
      this.AllocationType1 = false;
      if (this.DailyPrice === '') {
        this.AllocationTypeError = true;
      } else {
        this.AllocationTypeError = false;
      }
    } else {
      this.isDisabled = true;
    }
    this.SetValueToZero();

  }
  SetValueToZero() {
    if (!this.AllocationType && !this.AllocationType1) {
      this.HourlyPrice = '';
      this.DailyPrice = '';
      this.AllocationTypeError = true;
    }
  }
  trigger1() {
    if (this.AllocationType1) {
      this.isDisabled1 = false;
      this.isDisabled = true;
      this.AllocationType = false;
      if (this.HourlyPrice === '') {
        this.AllocationTypeError = true;
      } else {
        this.AllocationTypeError = false;
      }
    } else {
      this.isDisabled1 = true;
    }
    this.SetValueToZero();

  }
  Save() {
    if (!this.AllocationType && !this.AllocationType1 && isNullOrUndefined(this.DailyPrice) && isNullOrUndefined(this.HourlyPrice)) {
      this.AllocationTypeError = true;
      return;
    }
    if (!this.myForm.valid || this.ShowERInput === true) {
    this.notification.create ('error' , 'failed', 'Not Saved Successfully')
      return null;
    }
    this.WardCategory.price = this.AllocationType ? this.DailyPrice : this.HourlyPrice;
    this.WardCategory.type = this.AllocationType ? 'Daily' : 'Hourly';
    let startTime = new Date().toISOString().split('T')[0] + 'T' + this.WardCategory.visitorStartTime;
    let endTime = new Date().toISOString().split('T')[0] + 'T' + this.WardCategory.visitorEndTime;
    this.WardCategory.visitorStartTime = new Date(startTime).toLocaleTimeString();
    this.WardCategory.visitorEndTime = new Date(endTime).toLocaleTimeString();
    if (this.WardCategory.id > 0) {
      this.apiService.wardAndBedService.UpdateWardCategory(this.WardCategory).subscribe((res: any) => {
        this.getAllWardCategory();
        this.WardCategory.id = -1;
        this.myForm.resetForm();
        this.ShowERInput = false;
      })
    } else {
      this.apiService.wardAndBedService.CreateWardCategory(this.WardCategory).subscribe(
        data => {
          this.notification.create('success', 'Saved', 'Saved successfully');
          this.getAllWardCategory();
          this.myForm.resetForm();
          this.ShowERInput = false;
        },
        err => {
          this.notification.create('failure', 'fail', 'not saved successfully');
          console.log(err)
        }
      )
    }
  }
  Reset() {
    this.resetForm();
    this.ShowERInput = false;
  }
  resetForm() {
    this.myForm.resetForm();
    this.ShowERInput = false;
    this.DailyPrice = '';
    this.HourlyPrice = '';
    this.AllocationType = false;
    this.AllocationType1 = false;
    this.WardCategory.status = true;
    this.AllocationTypeError = false;
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
  selectRange() {
    setTimeout(() => {
      let startDate = new Date(this.bsRangeValue[0].toISOString().split('T')[0]);
      let endDate = new Date(this.bsRangeValue[1].toISOString().split('T')[0]);
      this.WardCategoryColl = this.WardCategoryCollData.filter((WardCategory) => {
        let a = new Date(WardCategory.createdOn.split('T')[0]);
        return a >= startDate && a <= endDate;
      });

    }, 250);
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
          title: 'Ward Category',
          exportOptions: {
            columns: ':visible:not(.not-export-col)'
          }
        },
        {
          extend: 'csvHtml5',
          title: 'Ward Category',
          exportOptions: {
            columns: ':visible:not(.not-export-col)'
          }
        },
        {
          extend: 'pdfHtml5',
          title: 'Ward Category',
          exportOptions: {
            columns: ':visible:not(.not-export-col)'
          }
        },
        {
          extend: 'print',
          title: 'Ward Category',
          exportOptions: {
            columns: [0, 1, 2, 3, 4]
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
      if (i === 6) {

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
  scrollToElement($element): void {
    console.log($element);
    $element.scrollIntoView({ behavior: 'smooth', block: 'start', inline: 'nearest' });
  }
  EditRecord(id, $element: any) {
    debugger;
    let a = this.WardCategoryColl.find(x => x.id === id);
    this.WardCategory.name = a.name;
    this.WardCategory.status = a.status;
    this.WardCategory.visitorStartTime = a.visitorStartTime.split('T')[1];
    this.WardCategory.visitorEndTime = a.visitorEndTime.split('T')[1];
    //  this.WardCategory = a.startTime.split('T')[1];
    this.WardCategory.id = a.id;
    if (a.type === 'Daily') {
      this.AllocationType = true;
      this.DailyPrice = a.price;
      this.AllocationType1 = false;
      this.HourlyPrice = '';
      this.DailyChange();
    } else {
      this.AllocationType1 = true;
      this.HourlyPrice = a.price;
      this.AllocationType = false;
      this.DailyPrice = '';
      this.HourlyChange();
    }
    this.trigger();
    this.trigger1();
    $element.scrollIntoView({ behavior: 'smooth', block: 'start', inline: 'nearest' });
    setTimeout(() => {
      this.WardName.nativeElement.focus();
    }, 1000);

  }
  DeleteData(event) {
    this.DeletedIndex = event;
    this.apiService.wardAndBedService.DeleteWardCategory(this.DeletedIndex).subscribe((res: any) => {
      this.getAllWardCategory();
    });
  }
}


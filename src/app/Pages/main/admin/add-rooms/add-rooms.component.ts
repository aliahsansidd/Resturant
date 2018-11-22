import { Component, OnInit, ChangeDetectorRef, ViewChild } from '@angular/core';
import { ApiService } from '../../../../Services/common/apiService';
import { NgForm } from '@angular/forms';
import { NzNotificationService, NzModalService } from 'ng-zorro-antd';
import { filter } from 'rxjs-compat/operator/filter';
declare var $;
@Component({
  selector: 'app-add-rooms',
  templateUrl: './add-rooms.component.html',
  styleUrls: ['./add-rooms.component.css']
})
export class AddRoomsComponent implements OnInit {
  RoomNames = '';
  lastEntryRoom = '';
  lastEntryRoomNumber = '';
  Active = true;
  GetAllWardCategory: any;
  RoomsCollection: any;
  wards = '';
  Rooms = {
    wardCategoryId: null,
    name: '',
    number: '',
    floorId: null,
    status: true,
    createdOn: '',
    id: -1
  }
  RoomData = []
  bsValue: Date = new Date();
  bsRangeValue: any = [new Date(this.bsValue.getFullYear(), this.bsValue.getMonth(), 1), new Date()];
  @ViewChild('f') myForm: NgForm;
  dataTable: any;
  flag = true;
  @ViewChild('Room') RoomName: any;
  DeletedIndex: any;
  ShowERInput = false;
  ShowERInput1 = false;
  Floors: any = [];
  constructor(private apiService: ApiService, private chRef: ChangeDetectorRef, private notification: NzNotificationService) { }

  ngOnInit() {
    this.getAllFloor();
    this.GetWardCategory();
    this.GetAllRooms();
  }
  selectRange() {
    debugger;
    setTimeout(() => {
      let startDate = new Date(this.bsRangeValue[0].toISOString().split('T')[0]);
      let endDate = new Date(this.bsRangeValue[1].toISOString().split('T')[0]);
      this.RoomsCollection = this.RoomData.filter((Rooms) => {
        let a = new Date(Rooms.createdOn.split('T')[0]);
        return a >= startDate && a <= endDate;
      });

    }, 250);

  }
  getAllFloor() {
    this.apiService.BuildingInfo.GetallFloor().subscribe((res: any) => {
      // tslint:disable-next-line:triple-equals
      this.Floors = res.data.filter(x => x.status === 1);
    })
  }
  getFloorName(id) {
    //  debugger;
    // tslint:disable-next-line:triple-equals
    let count = this.Floors.filter(x => x.id === id);
    if (count.length === 0) {
      return '';
    } else {
      return count[0].name;
    }
  }
  GetWardCategory() {
    this.apiService.wardAndBedService.GetAllWardCategory().subscribe((res: any) => {
      this.GetAllWardCategory = res.data;
    });
  }
  ValidateRoomName(Name) {
    // tslint:disable-next-line:triple-equals
    let a = this.RoomsCollection.filter(x => x.name == Name);
    if (a.length > 0) {
      this.ShowERInput = true;
    } else {
      this.ShowERInput = false;
    }
  }
  ValidateRoomNumber(numbers) {
    // tslint:disable-next-line:triple-equals
    let a = this.RoomsCollection.filter(x => x.number == numbers);
    if (a.length > 0) {
      this.ShowERInput1 = true;
    } else {
      this.ShowERInput1 = false;
    }
  }
  GetAllRooms() {
    this.apiService.wardAndBedService.GetAllRooms().subscribe((res: any) => {
      debugger;
      this.RoomData = res.data.sort(this.ArrayInDecending('id'));
      this.RoomsCollection = this.RoomData;

      let b1 = []
      for (let i = 0; i < this.RoomsCollection.length; i++) {
        b1 = this.RoomsCollection[i]
      }
      console.log(b1);
      console.log(this.RoomsCollection);
      let a = [];
      let b = [];
      this.RoomsCollection
        .map((index) => {
          a.push(index.name);
          b.push(index.number)
        });
      let lastRoomName = a[a.length - 1];
      let lastRoomNumber = b[b.length - 1];
      this.lastEntryRoom = lastRoomName;
      this.lastEntryRoomNumber = lastRoomNumber
      this.DataTablesFunctionCallAfterDataInit();
    })
  }
  Save() {
    if (!this.myForm.valid || this.ShowERInput === true || this.ShowERInput1 === true) {
      this.notification.create('error', 'failed', 'Not Saved Successfully')
      return null;
    }
    if (this.Rooms.id > 0) {
      this.apiService.wardAndBedService.UpdateRooms(this.Rooms).subscribe((res: any) => {
        this.Rooms.id = -1;
        this.GetAllRooms();
        this.myForm.resetForm();
        this.ShowERInput = false;
      })
    } else {
      // tslint:disable-next-line:triple-equals
      let WardName = this.GetAllWardCategory.find(x => x.id == this.Rooms.wardCategoryId).name;
      this.Rooms.name = WardName + '-' + this.Rooms.number;
      console.log('room name', this.Rooms.name);
      this.apiService.wardAndBedService.CreateRooms(this.Rooms).subscribe((res: any) => {
        this.notification.create('success', 'Saved', 'Saved successfully');
        this.GetAllRooms();
        this.myForm.resetForm();
        this.ShowERInput = false;

      })
    }


  }
  Reset() {
    this.myForm.resetForm();
    this.ShowERInput = false;

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
          title: 'Rooms',
          exportOptions: {
            columns: ':visible:not(.not-export-col)'
          }
        },
        {
          extend: 'csvHtml5',
          title: 'Rooms',
          exportOptions: {
            columns: ':visible:not(.not-export-col)'
          }
        },
        {
          extend: 'pdfHtml5',
          title: 'Rooms',
          exportOptions: {
            columns: ':visible:not(.not-export-col)'
          }
        },
        {
          extend: 'print',
          title: 'Rooms',
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

  EditRecord(id, $element: any) {
    let a = this.RoomsCollection.find(x => x.id === id);
    this.Rooms.name = a.name;
    this.Rooms.status = a.status;
    this.Rooms.wardCategoryId = a.wardCategoryId;
    this.Rooms.floorId = a.floorId;
    this.Rooms.number = a.number;
    //  this.WardCategory = a.startTime.split('T')[1];
    this.Rooms.id = a.id;
    $element.scrollIntoView({ behavior: 'smooth', block: 'start', inline: 'nearest' });
    setTimeout(() => {
      this.RoomName.nativeElement.focus();
    }, 1000);

  }
  DeleteData(event) {
    this.DeletedIndex = event;
    this.apiService.wardAndBedService.DeleteRooms(this.DeletedIndex).subscribe((res: any) => {
      this.GetAllRooms();
    });
  }


}

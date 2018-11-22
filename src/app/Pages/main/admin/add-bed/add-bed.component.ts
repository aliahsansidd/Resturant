import { Component, OnInit, ChangeDetectorRef, ViewChild, ElementRef } from '@angular/core';
import { ApiService } from '../../../../Services/common/apiService';
import { NgForm } from '@angular/forms';
import { NzNotificationService, NzModalService } from 'ng-zorro-antd';

declare var $;
@Component({
  selector: 'app-add-bed',
  templateUrl: './add-bed.component.html',
  styleUrls: ['./add-bed.component.css']
})
export class AddBedComponent implements OnInit {
  bedNumbers: any
  BedNos: Array<any> = new Array<any>();
  RoomEntry = false;
  Quantity = false;
  placeholder = ''
  lastEntryRoomNumber = '';
  lastEntry = '';
  ShowERInput = false;
  Status = true;
  Functional = true;
  ShowERInput1 = false;
  CheckBox = false;
  GetAllRoom: any;
  arr: Array<any> = new Array<any>();
  filterdArray: Array<any> = new Array<any>();
  filterdArray1: Array<any> = new Array<any>();
  Bed = {
    roomId: null,
    bedNo: '',
    note: '',
    isFunctional: true,
    status: true,
    createdOn: '',
    id: -1
  }
  bsValue: Date = new Date();
  bsRangeValue: any = [new Date(this.bsValue.getFullYear(), this.bsValue.getMonth(), 1), new Date()];
  dataTable: any;
  flag = true;
  @ViewChild('f') myForm: NgForm;
  BedCollection: any;
  DeletedIndex: any;
  @ViewChild('BedNo') BedNo: ElementRef;
  bedNoExist: boolean;
  GetAllWards: Array<any> = new Array<any>();
  RoomsCollection: Array<any> = new Array<any>();
  arr2: any[];
  arr3: any[];
  a1: Array<any> = new Array<any>();
  mia = [];
  max = 0;
  lastroomEntry = '';
  lastBedNo: any;
  checkBoxIDs = [];
  BedData: any;


  constructor(private apiService: ApiService, private chRef: ChangeDetectorRef, private notification: NzNotificationService) { }

  ngOnInit() {
    this.GetAllRooms();
    this.GetAllBed();
    this.GetAllWardCategories();
    this.CheckBox = this.checkBoxIDs.length > 0 ? true : false;
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
  GetAllWardCategories() {
    this.apiService.wardAndBedService.GetAllWardCategory().subscribe((res: any) => {
      this.GetAllWards = res.data;
      console.log('yeah', this.GetAllWards[0].name);
    });
  }
  checkChange() {
    if (this.Quantity === true) {
      this.placeholder = 'Add Single Bed'
    } else {
      this.placeholder = 'Add Quantity Of Bed'
    }
  }


  GetAllRooms() {
    this.apiService.wardAndBedService.GetAllRooms().subscribe((res: any) => {
      this.GetAllRoom = res.data;
    })
  }
  GetAllBed() {
    this.apiService.wardAndBedService.GetAllBed().subscribe((res: any) => {
      this.BedCollection = res.data.sort(this.ArrayInDecending('id'));
      this.BedData = this.BedCollection;
      // this.BedCollection.find('bedNo')
      console.log(this.BedCollection)
      let a = []; let b = []; let c = [];
      this.BedCollection
        .map((index) => {
          a.push(index.bedNo)
          b.push(index.roomId);
        });
      let lastElement = a[a.length - 1];
      let lastroomID = b[b.length - 1];
      this.lastroomEntry = lastroomID;
      this.lastEntry = lastElement;
      // this.QuantityOfBed(1010);
      console.log('last entry', lastElement);
      console.log('last room entry', this.lastroomEntry)
      this.DataTablesFunctionCallAfterDataInit();
    });
  }

  collectID(id) {
    //  let ab = [];
    // tslint:disable-next-line:triple-equals
    let rOomId = this.BedCollection.filter(x => x.roomId == id);
    // console.log('rooms' , rOomId)
    this.a1 = [];
    // tslint:disable-next-line:triple-equals
    if (rOomId.length == 0) {
      this.lastBedNo = 0;
      this.lastEntryRoomNumber = this.lastBedNo;
    } else {
      // this.lastBedNo = rOomId[rOomId.length - 1].bedNo;

      let min = 0, max = 0, x;
      // tslint:disable-next-line:forin
      for (x in rOomId) {
        // tslint:disable-next-line:curly
        // if (rOomId[x].bedNo < min) min = input[x];
        let a = +rOomId[x].bedNo;
        this.a1.push(a)
        console.log('bed no are?', a);
        if (a > max) {
          max = a;
        };
      }
      console.log('a1 kay array', this.a1);
      let ArraylowerBoundary = 1;
      this.lastBedNo = max; // 3
      this.findMissingNumbers(this.a1, ArraylowerBoundary);

      this.lastEntryRoomNumber = this.lastBedNo;

    }
  }
  EachRowID(id) {
    debugger;
    // tslint:disable-next-line:triple-equals
    if (this.checkBoxIDs.includes(id)) {
      this.checkBoxIDs.splice(this.checkBoxIDs.indexOf(id), 1);
    } else {
      this.checkBoxIDs.push(id);
    }
    if (this.checkBoxIDs.length > 0) {
      this.CheckBox = true;
    } else {
      this.CheckBox = false;
    }
  }
  findMissingNumbers(arrSequence, lowerBoundary) {
    for (let index = 1; index <= this.lastBedNo; index++) {
      if (!this.a1.includes(index)) {
        this.mia.push(index);
      }

    }
  }
  selectRange() {
    setTimeout(() => {
      debugger;
      let startDate = new Date(this.bsRangeValue[0].toISOString().split('T')[0]);
      let endDate = new Date(this.bsRangeValue[1].toISOString().split('T')[0]);
      this.BedCollection = this.BedData.filter((Bed) => {
        debugger;
        let a = new Date(Bed.createdOn.split('T')[0]);
        return a >= startDate && a <= endDate;
      });

    }, 250);

  }
  DeleteBulkData() {
    for (let index = 0; index <= this.checkBoxIDs.length; index++) {
      const element = this.checkBoxIDs[index];
      this.DeleteData(element, false);
    }
    this.notification.create('success', 'Deleted', 'Successfully Deleted');
    this.checkBoxIDs = [];
    this.CheckBox = false;
  }
  ValidateBedNo(name) {
    // tslint:disable-next-line:triple-equals
    let a = this.BedCollection.filter(x => x.bedNo == name);
    if (a.length > 0) {
      this.ShowERInput = true;
      // return false
    } else {
      this.ShowERInput = false;
    }
  }

  getRoomName(id) {
    let count = this.GetAllRoom.find(x => x.id === id);
    // debugger;
    if (count === undefined) {
      return '';
    } else {
      return count.name;
    }
  }
  getRoomName1(id) {
    // tslint:disable-next-line:no-unused-expression
    // tslint:disable-next-line:triple-equals
    return this.GetAllRoom.find(x => x.id === id).name;
  }


  Save() {
    debugger;
    let i: any;
    if (!this.myForm.valid || this.ShowERInput === true) {
      this.notification.create('error', 'failed', 'Not Saved Successfully');
      return null;
    }
    if (this.Bed.id > 0) {
      this.apiService.wardAndBedService.UpdateBed(this.Bed).subscribe((res: any) => {
        this.Bed.id = -1;
        this.GetAllBed();
        this.myForm.resetForm();
      })
    }

    // tslint:disable-next-line:one-line
    else {
      // if (this.mia.length > 0) {
      debugger;
      let x = +this.Bed.bedNo;
      for (let j = 1; j <= x; j++) {
        let a;
        if (this.mia.length > 0) {
          a = this.mia[0];
          this.mia.splice(0, 1);
        } else {
          this.lastBedNo = a = this.lastBedNo + 1;
        }
        this.Bed.bedNo = a;
        this.apiService.wardAndBedService.CreateBed(this.Bed).subscribe((res: any) => {
          this.GetAllBed();
          this.myForm.resetForm();
          this.lastEntryRoomNumber = '';
        })
      }
      this.notification.create('success', 'Saved', 'Saved successfully');
    }
  }



  Reset() {
    this.myForm.resetForm();
    this.ShowERInput = false;
    this.lastEntryRoomNumber = '';
    this.Quantity = true;

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
      dom: 'lBfrtip',
      'autoWidth': false,
      lengthMenu: [
        [10, 25, 50, -1],
        ['10 rows', '25 rows', '50 rows', 'Show all']
      ],
      buttons: [
        {
          extend: 'excelHtml5',
          title: 'Add bed',
          exportOptions: {
            columns: ':visible:not(.not-export-col)'
          }

        },
        {
          extend: 'csvHtml5',
          title: 'Add bed',
          exportOptions: {
            columns: ':visible:not(.not-export-col)'
          }

        },
        {
          extend: 'pdfHtml5',
          title: 'Add bed',
          exportOptions: {
            columns: ':visible:not(.not-export-col)'
          }

        },
        {
          extend: 'print',
          title: 'Add bed',
          exportOptions: {
            columns: [0, 1, 2, 3]
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

  EditRecord(id, $element: any) {
    let a = this.BedCollection.find(x => x.id === id);
    this.Bed.bedNo = a.bedNo;
    this.Bed.status = a.status;
    this.Bed.roomId = a.roomId;
    this.Bed.note = a.note;
    this.Bed.isFunctional = a.isFunctional;
    this.Bed.status = a.status === 1 ? true : false;
    //  this.WardCategory = a.startTime.split('T')[1];
    this.Bed.id = a.id;
    $element.scrollIntoView({ behavior: 'smooth', block: 'start', inline: 'nearest' });
    setTimeout(() => {
      this.BedNo.nativeElement.focus();
    }, 1000);

  }
  DeleteData(event, showNotification) {
    this.DeletedIndex = event;
    this.apiService.wardAndBedService.DeleteBed(this.DeletedIndex).subscribe((res: any) => {
      this.GetAllBed();
      if (showNotification === true) {
        this.notification.create('success', 'Deleted', 'Successfully Deleted');
      }
    });
    this.myForm.reset();
  }
}

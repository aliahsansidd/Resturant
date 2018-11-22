import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../../../../Services/common/apiService';
import { RoutingService } from '../../../../Services/common/routing.service';
import { NzNotificationService } from 'ng-zorro-antd';
declare var $;

@Component({
  selector: 'app-usermanagement',
  templateUrl: './usermanagement.component.html',
  styleUrls: ['./usermanagement.component.css']
})
export class UserManagementComponent implements OnInit {
  allUsers: any;
  dataTable: any;
  flag = true;
  color = '#ceb33e';
  minDate = new Date(2017, 5, 10);
  maxDate = new Date(2018, 9, 15);
  edit = false;
  deleteSuccess = false;
  abc: any[];
  bsValue: Date = new Date();
  bsRangeValue: any = [new Date(this.bsValue.getFullYear(), this.bsValue.getMonth(), 1), new Date()];

  colorTheme = 'theme-green';
  value: string;
  searchValue: any;
  isVisible = false;
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
  DeletedIndex: any;
  allUsersData: any;

  constructor(private apiService: ApiService, private chRef: ChangeDetectorRef, private route: Router,
     private routingService: RoutingService, private notification: NzNotificationService) {
  }

  ngOnInit() {
    // localStorage.removeItem('patient');
    // this.apiService.user.getAllDiseases().subscribe(res => {
    //   console.log(res);
    // })
   this.getAllUsers();
  }
  goToAdd() {
    this.route.navigate(['main/admin/add-user']);
  }
  getAllUsers() {
    this.apiService.user.getAllUser().subscribe((res: any) => {
      console.log(res);
      this.allUsers = res.data.result;
      this.allUsersData = this.allUsers
      console.log('iskay' + this.allUsers);
      console.log(this.allUsers )
      // this.DataTablesFunction();
      this.DataTablesFunctionCallAfterDataInit();
    })
  }
  selectRange() {
    setTimeout(() => {
      let startDate = new Date(this.bsRangeValue[0].toISOString().split('T')[0]);
      let endDate = new Date(this.bsRangeValue[1].toISOString().split('T')[0]);
      this.allUsers = this.allUsersData.filter((adduser) => {
        let a = new Date(adduser.createdOn.split('T')[0]);
        return a >= startDate && a <= endDate;
      });

    }, 250);
  }
  editUser(i, user) {
    console.log(user);
    this.apiService.user.sendUser(user);
    // let parsed = Object(user);
    localStorage.setItem('user',  JSON.stringify(user));
    this.routingService.navigateTo(['main/admin/add-user']);
  }

  DeleteUser(event) {
      this.DeletedIndex = event;
      this.apiService.user.deleteSingleUser(this.DeletedIndex).subscribe((res: any) => {
        this.notification.create('success', 'Delete', 'user deleted successfully');
        this.getAllUsers();
      });
  }

  openModal(value) {
    console.log(value);
    //  $('#myModal').appendTo("body").modal('show');
    $('#exampleModalCenter').modal().show();
    $('#exampleModalCenter').remove();
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
          title: ' User Manage',
          exportOptions: {
            columns: ':visible:not(.not-export-col)'
          }
        },
        {
          extend: 'csvHtml5',
          title: ' User Manage',
          exportOptions: {
            columns: ':visible:not(.not-export-col)'
          }
        },
        {
          extend: 'pdfHtml5',
          title: ' User Manage',
          exportOptions: {
            columns: ':visible:not(.not-export-col)'
          }
        }
        ,
        {
          extend: 'print',
          title: ' User Manage',
          exportOptions: {
            columns: [0, 1, 2, 3, 4, 5, 6]
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
      if (i === 5) {

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
  showModal(): void {
    this.isVisible = true;
  }

  handleOk(): void {
    console.log('Button ok clicked!');
    this.isVisible = false;
  }

  handleCancel(): void {
    console.log('Button cancel clicked!');
    this.isVisible = false;
  }
  // reset() {
  //   let tableData = this.getAllPatients;
  //   this.getAllPatients = [];
  //   this.getAllPatients = tableData;
  // }
  // exportExcel() {
  //   $('#example').dataTable().fnDestroy();
  //   $(document).ready(function () {
  //     $('#example').DataTable({
  //       dom: 'Bfrtip',
  //       buttons: [{
  //         extend: 'pdf',
  //         text: 'Save current page',
  //         exportOptions: {
  //           modifier: {
  //             page: 'current'
  //           }
  //         }
  //       }, {
  //         extend: 'excel',
  //         title: 'Customized EXCEL Title',
  //         filename: 'customized_excel_file_name'
  //       }, {
  //         extend: 'csv',
  //         filename: 'customized_csv_file_name'
  //       }]
  //     });
  //   });
  // }
  hideButton() {
    $('.buttons-excel').hide();
    $('.buttons-columns').hide();
    $('.buttons-pdf').hide();
    $('.buttons-print').hide();
    $('.buttons-csv').hide();
  }
  ShowButton() {
    $('.buttons-excel').show();
    $('.buttons-columns').show();
    $('.buttons-pdf').show();
    $('.buttons-print').show();
    $('.buttons-csv').show();
  }

}

import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../../../../Services/common/apiService';
import { RoutingService } from '../../../../Services/common/routing.service';
import { NzFormatEmitEvent, NzTreeNode, NzNotificationService } from 'ng-zorro-antd';
declare var $;

@Component({
  selector: 'app-role-management',
  templateUrl: './rolemanagement.component.html',
  styleUrls: ['./rolemanagement.component.css']
})
export class RoleManagementComponent implements OnInit {
  allRoles: any;
  dataTable: any;
  flag = true;
  color = '#ceb33e';
  minDate = new Date(2017, 5, 10);
  maxDate = new Date(2018, 9, 15);
  edit = false;
  deleteSuccess = false;

  bsValue: Date = new Date();
  bsRangeValue: any = [new Date(2017, 7, 4), new Date(2017, 7, 20)];

  colorTheme = 'theme-green';
  value: string;
  searchValue: any;
  isVisible = false;
  allUsers = [];
  newNode = [];
  nodes = [{
    title: 'parent 1',
    key: '100',
    expanded: true,
    children: []
    // children: [ {
    //   title   : 'parent 1-0',
    //   key     : '1001',
    //   expanded: true,
    //   children: [
    //     { title: 'leaf', key: '10010', isLeaf: true },
    //     { title: 'leaf', key: '10011', isLeaf: true },
    //     { title: 'leaf', key: '10012', isLeaf: true }
    //   ]
    // }, {
    //   title   : 'parent 1-1',
    //   key     : '1002',
    //   children: [
    //     { title: 'leaf', key: '10020', isLeaf: true }
    //   ]
    // }, {
    //   title   : 'parent 1-2',
    //   key     : '1003',
    //   children: [
    //     { title: 'leaf', key: '10030', isLeaf: true },
    //     { title: 'leaf', key: '10031', isLeaf: true }
    //   ]
    // } ]
  }];
  // nodes = [{
  //   title: 'Roles',
  //   key: '100',
  //   expanded: true,
  //   children: [
  //     // title: ,
  //     // children: [
  //     //   { title: [] }
  //     // ]
  //     // {
  //     //   title: 'Admin',
  //     //   key: '1002',
  //     //   children: [
  //     //     { title: 'leaf', key: '10020', isLeaf: true }
  //     //   ]
  //     // }
  //     // , {
  //     //   title: 'Users',
  //     //   key: '1003',
  //     //   children: [
  //     //     { title: 'leaf', key: '10030', isLeaf: true },
  //     //     { title: 'leaf', key: '10031', isLeaf: true }
  //     //   ]
  //     // }
  //   ]
  // }];
  DeletedIndex: any;
  constructor(private apiService: ApiService, private chRef: ChangeDetectorRef, private route: Router,
    private routingService: RoutingService, private notification: NzNotificationService) {
  }

  ngOnInit() {
    this.FindingSpecificUsers();


  }

  styles() {
    let toggler = document.getElementsByClassName('caret');
    let i;

    for (i = 0; i < toggler.length; i++) {
      toggler[i].addEventListener('click', function () {
        this.parentElement.querySelector('.nested').classList.toggle('active');
        this.classList.toggle('caret-down');
      });
    }
  }
  FindingSpecificUsers() {
    this.apiService.user.getAllUser().subscribe((res: any) => {
      debugger;
      let a = res.data.result;
      for (const x of a) {
        this.allUsers.push(x);
      }
      this.getAllRoles();
      console.log('users are:', this.allUsers);
    })
  }
  getAllRoles() {
    this.apiService.roleService.getAllRoles().subscribe((res: any) => {
      console.log(res);
      this.allRoles = res.data.sort(this.ArrayInDecending('id'));
      console.log(this.nodes);
      this.DataTablesFunctionCallAfterDataInit();
    })
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

  openModal(value) {
    console.log(value);
    //  $('#myModal').appendTo("body").modal('show');
    $('#exampleModalCenter').modal().show();
    $('#exampleModalCenter').remove();
  }

  openTab(tabName) {
    let x, i;
    x = document.getElementsByClassName('view1');
    for (i = 0; i < x.length; i++) {
      x[i].style.display = 'none';
    }
    document.getElementById(tabName).style.display = 'block';
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
          title: ' Role Manage',
          exportOptions: {
            columns: ':visible:not(.not-export-col)'
          }
        },
        {
          extend: 'csvHtml5',
          title: ' Role Manage',
          exportOptions: {
            columns: ':visible:not(.not-export-col)'
          }
        },
        {
          extend: 'pdfHtml5',
          title: ' Role Manage',
          exportOptions: {
            columns: ':visible:not(.not-export-col)'
          }
        }
        ,
        {
          extend: 'print',
          title: ' Role Manage',
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
  editRole(index, id) {
    console.log(index);
    console.log(id);
    localStorage.setItem('role-id', id);
    this.routingService.navigateTo(['main/admin/add-role']);

  }
  // deleteRole(id, index) {
  //   this.apiService.roleService.deleteRole(id).subscribe(res => {
  //     console.log(res);
  //   })
  // }
  // reset() {
  //   let tableData = this.getAllPatients;
  //   this.getAllPatients = [];
  //   this.getAllPatients = tableData;
  // }

  DeleteSingleRole(event) {
    this.DeletedIndex = event;
    this.apiService.roleService.deleteRole(this.DeletedIndex).subscribe((res: any) => {
      this.notification.create('success', 'Delete', 'Role deleted successfully');
      this.getAllRoles();
    });
  }
  nzEvent(event: NzFormatEmitEvent): void {
    console.log(event);
  }
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

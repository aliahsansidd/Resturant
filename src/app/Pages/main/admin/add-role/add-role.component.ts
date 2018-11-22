import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../../../Services/common/apiService';
import { query } from '@angular/core/src/render3/query';
import { ActivatedRoute } from '@angular/router';
import { NzNotificationService } from 'ng-zorro-antd';

@Component({
  selector: 'app-add-role',
  templateUrl: './add-role.component.html',
  styleUrls: ['./add-role.component.css']
})
export class AddRoleComponent implements OnInit {
  permissions = [];
  userRolePermissions = [];
  selectedPermission = [];
  Role: any = {
    role: '',
    PermissionId: '',
    id: -1
  }
  userPermissions = {
    roleId: '',
    permissionId: '',
    id: ''
  }
  previllage = [
    {
      department: 'doctor',
    },
    {
      department: 'Management',
    },
    {
      department: 'Staff',

    },
    {
      department: 'Faculty',

    },
    {
      department: 'HR',

    },
    {
      department: 'Admin',

    },
    {
      department: 'Security',

    },
    {
      department: 'Pharmacy',

    },
  ]
  option: any;
  allPermissions: any;
  allRoles: any;
  edit = true;
  role: any;
  data: { name: any; permissions: any; userRolePermissions: any[]; id: string; };
  constructor(private activatedRoute: ActivatedRoute, private apiService: ApiService, private notification: NzNotificationService) {
    if (localStorage.getItem('role-id')) {
      console.log('NEW');
      this.role = localStorage.getItem('role-id');
      console.log(this.role);
    }
  }
      ngOnInit() {
        this.apiService.roleService.getSingleRole(this.role).subscribe((res: any) => {
          console.log(res, 'SINGLE');
          this.Role.role = res.data.name;
          this.Role.roleId = res.data.id;
          this.selectedPermission = res.data.permissions;
          console.log(this.Role.roleId);
        })
        this.edit = false;
        this.apiService.permissions.getAllPermissions().subscribe((res: any) => {
          // console.log(res);
          this.allPermissions = res.data;
          for (let i = 0; i <= this.allPermissions.length; i++) {
            this.permissions.push(this.allPermissions[i]);
            // this.userPermissions.permissionId = this.allPermissions[i].id;
            // console.log(this.allPermissions[i]);
            // this.userRolePermissions.push(this.allPermissions[i].id);
            // console.log(this.userRolePermissions);
          }
        })
        this.apiService.roleService.getAllRoles().subscribe((res: any) => {
          // console.log(res);
          this.allRoles = res.data;
        })
      }
      addOption(option) {
        this.option = option;
      }
      createRole(Role, permissions) {
        console.log(Role);
        console.log(permissions);
        if (!this.role) {
        for (let i = 0; i < permissions.length; i++) {
          let userpermissions = {
                  permissionId: permissions[i].id,
                  roleId: '',
                  id: ''
                }
                this.userRolePermissions.push(userpermissions);
                // console.log(userpermissions);
        }
        this.data = {
          name: Role.role,
          permissions: permissions,
          userRolePermissions: this.userRolePermissions,
          id: ''
        }
        console.log(this.data);
        this.apiService.roleService.createRole(this.data).subscribe(res => {
          console.log(res);
          this.notification.create('success', 'Create', 'Role Created Successfully');
          localStorage.removeItem('role-id');
        });
      } else {
        for (let i = 0; i < permissions.length; i++) {
          let userpermissions = {
                  permissionId: permissions[i].id,
                  roleId: this.Role.roleId,
                  id: ''
                }
                this.userRolePermissions.push(userpermissions);
                // console.log(userpermissions);
        }
        this.data = {
          name: Role.role,
          permissions: permissions,
          userRolePermissions: this.userRolePermissions,
          id: this.Role.roleId
        }
        // console.log(this.data);
        // this.data.id = this.Role.roleId;
        console.log(this.data);
        this.apiService.roleService.updateRole(this.data).subscribe((res) => {
              console.log(res);
              this.notification.create('success', 'Update', 'Role Updated Successfully');
              localStorage.removeItem('role-id');
            }
            )
      }
    }
      // save() {
      //   const data = {
      //     // name: Role,
      //     // this.Role.roleId
      //   }
      //   this.apiService.roleService.updateRole(data).subscribe((res) => {
      //     console.log(res);
      //   }
      //   )}
      addPrivellage(previllage) {
        this.permissions.push(previllage);
        for (let i = 0; i <= this.permissions.length; i++) {
          if (this.previllage[i].department === previllage ) {
            let newArray = this.previllage.splice(i, 1);
            // console.log(newArray);
          }
        }
        // console.log(this.permissions);
        // console.log(this.option);
        // for (let i = 0; i <= this.previllage.length - 1; i++) {
        //   console.log('==================');
        //   console.log(this.previllage.length);
        //   console.log(i);
        //   console.log(this.previllage[i]);
        //   console.log(index);
        //   console.log('=-=======================');
        //   if (this.option === this.previllage[i].department) {
        //     console.log(this.option === this.previllage[i].department, this.option);
        //     index = this.previllage[i];
        //   }
        // }
        // console.log(index, '!!!!!!!');
        // this.previllage.splice(index, 1);
        // console.log(this.previllage);
      }



  }


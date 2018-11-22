import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './login.component';
import { LoginRoutingModule } from './login.routing';
import { NgZorroAntdModule } from 'ng-zorro-antd';

@NgModule({
  imports: [
    LoginRoutingModule,
    NgZorroAntdModule.forRoot(),
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    NgZorroAntdModule.forRoot()
  ],
  declarations: [LoginComponent]
})
export class LoginModule { }

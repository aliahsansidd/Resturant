import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FooterComponent } from './CommonComponents';
import { RightsidebarComponent } from './CommonComponents';
import { HttpClientModule } from '@angular/common/http';
import { HttpService } from './Services/common/HttpService';
import { canActivateMainChildGuard } from './Services/common/mainguard.service';
import { ImageUploadModule } from 'ng2-imageupload';
import { RoutingService } from './Services/common/routing.service';
import { RoutingModule } from './app-routing.module';
import { ApiService } from './Services/common/apiService';
import { LocalStorageService } from './Services/endpoints/localStorage.service';
import { AlertModalComponent } from './CommonComponents/alert-modal/alert-modal.component';
import { AlertModalModule } from './CommonComponents/alert-modal/alert-modal.module';
import { LocaleService } from './Services/common/locale.service';
import { NgXBootstrapModule } from './BootstrapModules/NgxBootstrapServices.service';
import { NgSelectModule } from '@ng-select/ng-select'
import { BsDatepickerModule } from 'ngx-bootstrap';
import { Ng4LoadingSpinnerModule } from 'ng4-loading-spinner';
import { NgZorroAntdModule } from 'ng-zorro-antd';
// import { OwlDateTimeModule, OwlNativeDateTimeModule } from 'ng-pick-datetime';


import { NgHttpLoaderModule } from 'ng-http-loader';


@NgModule({
  declarations: [
    FooterComponent,
    RightsidebarComponent,
    AppComponent
  ],
  imports: [
    NgHttpLoaderModule,
    BrowserModule,
    BrowserAnimationsModule,
    NgSelectModule,
    FormsModule,
    ReactiveFormsModule,
    ImageUploadModule,
    HttpModule,
    HttpClientModule,
    RoutingModule,
    AlertModalModule,
    NgXBootstrapModule,
    AlertModalModule,
    Ng4LoadingSpinnerModule,
    // OwlDateTimeModule,
    // OwlNativeDateTimeModule,
    BsDatepickerModule.forRoot(),
    NgZorroAntdModule.forRoot(),
  ],
  providers: [
    HttpService,
    ApiService,
    LocalStorageService,
    canActivateMainChildGuard,
    RoutingService,
    LocaleService
  ],
  exports: [HttpClientModule],
  bootstrap: [AppComponent]
})
export class AppModule { }

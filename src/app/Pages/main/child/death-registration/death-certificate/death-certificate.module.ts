import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { DeathCertificateComponent } from './death-certificate.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { DeathCertificateRoutingModule } from './death-certificate.routing';


@NgModule({
    imports: [
      FormsModule,
      ReactiveFormsModule,
      CommonModule,
      DeathCertificateRoutingModule
    ],
    declarations: [DeathCertificateComponent],
    entryComponents: [],
    exports: [DeathCertificateComponent],
    providers: []
  })
export class DeathCertificateModule { }

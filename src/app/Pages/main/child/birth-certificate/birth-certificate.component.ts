import { Component, OnInit, Input, OnChanges, ViewChild, ElementRef } from '@angular/core';
import { isNullOrUndefined } from 'util';

@Component({
  selector: 'app-birth-certificate',
  templateUrl: './birth-certificate.component.html',
  styleUrls: ['./birth-certificate.component.css']
})
export class BirthCertificateComponent implements OnInit, OnChanges {

  @Input() DataSource: any;
  @ViewChild('Printable') abc: ElementRef;
  @Input() _Print: any;
  constructor() { }

  ngOnInit() {
  }
  Print() {
    let b = document.body.innerHTML;
    let a = document.getElementById('Printable').innerHTML;
    document.body.innerHTML = a;
    window.print();
    location.reload();
  }

  ngOnChanges() {
    if (!isNullOrUndefined(this.DataSource)) {
      setTimeout(() => {
        this.abc.nativeElement.style.display = 'block';
        let b = document.body.innerHTML;
        let a = document.getElementById('Printable').innerHTML;
        document.body.innerHTML = a;
        window.print();
        this.DataSource = undefined;
        location.reload();
      }, 1000);
      // setTimeout(() => {
      //   this.abc.nativeElement.style.display = 'none';
      // }, 1000);
    }
  }
}

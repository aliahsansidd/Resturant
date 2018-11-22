import { Component, OnInit, Input, ViewChild, ElementRef, OnChanges } from '@angular/core';
import { isNullOrUndefined } from 'util';

@Component({
  selector: 'app-death-certificate',
  templateUrl: './death-certificate.component.html',
  styleUrls: ['./death-certificate.component.css']
})
export class DeathCertificateComponent implements OnInit, OnChanges {

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
    debugger;
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

    }
}

}

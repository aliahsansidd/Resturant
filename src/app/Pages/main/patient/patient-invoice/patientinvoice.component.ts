import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Payment } from '../../../../Models/payement.model';
@Component({
  selector: 'app-patientinvoice',
  templateUrl: './patientinvoice.component.html',
  styleUrls: ['./patientinvoice.component.css']
})
export class PatientinvoiceComponent implements OnInit {
  payment: Payment = {
    discount: null,
    tax: null,
    mode: null,
    totalamount: null,
    dueamount: null,
    RecievedAmount: null,
    type: null

  };
  paymentmode = [
    { value: 1, text: 'cash' },
    { value: 2, text: 'cheque' },
    { value: 3, text: 'debitcard' }
  ];

  paymenttype = [
    { value: 1, text: 'Pay Now' },
    { value: 2, text: 'Pay Late' },

  ]
  patient = {
    InvoiceNo: 33315,
    MrNumber: '123-2013',
    CrNumber: '222-131',
    PatientName: 'Adil Rasheed',
    Referredby: 'John Doe',
    Age: 23,
    ContactNo: '0323232323',
    DoctorName: 'Muhammad Ali'
  };

  @ViewChild('Printable') abc: ElementRef;
  Clock = Date.now();
  constructor() { }

  print() {

    setTimeout(() => {
    //  this.abc.nativeElement.style.display = 'block';
      let b = document.body.innerHTML;
      let a = document.getElementById('Printable').innerHTML;
      document.body.innerHTML = a;
      window.print();
     // this.DataSource = undefined;
      location.reload();
    }, 1000);
  }

  ngOnInit() {
    setInterval(() => {
      this.Clock = Date.now();
    }, 1000);
  }

}

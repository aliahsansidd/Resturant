import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../Services/common/apiService';
declare var $: any;

@Component({
  selector: 'app-alert-modal',
  templateUrl: './alert-modal.component.html',
  styleUrls: ['./alert-modal.component.css']
})
export class AlertModalComponent implements OnInit {
  successMessage: any;
  errorMessage: any;
  showSuccess = false;
  showError: Boolean = false;

  constructor(private apiService: ApiService) { }

  ngOnInit() {
  }
  showAlert(condition, message) {
    this.apiService.patientService.$callAlertObservable.subscribe(res => {
      if (res === 'Success') {
        this.successMessage = message;
        this.showSuccess = true;
        console.log(this.showSuccess);
      } else {
        this.showError = true;
        this.errorMessage = message;
      }
    })
    // console.log(this.showSuccess);
    // if (this.showSuccess) {
    //   console.log(this.showSuccess, 'SUCCESS');
    //   // $('#success').show();
    //   // $('#error').hide();
    //   this.successMessage = message;
    // } else if (this.showError) {
    //   console.log(this.showError, 'Error');
    //   // $('#error').show();
    //   // $('#success').hide();
    //   this.errorMessage = message;
    // }
  }
}

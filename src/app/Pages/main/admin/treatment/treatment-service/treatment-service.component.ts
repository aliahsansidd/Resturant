import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { isNullOrUndefined } from 'util';
import { ApiService } from '../../../../../Services/common/apiService';

declare var $;
@Component({
  selector: 'app-treatment-service',
  templateUrl: './treatment-service.component.html',
  styleUrls: ['./treatment-service.component.css']
})
export class TreatementServiceComponent implements OnInit {
  Active = true;
  dataTable: any;
  flag = true;
  Rates: any;
  Quantity: any;
  Total: any;
  bsValue: Date = new Date();
  bsRangeValue: any = [new Date(2017, 7, 4), new Date(2017, 7, 20)];

  colorTheme = 'theme-green';

  constructor(private apiService: ApiService, private chRef: ChangeDetectorRef) {
  }

  ngOnInit() {
    this.DataTablesFunctionCallAfterDataInit();
  }
  GetTotalAmount() {
    if (!isNullOrUndefined(this.Rates) && !isNullOrUndefined(this.Quantity)) {
      this.Total = this.Rates * this.Quantity;
    } else {
      this.Total = '';
    }
  }
  DataTablesFunctionCallAfterDataInit() {
    if (!this.flag) {
      this.dataTable.destroy();
      this.dataTable = null;
    }
    this.chRef.detectChanges();
    const table: any = $('table');
    this.dataTable = table.DataTable();
    // Setup - add a text input to each footer cell

    let i = 1;
    $('#example tfoot th').each(function () {
      let title = $(this).text();
      if (i === 6) {
      } else {
        // tslint:disable-next-line:max-line-length
        $(this).html('<input class="form-control" style="width:80%; line-height: 1.5 !important;" type="text" placeholder="Search " />');
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
}

import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from '../../../../Services/common/apiService';
import { NzNotificationService } from 'ng-zorro-antd';

@Component({
  selector: 'app-card-price',
  templateUrl: './card-price.component.html',
  styleUrls: ['./card-price.component.css']
})
export class CardPriceComponent implements OnInit {
  intervalID: any;
  CardPrice = '';
  DupCardPrice = '';
  edit = false;
  loader = true;
  // Clock = Date.now();

  constructor(private apiService: ApiService, private notification: NzNotificationService) { }

  public ngOnInit() {
    this.apiService.card.getCardDetails().subscribe((res: any) => {
      console.log(res);
      this.loader = false;
      this.CardPrice = res.data[0].value;
      this.DupCardPrice = res.data[1].value;
      this.edit = false;
    })
    // setInterval(() => {
    //   this.Clock = Date.now();
    // }, 1000);
  }
  // Reset() {
  //   this.CardPrice = 200;
  //   this.DupCardPrice = 300;

  // }
  Save(CardPrice, DupCardPrice) {
    const ObjCategory: any = [
      {
      'key': 'CardAmount',
            'value': CardPrice,
            'group': 'Patient',
            'isActive': true,
            'status': 'Active',
            'id': 1
    },
    {
      'key': 'DuplicateCardAmount',
              'value': DupCardPrice,
              'group': 'Patient',
              'isActive': true,
              'status': 'Active',
              'id': 2
    }
  ]
    console.log(ObjCategory);
    let updatedPrice = this.apiService.card.updateCardDetails(ObjCategory).subscribe((res: any) => {
      console.log(res);
      this.notification.create('success', 'Update', 'Prices updated successfully');
      this.edit = false;
    });
    console.log(updatedPrice);
  }
  editPrice() {
    this.edit = true;
  }


}

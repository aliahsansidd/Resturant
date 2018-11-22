import { Component, OnInit, ChangeDetectorRef, ViewChild, ElementRef } from '@angular/core';
import { NgForm } from '@angular/forms';
import { NzNotificationService, NzModalService, UploadFile, NzMessageService } from 'ng-zorro-antd';
import { ApiService } from 'app/Services/common/apiService';


declare var $;
@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent implements OnInit {
  Status = true;
  Functional = true;
  GetAllRoom: any;
  Bed = {
    roomId: null,
    bedNo: '',
    note: '',
    isFunctional: true,
    status: true,
    id: -1
  }
  Frontbase64textString: string;
  url: string | ArrayBuffer;
  dataTable: any;
  flag = true;
  @ViewChild('f') myForm: NgForm;
  BedCollection: any;
  DeletedIndex: any;
  @ViewChild('BedNo') BedNo: ElementRef;
  frontUrl: any;
  RackNameCollection: any;
  ProductGenericCollection: any;
  BrandNameCollection: any;
  ProductCategoryCollection: any;
  ProductTypeCollection: any;
  // tslint:disable-next-line:max-line-length
  constructor(private chRef: ChangeDetectorRef, private apiService: ApiService, private msg: NzMessageService, private notification: NzNotificationService) { }

  ngOnInit() {
    this.GetAllRackName();
    this.GetAllProductGeneric();
    this.GetAllBrandName();
    this.GetAllProductCategory();
    this.GetAllProductType();
  }
  GetAllRackName() {
    this.apiService.pharmacyService.GetAllRackName().subscribe((res: any) => {
      this.RackNameCollection = res.data;
    });
  }
  GetAllProductGeneric() {
    this.apiService.pharmacyService.GetAllProductGeneric().subscribe((res: any) => {
      this.ProductGenericCollection = res.data;
    });
  }
  GetAllBrandName() {
    this.apiService.pharmacyService.GetAllBrandName().subscribe((res: any) => {
      this.BrandNameCollection = res.data;
    });
  }
  GetAllProductCategory() {
    this.apiService.pharmacyService.GetAllProductCat().subscribe((res: any) => {
      this.ProductCategoryCollection = res.data;
    });
  }
  GetAllProductType() {
    this.apiService.pharmacyService.GetAllProductType().subscribe((res: any) => {
      this.ProductTypeCollection = res.data;
    });
  }
  handleFrontImage(evt) {
    console.log(evt);
    console.log(evt.srcElement.value);
    let files = evt.target.files;
    let file = files[0];

    if (files && file) {
      let reader = new FileReader();

      reader.onload = this._handleFrontImageReader.bind(this);
      this.readURL(evt);

      reader.readAsBinaryString(file);
    }
  }
  _handleFrontImageReader(readerEvt) {
    let binaryString = readerEvt.target.result;
    this.Frontbase64textString = btoa(binaryString);
    console.log(btoa(binaryString));
  }
  readURL(event) {
    if (event.target.files && event.target.files[0]) {
      let reader = new FileReader();
      // tslint:disable-next-line:no-shadowed-variable
      reader.onload = (event: any = ProgressEvent) => {
        $('#front-image')
                    .attr('src', event.target.result)
                    .width(323.52)
                    .height(204);
        this.frontUrl = (<FileReader>event.target).result;
        console.log(this.url);
      }
      reader.readAsDataURL(event.target.files[0]);
    }
  }
}




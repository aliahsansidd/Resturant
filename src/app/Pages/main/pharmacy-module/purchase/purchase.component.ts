import { Component, OnInit, ChangeDetectorRef, TemplateRef, ViewChild, ElementRef } from '@angular/core';
import { NgForm } from '@angular/forms';
import { NzNotificationService, NzModalService, UploadFile, NzMessageService, NzModalRef } from 'ng-zorro-antd';
import { ApiService } from 'app/Services/common/apiService';
import { ActivatedRoute } from '../../../../../../node_modules/@angular/router';


declare var $;
@Component({
  selector: 'app-purchase',
  templateUrl: './purchase.component.html',
  styleUrls: ['./purchase.component.css']
})
export class PurchaseComponent implements OnInit {
  Status = true;
  isVisible = false;
  isConfirmLoading = false;
  tplModal: NzModalRef;
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
  constructor(private modalService: NzModalService,
    private route: ActivatedRoute,
    private chRef: ChangeDetectorRef,
    private apiService: ApiService, private msg: NzMessageService, private notification: NzNotificationService) { }

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
  createTplModal(tplTitle: TemplateRef<{}>, tplContent: TemplateRef<{}>, tplFooter: TemplateRef<{}>): void {
    this.tplModal = this.modalService.create({
      nzTitle: tplTitle,
      nzContent: tplContent,
      nzFooter: tplFooter,
      nzMaskClosable: false,
      nzClosable: false,
      nzOnOk: () => console.log('Click ok')
    });
  }
  destroyTplModal(): void {
    this.tplModal.destroy();
  }
  handleOk() {
    this.isConfirmLoading = true;
    setTimeout(() => {
      this.isVisible = false;
      this.isConfirmLoading = false;
    }, 3000);
  }

  handleCancel() {
    this.isVisible = false;
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




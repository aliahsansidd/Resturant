import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ApiService } from '../../../../Services/common/apiService';
declare var $;
@Component({
  selector: 'app-card-design',
  templateUrl: './card-design.component.html',
  styleUrls: ['./card-design.component.css']
})
export class CardDesignComponent implements OnInit {

  percentDone: number;
  uploadSuccess: boolean;
  size: any;
  width: number;
  height: number;
  width2: number;
  height2: number;
  FrontImageWidth: number;
  FrontImageheight: number;
  ReadImage: any;
  BackImage: any;
  BackImageheight: number;
  BackImageWidth: number;
  FrontImage: any;
  FrontImageUpload = false;
  BackImageupload = false;
  FrontImageError = false;
  BackImageError = false;
  ExpiryYear = 5;
  url: string | ArrayBuffer;
  Frontbase64textString: string;
  Backbase64textString: string;
  frontUrl: any;
  backUrl: any;
  expiry: any;
  constructor(private apiService: ApiService, private _sanitizer: DomSanitizer) { }

  // tslint:disable-next-line:member-ordering
  FileToUpload: any;
  ngOnInit() {
    this.apiService.card.getCardDetails().subscribe((res: any) => {
      console.log(res);
      this.frontUrl = this._sanitizer.bypassSecurityTrustResourceUrl('data:image/jpg;base64,' + res.data[2].value);
      this.backUrl = this._sanitizer.bypassSecurityTrustResourceUrl('data:image/jpg;base64,' + res.data[3].value);
      this.expiry = res.data[4].value;
    })

  }
  // tslint:disable-next-line:member-ordering
  @ViewChild('coverFilesInput') imgType: ElementRef;

  // tslint:disable-next-line:member-ordering
  @ViewChild('coverFilesInput2') imgType2: ElementRef;


  handleBackImage(evt) {
    console.log(evt);
    let files = evt.target.files;
    let file = files[0];

    if (files && file) {
      let reader = new FileReader();

      reader.onload = this._handleBackImageReader.bind(this);
      this.readBackURL(evt);
      reader.readAsBinaryString(file);
    }
  }
  _handleBackImageReader(readerEvt) {
    let binaryString = readerEvt.target.result;
    this.Backbase64textString = btoa(binaryString);
    console.log(btoa(binaryString));
  }
  readBackURL(event) {
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

  checkFrontImageDimensions(): boolean {
    if (this.FrontImageWidth >= 200 && this.FrontImageWidth <= 203 && this.FrontImageheight >= 125 && this.FrontImageheight <= 129) {
      return true;
    } else {
      this.FrontImageError = true;
      // false;
      return false;
    }
  }
  checkBackImageDimensions(): boolean {
    if (this.BackImageWidth >= 200 && this.BackImageWidth <= 203 && this.BackImageheight >= 125 && this.BackImageheight <= 129) {
      return true
    } else {
      this.BackImageError = true;
      // false;
      return false;
    }
  }
  SetExpiry(expiry) {
    // this.apiService.card.setCardExpiry(expiry).subscribe(res => {
    //   console.log(res);
    // })
    const ObjCategory: any = [
      //   {
      //   'key': 'CardAmount',
      //         'value': CardPrice,
      //         'group': 'Patient',
      //         'isActive': true,
      //         'status': 'Active',
      //         'id': 1
      // },
      {
        'key': 'CardFrontImage',
        'value': this.Frontbase64textString,
        'group': 'Patient',
        'isActive': true,
        'status': 'Active',
        'id': 3
      },
      {
        'key': 'CardBackImage',
        'value': this.Backbase64textString,
        'group': 'Patient',
        'isActive': true,
        'status': 'Active',
        'id': 4
      },
      {
        'key': 'CardExpiryInYears',
        'value': expiry,
        'group': 'Patient',
        'isActive': true,
        'status': 'Active',
        'id': 5
      }
    ]
    this.apiService.card.updateCardDetails(ObjCategory).subscribe(res => {
      console.log(res);
    })
  }
  // Save() {
  //   if (this.FrontImageUpload) {
  //     if (this.checkFrontImageDimensions()) {
  //       this._ObjHttp.post('', this.FrontImage).subscribe(data => {
  //         //   console.log("FirstImageSaveSuccessFul");
  //       })
  //     }
  //   }

  //   if (this.BackImageupload) {
  //     if (this.checkBackImageDimensions()) {
  //       this._ObjHttp.post('', this.FrontImage).subscribe(data => {
  //         //  console.log("FirstImageSaveSuccessFul");
  //       })
  //     }
  //   }

  // }




}

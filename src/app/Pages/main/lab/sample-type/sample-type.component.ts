import { Component, OnInit, ChangeDetectorRef, ViewChild, ElementRef } from '@angular/core';
import { ApiService } from 'app/Services/common/apiService';
import { NzNotificationService } from 'ng-zorro-antd';
declare var $;
@Component({
  selector: 'app-sample-type',
  templateUrl: './sample-type.component.html',
  styleUrls: ['./sample-type.component.css']
})
export class SampleTypeComponent implements OnInit {


  sample_type = {
    sampleName: '',
    sampleType: '',
    colour: '',
    containerType: '',
    collectionInstruction: '',
    containerColour: '',
    prefix: '',
    isPrefix: true,
    description: '',
    id: -1
  }
  prefixpostfix = '';
  selectPrePost = '';
  color: any;
  containerColor: any;
  allSampleType: Array<any> = new Array<any>();
  public options: Object = {
    charCounterCount: true,
    events: {
      // 'froalaEditor.blur': function (e, editor) {
      //   // tslint:disable-next-line:no-debugger
      //   debugger;
      //   console.log(editor._original_html);
      //   this.saveTextEditor(editor._original_html);
      // }
    },
    // tslint:disable-next-line:max-line-length
    toolbarButtons: ['fullscreen', 'bold', 'italic', 'underline', '|', 'fontFamily', 'fontSize', 'color', 'inlineStyle', 'paragraphStyle', '|', 'paragraphFormat', 'align', 'formatOL', 'formatUL', 'outdent', 'indent', 'insertLink', 'insertTable', '|', 'specialCharacters', 'insertHR', 'insertImage']

  };
  dataTable: any;
  index = 0;
  @ViewChild('froala') froala: ElementRef;
  @ViewChild('samplename') samplename: ElementRef;
  flag = true;
  DeletedIndex: any;
  constructor(private apiService: ApiService,
    private notification: NzNotificationService,
    private chRef: ChangeDetectorRef) {
  }
  ngOnInit(): void {
    this.getAllSampleType();
  }
  DataTablesFunctionCallAfterDataInit() {
    if (!this.flag) {
      this.dataTable.destroy();
      this.dataTable = null;
    }
    this.chRef.detectChanges();
    const table: any = $('table');
    this.dataTable = table.DataTable({
      // enables horizontal scrolling
      dom: 'lBfrtip',
      lengthMenu: [
        [10, 25, 50, -1],
        ['10 rows', '25 rows', '50 rows', 'Show all']
      ],
      buttons: [
        {
          extend: 'excelHtml5',
          title: 'Data export'
        },
        {
          extend: 'csvHtml5',
          title: 'Data export'
        },
        {
          extend: 'pdfHtml5',
          title: 'Data export'
        }
        ,
        'print'
      ]
    });

    // tslint:disable-next-line:max-line-length
    $('div.dt-buttons button:nth-child(1)').removeClass('dt-button buttons-copy buttons-html5').addClass('btn btn-outline-warning').append('&nbsp;<i class="fa fa-file-excel-o"> </>');
    // tslint:disable-next-line:max-line-length
    $('div.dt-buttons button:nth-child(2)').removeClass('dt-button buttons-copy buttons-html5').addClass('btn btn-outline-success').append('&nbsp;<i class="fa fa-columns"> </>');
    // tslint:disable-next-line:max-line-length
    $('div.dt-buttons button:nth-child(3)').removeClass('dt-button buttons-copy buttons-html5').addClass('btn btn-outline-info').append('&nbsp;<i class="fa fa-file-pdf-o"> </>');
    // tslint:disable-next-line:max-line-length
    $('div.dt-buttons button:nth-child(4)').removeClass('dt-button buttons-copy buttons-html5').addClass('btn btn-outline-danger').append('&nbsp;<i class="fa fa-print"> </>');
    // $('div.dt-buttons button:nth-child(5)').removeClass('dt-button buttons-copy buttons-html5')
    //   .addClass('btn btn-outline-danger').append('<i class="fa fa-save"> </>');

    $('div.dt-buttons button:nth-child(1)').detach().appendTo('#destination');
    $('div.dt-buttons button:nth-child(1)').detach().appendTo('#destination');
    $('div.dt-buttons button:nth-child(1)').detach().appendTo('#destination');
    $('div.dt-buttons button:nth-child(1)').detach().appendTo('#destination');

    $('#example_wrapper').addClass('row');
    $('#example_length').addClass('col-8');
    $('#example_filter').addClass('col-8');

    $('#example_length select').css('width', '80px');
    $('#example_length select option:contains("10 rows")').text('10');
    $('#example_length select option:contains("25 rows")').text('25');
    $('#example_length select option:contains("50 rows")').text('50');
    $('#example_length select option:contains("Show all")').text('100').val('100');


    $('#example_paginate').addClass('col-13');

    let i = 1;
    $('#example tfoot th').each(function () {
      let title = $(this).text();
      if (i === 6) {
      } else {
        // tslint:disable-next-line:max-line-length
        $(this).html('<input class="form-control" style="width:80%; line-height: 1.36 !important;" type="text" placeholder="Search" />');
      }
      i++;

      if (i === 6) {

      } else {
        // tslint:disable-next-line:max-line-length
        $(this).html('<input class="form-control" style="width:80%; line-height: 1.5 !important;" type="text" placeholder="Search ' + title + '" />');
      }

      i++;
    });
    // Apply the search
    this.dataTable.columns().every(function () {
      let that = this;
      $('input', this.footer()).on('keyup change', function () {
        console.log(that.search());
        if (that.search() !== this.value) {
          console.log(this.value);
          that.searchValue = this.value;
          that
            .search(this.value)
            .draw();
        }
      });
    });

    this.flag = false;
  }
  save() {
    this.sample_type.colour = this.color;
    this.sample_type.containerColour = this.containerColor;
    if (this.selectPrePost === 'prefix') {
      this.sample_type.prefix = this.prefixpostfix;
      this.sample_type.isPrefix = true;
    }
    if (this.selectPrePost === 'postfix') {
      this.sample_type.prefix = this.prefixpostfix;
      this.sample_type.isPrefix = false;
    }
    if (this.sample_type.id > 0) {
      this.apiService.labService.updateSampleType(this.sample_type)
        .subscribe(
          (res: any) => {
            console.log(res.data);
            this.notification.create('success', 'Update', 'Sample Update Successfully');
            this.getAllSampleType();
          },
          (err: any) => {
            console.log(err);
            this.notification.create('error', 'Error', 'Something Went Wrong');
          }
        )
    } else {
      this.apiService.labService.postSampleType(this.sample_type)
        .subscribe(
          (res: any) => {
            console.log(res.data);
            this.notification.create('success', 'Saved', 'Sample Saved Successfully');
            this.getAllSampleType();
          },
          (error: any) => {
            this.notification.create('error', 'Error', 'Something Went Wrong');
          }
        )
    }
  }

  getSampleColorHex() {
    this.sample_type.colour = this.color;
  }

  getContainerColorHex() {
    this.sample_type.containerColour = this.containerColor;
  }

  getAllSampleType() {
    this.apiService.labService.getAllSampleType()
      .subscribe(
        (res: any) => {
          this.allSampleType = res.data;
          this.DataTablesFunctionCallAfterDataInit();
        }
      )
  }
  EditRecord(id, $element: any) {
    let a = this.allSampleType.find(x => x.id === id);
    this.sample_type.sampleName = a.sampleName;
    this.sample_type.sampleType = a.sampleType;
    this.sample_type.colour = a.colour;
    this.sample_type.containerColour = a.containerColour;
    this.sample_type.containerType = a.containerType;
    this.sample_type.collectionInstruction = a.collectionInstruction;
    this.sample_type.description = a.description;
    this.sample_type.id = a.id;
    this.color = a.colour;
    this.containerColor = a.containerColour;
    $element.scrollIntoView({ behavior: 'smooth', block: 'start', inline: 'nearest' });
    setTimeout(() => {
      this.samplename.nativeElement.focus();
    }, 1000);
  }
  DeleteData(event) {
    this.DeletedIndex = event;
    this.apiService.labService.deleteSampleType(this.DeletedIndex).subscribe((res: any) => {
      this.getAllSampleType();
    });
  }
}

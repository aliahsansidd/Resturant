import { Component, OnInit, ChangeDetectorRef, ViewChild, ElementRef } from '@angular/core';
import { ApiService } from 'app/Services/common/apiService';
import { NzNotificationService } from 'ng-zorro-antd';
import { ActivatedRoute } from '@angular/router';
declare var $;
@Component({
  selector: 'app-build-test',
  templateUrl: './build-test.component.html',
  styleUrls: ['./build-test.component.css']
})
export class BuildTestComponent implements OnInit {
  test = {
    name: '',
    code: '',
    dependencyTests: '',
    remarks: '',
    price: 0,
    sampleType: '',
    sampleInstructions: '',
    isSampleNeeded: false,
    isResultEntry: false,
    isConductionRequired: false,
    isConductByDoctor: false,
    conductingInstructions: '',
    conductionFormat: '',
    testInformation: '',
    status: 0,
    createdOn: '',
    labDepartmentServicesId: 0,
    labTestTemplateId: 0,
    id: 0
  }
  tamplateValue: Array<any> = new Array<any>();
  dependency: Array<any> = new Array<any>();
  selectedDependency = [];
  ID: number;
  unit = '';
  labSample: Array<any> = new Array<any>(0);
  flag = true;
  testByValueArr: Array<any> = new Array<any>();
  dependencyList: Array<any> = new Array<any>();
  editorArray: Array<any> = new Array<any>();
  testByValueArray = [];
  labTestByValue = {
    resultLabel: '',
    priority: 0,
    isApplicableForAll: false,
    gender: '',
    isAgeInDayMonthYearForMale: 0,
    isAgeInDayMonthYearForFemale: 0,
    maleAgeMin: 0,
    maleAgeMax: 99,
    maleNormalRangeMin: '',
    maleNormalRangeMax: '',
    maleAbnormalRangeMin: '',
    maleAbnormalRangeMax: '',
    maleCriticalRangeMin: '',
    maleCriticalRangeMax: '',
    femaleAgeMin: 0,
    femaleAgeMax: 99,
    femaleNormalRangeMin: '',
    femaleNormalRangeMax: '',
    femaleAbnormalRangeMin: '',
    femaleAbnormalRangeMax: '',
    femaleCriticalRangeMin: '',
    femaleCriticalRangeMax: '',
    createdOn: '',
    labTestByTemplateId: 0,
    labTestingUnitId: 0,
    id: 0
  }
  ageInDaysForMale = false;
  ageInDaysForFemale = false;
  LabTestTemplate =
    {
      name: '',
      code: '',
      templateIsByValueOrByEditor: '',
      labTestByValuedto: [
        {
          resultLabel: '',
          priority: 0,
          isApplicableForAll: false,
          gender: '',
          isAgeInDayMonthYearForMale: 0,
          isAgeInDayMonthYearForFemale: 0,
          maleAgeMin: 0,
          maleAgeMax: 99,
          maleNormalRangeMin: '',
          maleNormalRangeMax: '',
          maleAbnormalRangeMin: '',
          maleAbnormalRangeMax: '',
          maleCriticalRangeMin: '',
          maleCriticalRangeMax: '',
          femaleAgeMin: 0,
          femaleAgeMax: 99,
          femaleNormalRangeMin: '',
          femaleNormalRangeMax: '',
          femaleAbnormalRangeMin: '',
          femaleAbnormalRangeMax: '',
          femaleCriticalRangeMin: '',
          femaleCriticalRangeMax: '',
          createdOn: '',
          labTestByTemplateId: 0,
          labTestingUnitId: 0,
          id: 0
        }
      ],
      labTestByEditordto: [
        {
          editorText: '',
          priority: 0,
          labTestByTemplateId: 0,
          id: 0
        }
      ],
      id: 0
    }

  // tslint:disable-next-line:no-unused-expression
  showSampleDropDown = false;
  sampleValue = false;
  InActive = true
  isValue = false;
  isTemplate = false; 0
  isConfirmLoading = false;
  departments: any;
  departmentServices: any;
  filteredServices = [];
  editorContent = '';
  showTemplate = false;
  labTestUnit: Array<any> = new Array<any>();
  allTestBuilder: Array<any> = new Array<any>();
  textEditor = {
    editorText: '',
    priority: 0,
    labTestByTemplateId: 0,
    id: -1
  }
  public options: Object = {
    charCounterCount: true,
    events: {
    },
    // tslint:disable-next-line:max-line-length
    toolbarButtons: ['fullscreen', 'bold', 'italic', 'underline', '|', 'fontFamily', 'fontSize', 'color', 'inlineStyle', 'paragraphStyle', '|', 'paragraphFormat', 'align', 'formatOL', 'formatUL', 'outdent', 'indent', 'insertLink', 'insertTable', '|', 'specialCharacters', 'insertHR', 'insertImage']

  };
  dataTable: any;
  index = 0;
  @ViewChild('froala') froala: ElementRef;
  editArray: Array<any> = new Array<any>();
  constructor(private apiService: ApiService,
    private notification: NzNotificationService,
    private activeRoute: ActivatedRoute,
    private chRef: ChangeDetectorRef) {
    this.LabTestTemplate.labTestByValuedto.splice(0, 1);
    this.LabTestTemplate.labTestByEditordto.splice(0, 1);
  }
  ngOnInit(): void {
    const routeParams = this.activeRoute.snapshot.params;
    console.log(routeParams.id);
    if (routeParams.id !== undefined) {
      this.apiService.labService.getOneLabTestBuilder(routeParams.id)
        .subscribe(
          (res: any) => {
            console.log('One ', res.data);
            this.test = res.data;
            this.apiService.labService.getSingleTestTemplate(this.test.labTestTemplateId)
            .subscribe(
              (resp: any) => {
                console.log('testtempl ', resp.data);
              }
            )
          }
        )
    }
    this.apiService.labService.getAllLabDepartments().subscribe((res: any) => {
      console.log(res);
      this.departments = res.data;
    })
    this.apiService.labService.getAllLabServices().subscribe((res: any) => {
      console.log(res);
      this.departmentServices = res.data;
    })

    this.apiService.labService.getLabTestBuilder()
      .subscribe(
        (res: any) => {
          console.log('Lab Test Builder', res);
          this.dependencyList = res.data;
        }
      )
    this.apiService.labService.getSampleType()
      .subscribe(
        (res: any) => {
          this.labSample = res.data;
          console.log('Lab Sample', this.labSample);
        }
      )
    this.getTestUnits();
    this.getAlltestBuilder();
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
      if (i === 7) {
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
  conductionFormat(value) {

    if (value === 'value') {
      this.test.conductionFormat = value;
      // this.showTemplate = false;
      this.showModal(value);
    } else if (value === 'template') {
      //  this.editArray = [];
      this.tamplateValue.push(this.LabTestTemplate.labTestByEditordto);
      // this.editArray.push(this.editorArray[this.editorArray.length - 1]);
      console.log(this.tamplateValue);
      // this.test.conductionFormat = value;
      this.showTemplate = true;
    }
  }
  getTestUnits() {
    this.apiService.labService.getAllTestingUnits().subscribe((res: any) => {
      this.labTestUnit = res.data;
    });
  }

  getAlltestBuilder() {
    this.apiService.labService.getAllTestBuilder()
      .subscribe(
        (res: any) => {
          this.allTestBuilder = res.data;
          console.log('Test Builder ', this.allTestBuilder);
        }
      )
  }

  setMaleAge(value) {
    if (value === 'D') {
      this.labTestByValue.isAgeInDayMonthYearForMale = 1;
    } else if (value === 'M') {
      this.labTestByValue.isAgeInDayMonthYearForMale = 2;
    } else {
      this.labTestByValue.isAgeInDayMonthYearForMale = 3;
    }
  }

  setFemaleAge(value) {
    if (value === 'D') {
      this.labTestByValue.isAgeInDayMonthYearForFemale = 1;
    } else if (value === 'M') {
      this.labTestByValue.isAgeInDayMonthYearForFemale = 2;
    } else {
      this.labTestByValue.isAgeInDayMonthYearForFemale = 3;
    }
  }

  selectedDepartment(lab) {
    console.log(lab);
    this.filteredServices = this.departmentServices.filter(function (service) {
      console.log(service);
      if (service.labDepartmentId.toString() === lab) {
        console.log('service');
        return service;
      } else {
        return null;
      }
    })
    console.log(this.filteredServices);
  }
  save() {

    for (let j = 0; j < this.dependency.length; j++) {
      this.selectedDependency.push(this.dependency[j].name);
    }
    this.test.dependencyTests = this.selectedDependency.toString();

    for (let i = 0; i < this.tamplateValue.length; i++) {
      if (this.tamplateValue[i].id === undefined) {
        this.saveTextEditor(i, this.tamplateValue[i]);
      }

    }
    this.apiService.labService.createLabTestTemplate(this.LabTestTemplate)
      .subscribe(
        (res: any) => {
          this.test.labTestTemplateId = res.data.id;
          this.apiService.labService.createTestBuilder(this.test)
            .subscribe(
              (resp: any) => {
                this.notification.create('success', 'Saved', 'Lab has been build successfully');
                this.LabTestTemplate.labTestByEditordto = [];
                this.LabTestTemplate.labTestByValuedto = [];
                this.tamplateValue = [];
                this.test = {
                  name: '',
                  code: '',
                  dependencyTests: '',
                  remarks: '',
                  price: 0,
                  sampleType: '',
                  sampleInstructions: '',
                  isSampleNeeded: false,
                  isResultEntry: false,
                  isConductionRequired: false,
                  isConductByDoctor: false,
                  conductingInstructions: '',
                  conductionFormat: '',
                  testInformation: '',
                  status: 0,
                  createdOn: '',
                  labDepartmentServicesId: 0,
                  labTestTemplateId: 0,
                  id: 0
                }
                this.apiService.labService.getLabTestBuilder()
                  .subscribe(
                    (response: any) => {
                      console.log('Lab Test Builder', res);
                      this.dependencyList = response.data;
                      this.dependency = [];
                    }
                  )
              },
              (err: any) => {
                this.notification.create('error', 'Error', 'Something Went Wrong while creating Lab Test');
              }
            )
        },
        (error: any) => {
          this.notification.create('error', 'Error', 'Something Went Wrong while setting template values');
        }
      )
  }
  showModal(value) {
    if (value === 'value') {
      this.isValue = true;
    } else if (value === 'template') {
      this.isTemplate = true;
    }
  }
  checkbox(value) {
    console.log(value);
  }

  handleOk() {
    // tslint:disable-next-line:no-debugger

    this.isConfirmLoading = true;
    console.log(this.labTestByValue);
    if (this.labTestByValue.id >= 0) {
      this.LabTestTemplate.labTestByValuedto[this.index] = this.labTestByValue;
      this.tamplateValue[this.index] = this.labTestByValue;
    } else {

      this.LabTestTemplate.labTestByValuedto.push(this.labTestByValue);
      this.tamplateValue.push(this.labTestByValue);

    }
    console.log(this.tamplateValue)
    this.labTestByValue = {
      resultLabel: '',
      priority: 0,
      isApplicableForAll: false,
      gender: '',
      isAgeInDayMonthYearForMale: 0,
      isAgeInDayMonthYearForFemale: 0,
      maleAgeMin: 0,
      maleAgeMax: 99,
      maleNormalRangeMin: '',
      maleNormalRangeMax: '',
      maleAbnormalRangeMin: '',
      maleAbnormalRangeMax: '',
      maleCriticalRangeMin: '',
      maleCriticalRangeMax: '',
      femaleAgeMin: 0,
      femaleAgeMax: 99,
      femaleNormalRangeMin: '',
      femaleNormalRangeMax: '',
      femaleAbnormalRangeMin: '',
      femaleAbnormalRangeMax: '',
      femaleCriticalRangeMin: '',
      femaleCriticalRangeMax: '',
      createdOn: '',
      labTestByTemplateId: 0,
      labTestingUnitId: 0,
      id: -1
    }
    this.ageInDaysForMale = false;
    this.ageInDaysForFemale = false
    setTimeout(() => {
      // this.isValue = false;
      this.isConfirmLoading = false;
    }, 3000);
  }
  deleteByValueRow(value) {
    console.log(value)
    let index = this.LabTestTemplate.labTestByValuedto.indexOf(value);
    let valIndex = this.tamplateValue.indexOf(value);
    console.log(index);
    this.LabTestTemplate.labTestByValuedto.splice(index, 1);
    this.tamplateValue.splice(valIndex, 1);
  }
  editByValue(i, values) {
    this.index = i;
    console.log(i);
    console.log('Values ==> ', values);
    this.labTestByValue = values;
    this.labTestByValue.id = i;
  }
  setGender(value) {
    if (value === 'Y') {
      this.labTestByValue.gender = 'male';
    } else {
      this.labTestByValue.gender = 'female';
    }
  }
  handleCancel(value) {
    console.log(value);
    if (value === 'value') {
      this.isValue = false;
    } else if (value === 'template') {
      this.isTemplate = false;
    }
  }
  setUnit(value) {
    let units = this.labTestUnit.find(x => x.id == value);
    this.unit = units.code;
    console.log(units);
  }
  saveTextEditor(index, value) {
    this.textEditor = {
      editorText: value,
      priority: 0,
      labTestByTemplateId: 0,
      id: 0
    }
    this.LabTestTemplate.labTestByEditordto.splice(index, 1);
    this.LabTestTemplate.labTestByEditordto.push(this.textEditor);
    console.log(this.LabTestTemplate);
  }
}

import { Component, OnInit, ViewChild } from '@angular/core';
import { ApiService } from 'app/Services/common/apiService';
import { SearchFieldComponent } from 'app/CommonComponents/search-field/search-field.component';
import * as moment from 'moment';
import { NzNotificationService } from 'ng-zorro-antd';
declare var $;
@Component({
  selector: 'app-bed-management',
  templateUrl: './bed-management.component.html',
  styleUrls: ['./bed-management.component.css']
})
export class BedManagementComponent implements OnInit {
  ShowRoomOnPageLoad = false;
  radioValue = 'byWard';
  wardCategory: any;
  AllRooms: any;
  AllBeds: any;
  addActive = '';
  addActive1 = '';
  AllWardRooms = [];
  AllRoomsBeds = [];
  SelectedRooms = [];
  AvailableBedImage = 'assets/img/bedIcon1.png';
  ReservedBedImage = 'assets/img/bedIcon2.png';
  BedAllocation =
    {
      patientId: 0,
      wardCategoryId: null,
      roomId: null,
      bedId: 0,
      allocationDateTime: '',
      dischargeDateTime: '',
      transferDateTime: '',
      referenceNumber: '',
      reason: '',
      status: 0,
      id: 0
    }
  isVisible = false;
  isConfirmLoading = false;
  PatientDetails: any;
  AllPatientToFind = [];
  visible = false;
  BedDetails = {
    BedNo: '',
    BedID: '',
    RoomNo: '',
    RoomName: '',
    RoomId: '',
    WardName: '',
    WardID: '',
    status: ''
  };
  BuildingFloor: any;
  floorID = null;
  AllBedAllocation: any;
  BedPatientDetails = {
    patientName: '',
    MrNo: '',
    allocationDate: '',
    patientId: '',
    genderAndAge: ''
  }
  selected = false;
  SelectedBedOverlayID = 0;
  @ViewChild(SearchFieldComponent)
  searchField: SearchFieldComponent;
  collapse = false;
  constructor(private apiService: ApiService, private notification: NzNotificationService) { }

  ngOnInit() {
    this.getAllPatient();
    this.getAllWardCategory();
    this.getAllRooms();
    this.getAllBeds();
    this.getAllFloor();
    this.getAllBedAllocation();
    this.apiService.patientService.$addPatientObservable.subscribe(res => {
      console.log(res);
      this.getPatientByID(res);
      this.handleCancel();
    });
  }

  checkPatientIsAdmitted(patientId, bedId) {
    let count = [];
    // tslint:disable-next-line:triple-equals
    count = this.AllBedAllocation.filter(x => x.bedId == bedId && x.status == 1);
    if (count.length > 0) {
      return false;
    } else {
      return true;
    }
  }

  clickMe(BedData, RoomData): void {
    this.BedDetails.BedID = BedData.id;
    this.BedDetails.BedNo = BedData.bedNo;
    this.BedDetails.RoomId = RoomData.id;
    this.BedDetails.RoomName = RoomData.name;
    this.BedDetails.RoomNo = RoomData.number;
    this.BedDetails.WardID = RoomData.wardCategoryId;
    // tslint:disable-next-line:triple-equals
    this.BedDetails.status = BedData.status == 1 ? 'Available' : 'Ocupied';
    this.BedDetails.WardName = this.wardCategory.filter(x => x.id === RoomData.wardCategoryId)[0].name;
    this.appoint(this.BedDetails.BedID, null);
  }
  getAllFloor() {
    this.apiService.BuildingInfo.GetallFloor().subscribe((res: any) => {
      this.BuildingFloor = res.data.filter(x => x.status === 1);
    })
  }
  change(value: boolean): void {
    console.log(value);
  }
  getAllPatient() {
    this.apiService.patientService.getAllPatient().subscribe((res: any) => {
      this.AllPatientToFind = res.data;
    })

  }
  getPatientByID(id) {
    this.apiService.patientService.getPatientById(id).subscribe((res: any) => {

      this.collapse = false;
      this.PatientDetails = res.data;
      this.PatientWithBedDetails(this.PatientDetails.id);
      // tslint:disable-next-line:triple-equals
      // tslint:disable-next-line:triple-equals
    })
  }
  PatientWithBedDetails(id) {
    let p = [];
    // tslint:disable-next-line:triple-equals
    p = this.AllBedAllocation.filter(x => x.patientId == id);
    if (p.length > 0) {

      this.BedAllocation.id = p[p.length - 1].id;
      this.BedAllocation.wardCategoryId = p[p.length - 1].wardCategoryId;

      this.BedAllocation.roomId = p[p.length - 1].roomId;
      this.getAllRoomsRelatedToWard(this.BedAllocation.wardCategoryId);
      this.getAllBedRelatedToWardAndRoom(this.BedAllocation.wardCategoryId, this.BedAllocation.roomId);
      this.collapse = true;
      // tslint:disable-next-line:triple-equals
      let BedData = this.AllBeds.find(x => x.id == p[p.length - 1].bedId);
      // tslint:disable-next-line:triple-equals
      let RoomData = this.AllRooms.find(x => x.id == p[p.length - 1].roomId)
      this.clickMe(BedData, RoomData);
    } else {
      this.BedAllocation.id = 0;
      this.BedDetails.BedID = '';
      this.BedDetails.BedNo = '';
      this.BedDetails.RoomId = '';
      this.BedDetails.RoomName = '';
      this.BedDetails.RoomNo = '';
      this.BedDetails.WardID = '';
      // tslint:disable-next-line:triple-equals
      this.BedDetails.status = '';
      this.BedDetails.WardName = '';
    }

  }

  showModal(patient) {
    console.log(patient);
    this.isVisible = true;
    this.selected = false;
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
    this.searchField.searchItem = [];
    this.searchField.value = '';
  }

  getImgSrc(status) {
    let checkPatient = [];

    // tslint:disable-next-line:triple-equals
    // checkPatient = this.AllBedAllocation.filter(x => x.bedId == bedID);
    // tslint:disable-next-line:triple-equals
    if (status == 2) {
      return this.ReservedBedImage;
    } else {
      return this.AvailableBedImage;
    }
  }
  getAllWardCategory() {
    this.apiService.wardAndBedService.GetAllWardCategory().subscribe((res: any) => {
      this.wardCategory = res.data.filter(x => x.status === 1);
    })
  }
  getAllRooms() {
    this.apiService.wardAndBedService.GetAllRooms().subscribe((res: any) => {
      this.AllRooms = res.data.filter(x => x.status === 1);
    })
  }
  getAllBeds() {
    this.apiService.wardAndBedService.GetAllBed().subscribe((res: any) => {
      // tslint:disable-next-line:triple-equals
      this.AllBeds = res.data.filter(x => x.status != 0 && x.isFunctional == true);
    })
  }
  addActiveMenu(element: any) {
    if (element === this.addActive) {
      this.addActive = '0';
    } else {
      this.addActive = element;
    }
  }
  addActiveMenu1(element: any) {
    if (element === this.addActive) {
      this.addActive1 = '0';
    } else {
      this.addActive1 = element;
    }
  }
  getAllRoomsRelatedToWard(id) {
    this.collapse = false;
    // this.AllWardRooms = [];
    // this.AllRoomsBeds = [];
    // tslint:disable-next-line:triple-equals
    this.AllWardRooms = this.AllRooms.filter(x => x.wardCategoryId == id);
    // tslint:disable-next-line:triple-equals
    this.SelectedRooms = this.AllRooms.filter(x => x.wardCategoryId == id);
    // if (this.AllWardRooms.length <= 0) {
    //   this.AllRoomsBeds = [];
    // }
  }
  getAllBedRelatedToFloor(id) {
    this.collapse = false;
    this.ShowRoomOnPageLoad = true;
    // tslint:disable-next-line:triple-equals
    this.SelectedRooms = this.AllRooms.filter(x => x.floorId == id);
  }
  getAllBedRelatedToWardAndRoom(wardID, RoomID) {
    this.collapse = false;
    // this.AllWardRooms = [];
    // this.AllRoomsBeds = [];
    this.ShowRoomOnPageLoad = true;
    // tslint:disable-next-line:triple-equals
    this.SelectedRooms = this.AllRooms.filter(x => x.wardCategoryId == wardID && x.id == RoomID);
    // if (this.AllWardRooms.length <= 0) {
    //   this.AllRoomsBeds = [];
    // }
  }
  getAllRoomsBed(id) {

    // tslint:disable-next-line:triple-equals
    this.AllRoomsBeds = this.AllBeds.filter(x => x.roomId == id);
  }

  SaveBedAllocation(PatientDetails, Room, Bed) {

    if (this.BedAllocation.id > 0) {
      this.TransferPatient(PatientDetails, Room, Bed);
    } else {
      this.AdmitPatient(PatientDetails, Room, Bed);
    }
  }

  AttachValueToModelForRequest(patient: any, Room: any, bed: any) {

    this.BedAllocation.patientId = patient.id;
    this.BedAllocation.roomId = Room.id;
    this.BedAllocation.bedId = bed.id;
    this.BedAllocation.wardCategoryId = Room.wardCategoryId;
    this.BedAllocation.status = 1;
    this.BedAllocation.allocationDateTime = new Date().toISOString();
    this.BedAllocation.dischargeDateTime = null;
    this.BedAllocation.transferDateTime = null;
  }

  TransferPatient(patient: any, Room: any, bed: any) {

    this.AttachValueToModelForRequest(patient, Room, bed);
    this.TransferBedAllocation(this.BedAllocation);

  }

  AdmitPatient(patient: any, Room: any, bed: any) {

    this.AttachValueToModelForRequest(patient, Room, bed);
    this.AdmitBedAllocation(this.BedAllocation);

  }
  AdmitBedAllocation(BedAllocation) {
    this.apiService.bedManagement.CreateBedAllocation(BedAllocation).subscribe((res: any) => {

      this.notification.create('success', 'Saved', 'Patient Admitted Successfully');
      this.getAllRooms();
      this.getAllBeds();
      this.getAllBedAllocation();

    })
  }
  TransferBedAllocation(BedAllocation) {
    this.apiService.bedManagement.TransferBed(BedAllocation).subscribe((res: any) => {
      this.notification.create('success', 'Saved', 'Patient Transferred Successfully');
      this.getAllRooms();
      this.getAllBeds();
      this.getAllBedAllocation();
    })
  }
  DischargePatient(patient: any, Room: any, bed: any) {
    // tslint:disable-next-line:triple-equals
    let Discharge = this.AllBedAllocation.filter(x => x.patientId == patient.id);
    this.BedAllocation.id = Discharge.id;
    this.BedAllocation.patientId = patient.id;
    this.BedAllocation.roomId = Room.id;
    this.BedAllocation.bedId = bed.id;
    this.BedAllocation.wardCategoryId = Room.wardCategoryId;
    this.BedAllocation.status = 2;
    this.BedAllocation.dischargeDateTime = new Date().toISOString();
    this.BedAllocation.allocationDateTime = Discharge.allocationDateTime;
    this.BedAllocation.transferDateTime = Discharge.transferDateTime;
    this.UpdateBedAllocation(this.BedAllocation);

  }
  UpdateBedAllocation(BedAllocation) {
    this.apiService.bedManagement.updateBedAllocation(BedAllocation).subscribe((res: any) => {
      this.getAllBedAllocation();
    })
  }

  getAllBedAllocation() {
    this.apiService.bedManagement.GetallBedAllocation().subscribe((res: any) => {
      this.AllBedAllocation = res.data;
      this.getPatientByID(this.BedAllocation.patientId);
      if (this.ShowRoomOnPageLoad) {
        this.SelectedRooms = [];
        this.SelectedRooms = this.AllRooms;
      }
    })
  }
  appoint(id, patientId?: number) {

    if (patientId != null) {
      this.getPatientByID(patientId);
    }
    // tslint:disable-next-line:triple-equals
    if (this.selected === true && this.SelectedBedOverlayID === id) {
      this.selected = true;
    } else if (this.selected === false) {
      this.selected = true;
    }
    this.SelectedBedOverlayID = id;
  }

  getBedDetailsById(id) {
    let count = [];
    // tslint:disable-next-line:triple-equals
    count = this.AllBedAllocation.filter(x => x.bedId == id && x.status == 1);
    if (count.length > 0) {

      // tslint:disable-next-line:triple-equals
      let patient: any = this.AllPatientToFind.find(x => x.id == count[count.length - 1].patientId);
      this.BedPatientDetails.patientName = patient.firstName + ' ' + patient.lastName;
      this.BedPatientDetails.patientId = patient.id;
      this.BedPatientDetails.MrNo = patient.displayId;
      this.BedPatientDetails.genderAndAge = patient.gender + ' / ' + this.calculatePatientAge(patient.dob)
      // console.log( this.BedPatientDetails.genderAndAge);
      // this.BedPatientDetails.CrNo =
      // tslint:disable-next-line:max-line-length
      this.BedPatientDetails.allocationDate = count[0].allocationDateTime.split('T')[0] + ' - ' + new Date(count[0].allocationDateTime).toLocaleTimeString();
    } else {
      this.BedPatientDetails.patientName = '';
      this.BedPatientDetails.MrNo = '';
      this.BedPatientDetails.allocationDate = '';
      this.BedPatientDetails.patientId = '';
    }
  }
  calculatePatientAge(birthday) {
    let formattedDOB = moment(birthday).format('YYYY/MM/DD');
    let cardDOB = moment(birthday).format('DD/MMM/YYYY');

    let end = moment(formattedDOB);

    let currentDate = moment(new Date().toISOString()); // new date
    let dob = moment(end); // DOB

    let years = currentDate.diff(dob, 'year');
    dob.add(years, 'years');

    let months = currentDate.diff(dob, 'months');
    dob.add(months, 'months');

    let days = currentDate.diff(dob, 'days');
    if (dob < currentDate) {
      return years + 'Y ' + months + 'M ' + days + 'D'

    } else {
      return '';
      // this.finalAge = 'Date Cannot be higher than the current date';
      // this.patient.age = this.finalAge;

    }


  }
}

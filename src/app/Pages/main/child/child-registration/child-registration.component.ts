import { Component, OnInit, ViewChild } from '@angular/core';
import { ApiService } from '../../../../Services/common/apiService';
import { NgForm } from '@angular/forms';
import { isNullOrUndefined } from 'util';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-child-registration',
  templateUrl: './child-registration.component.html',
  styleUrls: ['./child-registration.component.css']
})
export class ChildRegistrationComponent implements OnInit {


  IsPrint: any;
  Birth =
    {
      MotherName: '',
      //  ChildName: '',
      MotherCnic: '',
      FatherName: '',
      FatherCnic: '',
      Address: '',
      Contact: '',
      displayId: '',
      bookSrNumber: '',
      patientId: 0,
      childName: '',
      childGender: null,
      typeOfDelivery: null,
      disability: '',
      weight: '',
      birthTime: '',
      birthDate: '',
      caseConductedBy: '',
      doctorId: null,
      isCertificatePrinted: true,
      status: 0,
      time: '',
      id: 0
    }
  patient: any;
  AllPatientToFind: any = [];
  GynoDoctor: any;
  inputData: any;
  @ViewChild('fm') myForm: NgForm;
  isVisible = false;

  isConfirmLoading = false;

  constructor(private apiService: ApiService, private route: ActivatedRoute) { }

  ngOnInit() {

    // Start
    // Remember this id is temporary In Future id will get from the query string
    let a = this.route.snapshot.params.id;
    if (!isNullOrUndefined(a)) {
      this.AssignValueToControl(a);
    }
    this.getPatientByID(38);
    // End
    this.apiService.patientService.$addPatientObservable.subscribe(res => {
      console.log(res);
      this.getPatientByID(res);
      this.handleCancel();
    })
    this.getAllDoctor();
    this.getAllPatient();
  }
  AssignValueToControl(id) {
    this.apiService.birthAndDeath.GetBirthByID(id).subscribe((res: any) => {
      debugger;
      this.Birth.displayId = res.data.displayId;
      this.Birth.bookSrNumber  = res.data.bookSrNumber;
      this.Birth.patientId = res.data.patientId;
      this.getPatientByID(this.Birth.patientId);
      this.Birth.childName = res.data.childName;
      this.Birth.childGender = res.data.childGender;
      this.Birth.typeOfDelivery = res.data.typeOfDelivery;
      this.Birth.disability = res.data.disability;
      this.Birth.weight = res.data.weight;
      this.Birth.time = new Date( res.data.birthTime).toISOString().split('T')[1];
      this.Birth.birthDate = res.data.birthTime.split('T')[0];
      this.Birth.caseConductedBy = res.data.caseConductedBy;
      this.Birth.doctorId = res.data.doctorId;
      this.Birth.isCertificatePrinted = res.data.isCertificatePrinted;
      this.Birth.status = res.data.status
      this.Birth.id = res.data.id;
    })
  }
  getAllPatient() {
    this.apiService.patientService.getAllPatient().subscribe((res: any) => {
      debugger;
      this.AllPatientToFind = res.data;
    })
  }
  getAllDoctor() {
    this.apiService.OPDService.getDoctorOPD().subscribe((res: any) => {
      debugger;
      this.GynoDoctor = res.data.filter(x => x.opdName === 'Gynacologist');
    })
  }

  getPatientByID(id) {
    this.apiService.patientService.getPatientById(id).subscribe((res: any) => {
      this.AssignPatientvaluetoControl(res.data);
    })
  }
  AssignPatientvaluetoControl(data) {
    this.patient = data;
    this.Birth.MotherName = this.patient.firstName + ' ' + this.patient.lastName;
    this.Birth.FatherName = this.patient.familyHeadName;
    this.Birth.MotherCnic = this.patient.cnic;
    this.Birth.displayId = this.patient.displayId;
    this.Birth.Contact = this.patient.cellNumber;
    this.Birth.Address = this.patient.address;
    this.Birth.patientId = this.patient.id;
  }
  GetChildName() {
    if (this.Birth.childGender === 'Male') {
      this.Birth.childName = 'Son Of';
    } else {
      this.Birth.childName = 'Daughter Of';
    }
    this.Birth.childName = this.Birth.childName + ' ' + this.Birth.MotherName;
  }

  Save() {
    if (this.myForm.invalid) {
      return null;
    }


    let a = new Date(this.Birth.birthDate).toISOString().split('T')[0] + 'T' + this.Birth.time;
    this.Birth.birthTime = a;
    debugger;
    if (this.Birth.id > 0) {
      this.apiService.birthAndDeath.UpdateBirth(this.Birth).subscribe((res: any) => {
        this.inputData = this.Birth;
        this.IsPrint = true;
      })
    } else {
      this.apiService.birthAndDeath.SaveBirth(this.Birth).subscribe((res: any) => {
        this.inputData = this.Birth;
        this.IsPrint = true;
      })
    }
    
  }
  showModal(patient) {
    console.log(patient);
    this.isVisible = true;
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
}

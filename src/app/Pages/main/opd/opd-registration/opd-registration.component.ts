import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { ConsultancyService } from '../../../../Services/endpoints/ConsultancyService';
import { ApiService } from '../../../../Services/common/apiService';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import * as moment from 'moment';
import { NzNotificationService } from 'ng-zorro-antd';
// import { Patient } from '../../Modals/patient.model';
// import { Appoint } from '../../Modals/appoint';

@Component({
  selector: 'app-opd-registration',
  templateUrl: './opd-registration.component.html',
  styleUrls: ['./opd-registration.component.css']
})
export class OpdRegistrationComponent implements OnInit {
  ShowERInput = false;
  selectedPeople1 = [];
  selectedPatient = [];
  patientForm: FormGroup;
  SelectedIndexOfAnArray: any = [];
  isDisabled = false;
  consultancy_id;
  doctors: Array<any> = new Array<any>();
  shifts: Array<any> = new Array<any>();
  days: any;
  timeSlot = [];
  fullName: any;
  appointmentId: any;
  isShift = false;
  isDoctor = false;
  searchItem = [];
  patientData = [];
  isFindPatientVisible = false;
  isRegisterPatientVisible = false;
  isConfirmLoading = false;
  hide = false;
  showDoctorForm = false;
  contactNumber: any;
  patientName: any;
  appointmentNumber: any;
  PatientDisplayId: any;
  PatientFullName: any;
  PatientContactNumber: any;
  singleAppointmentObject: any;
  singlePatientObject: any;
  PatientID: any;
  PatientDOB: any;
  selectedDoctorName: any;
  selectedDoctorId: any;
  selected = false;
  genderType: any;
  isCalendarVisible = false;
  patientSearch = [];
  patient = {
    firstName: '',
    lastName: '',
    familyHeadName: '',
    cellNumber: '',
    landLineNumber: '',
    emergencyNumber: '',
    address: '',
    cnic: '',
    city: '',
    dob: '',
    age: '',
    gender: 'Male',
    religion: 'Muslim',
    maritalStatus: 'UnMarried',
    displayId: '',
    id: '',
    Status: true,
    createdOn: '',
    cardExpiry: ''
  };
  Days = [
    { value: 1, text: 'Monday' },
    { value: 2, text: 'Tuesday' },
    { value: 3, text: 'Wednesday' },
    { value: 4, text: 'Thursday' },
    { value: 5, text: 'Friday' },
    { value: 6, text: 'Saturday' },
    { value: 7, text: 'Sunday' },
  ];
  people = [
    { name: 'monday' },
    { name: 'tuesday' },
    { name: 'wednesday' },
    { name: 'thursday' },
    { name: 'friday' },
    { name: 'saturday' },
    { name: 'sunday' }

  ];
  // radioValue = 'Male';
  SelectedOPD = [];
  filteredOPD: any;
  allDoctorsLength: any;
  filteredDoctorsFromOpd: any;
  allOpdDoctors: any;
  opdTypes: any;
  filteredDoctors: any;
  formattedDOB: any;
  cardDOB: string;
  currentDate: moment.Moment;
  finalAge: string;
  opdName: any;
  error: boolean;
  selectedDoctor: any;
  selectedAppointedDoctorId: any;
  selectedDoctorCategory: any;
  selectedDoctorFee: any;
  doctorId: string;
  startMinutes: any;
  endMinutes: any;
  totalDuration: any;
  noOfTimeSlots: any;
  selectDoctorId: any;
  selectDoctorId1: any;
  selectedIndex: any;
  doctorDays: any;
  constructor(private consultancy: ConsultancyService, private apiService: ApiService,
    private changeDetectorRef: ChangeDetectorRef, private route: ActivatedRoute, private fb: FormBuilder,
    private notification: NzNotificationService, private router: Router) {
    this.patientForm = this.fb.group({
      FirstName: [undefined, [Validators.pattern(/[a-zA-Z]*/)]],
      LastName: [undefined, [Validators.pattern(/[a-zA-Z]*/)]],
      Guardian: [undefined, [Validators.pattern(/[a-zA-Z]*/)]],
      CellNumber: [undefined, [Validators.pattern(/\d{11}/)]],
      Emergency: [undefined, [Validators.pattern(/\d{11}/)]],
      LandLine: [undefined, [Validators.pattern(/\d{11}/)]],
      Address: [undefined, [Validators.required]],
      CNIC: [undefined, [Validators.pattern(/\d{14}/)]],
      DOB: [undefined, [Validators.required]],
      City: [undefined, [Validators.pattern(/[a-zA-Z]*/)]],
      Age: [undefined],
      MaritalStatus: [undefined],
      Gender: {
        Male: [undefined],
        Female: [undefined],
      },
      Religion: [undefined]
    });
  }

  ngOnInit() {
    // this.radioValue = 'Male';
    this.appointmentId = this.route.snapshot.queryParamMap.get('id');
    this.doctorId = this.route.snapshot.queryParamMap.get('docid');
    if (this.route.snapshot.queryParamMap.get('si')) {
      this.showDoctorForm = true;
    }
    this.apiService.patientService.$addPatientObservable.subscribe(res => {
      console.log(res);
      this.apiService.patientService.getPatientById(res).subscribe((resp: any) => {
        console.log(resp);
        this.singlePatientObject = resp.data;
        this.handleCancel('find');
        this.PatientFullName = resp.data.firstName + ' ' + resp.data.lastName;
        this.PatientDisplayId = resp.data.displayId;
        this.PatientDOB = resp.data.dob;
        this.PatientContactNumber = resp.data.cellNumber
        this.PatientID = resp.data.id;
      })
    })
    // this.genderType = this.patient.gender;
    console.log(this.appointmentId);
    this.apiService.appointment.getSingleAppointment(this.appointmentId).subscribe((res: any) => {
      console.log(res);
      this.selectedDoctorName = res.data.doctorName;
      this.selectedDoctorId = res.data.doctorId;
      this.singleAppointmentObject = res.data;
      this.appointmentNumber = res.data.displayId;
      this.PatientFullName = res.data.patientName;
      this.PatientContactNumber = res.data.contactNumber;
    })
    this.apiService.doctorService.getSingleDoctorOPD(this.doctorId).subscribe(res => {
      console.log(res, 'DOCTOR OPD SINGLE');
    })
    this.apiService.patientService.getAllPatient().subscribe((res: any) => {
      this.patientData = res.data;
      // console.log(this.patientData);
      for (let i = 0; i <= this.patientData.length - 1; i++) {
        this.patientSearch.push(this.patientData[i]);
      }
    })
    this.apiService.doctorService.getAllDoctorOPD().subscribe((res: any) => {
      console.log(res);
      this.allOpdDoctors = res.data;
      this.filteredDoctorsFromOpd = this.allOpdDoctors;
      this.allDoctorsLength = res.data.length;
    })
    console.log(this.filteredDoctors);
    this.apiService.patientService.getAllPatient().subscribe((res: any) => {
      this.patientData = res.data;
      console.log(this.patientData);
      for (let i = 0; i <= this.patientData.length - 1; i++) {
        this.patientSearch.push(this.patientData[i]);
      }
    })
    this.apiService.OPDService.GetAllOPD().subscribe((res: any) => {
      console.log(res, 'ALLOPD');
      this.opdTypes = res.data;
    })
  }

  print() {

    setTimeout(() => {
    //  this.abc.nativeElement.style.display = 'block';
      let b = document.body.innerHTML;
      let a = document.getElementById('printClass').innerHTML;
      document.body.innerHTML = a;
      window.print();
     // this.DataSource = undefined;
      location.reload();
    }, 1000);
  }
  setGender(value) {
    this.patient.gender = value;
  }
  setMaritalStatus(value) {
    this.patient.maritalStatus = value;
  }
  // genderSet(gender) {
  //   console.log(gender);
  //   this.genderType = gender;
  // }
  SelectedRecord(index) {
    this.SelectedIndexOfAnArray = this.selectedPatient[index];

    this.isDisabled = true;
  }
  SelectOPD(opdName) {
    console.log(opdName);
    this.filterByOPD(opdName);
  }
  changeAppointedDoctor() {
    this.showDoctorForm = false;
  }
  searchOPD(opd) {
    this.filterByOPD(opd);
  }
  filterByOPD(opd) {
    console.log(opd);
    // console.log(day);
    this.filteredOPD = this.allOpdDoctors.filter(function (filteredOpd) {
      // console.log(filteredOpd);
      // let daysArray = filteredOpd.days.split(',');
      // console.log(daysArray, 'DAYS!!!');
      // if (day) {
      //   console.log('First IF');
      //   console.log(day);
      //   for (let i = 0; i <= daysArray.length; i++) {
      //     console.log(daysArray[i]);
      //     if (daysArray[i] === day.toLowerCase()) {
      //       console.log('DAY, SECOND IF');
      //       return filteredOpd.opdName === opd;
      //     } else {
      //       console.log('NULL');
      //       // return null;
      //     }
      //   }
      // } else {
        return filteredOpd.opdName === opd;
    })
    // console.log(this.filteredOPD);
    this.allDoctorsLength = this.filteredOPD.length;
    this.filteredDoctorsFromOpd = this.filteredOPD;
    console.log(this.allOpdDoctors);

  }
    makeNewOpd() {
    this.router.navigate(['main/opd/opd-registration'], { queryParams: {} });
    this.showDoctorForm = false;
    location.reload();
  }
  generateTimeslots(timeInterval, startTime, endTime) {
    // const timeRange = [15, 30, 60];
    // if (!timeRange.includes(timeInterval)) {
    //   throw ('Can only accept 15, 30, 60');
    // }

    let slotArray = [startTime];
    startTime = moment(startTime, 'HH:mm');
    endTime = moment(endTime, 'HH:mm');

    let newTime = startTime;
    while (startTime.isBefore(endTime)) {
      newTime = newTime.add(timeInterval, 'minutes');
      slotArray.push(newTime.format('HH:mm'));
    }

    for (let i = 0; i < this.noOfTimeSlots; i++) {
      let range = slotArray[i] + '-' + slotArray[i + 1];
      debugger;
      this.timeSlot.push(range);
    }
    console.log(this.timeSlot);
  }
  appoint(index, doctor) {
    this.timeSlot = [];
    // this.doctorDays = doctor.days.split(',');
    // this.apiService.opdRegistrationService.sendDoctorDays(this.doctorDays);
    this.noOfTimeSlots = '';
    console.log(index);
    console.log(doctor);
    this.selectedDoctorCategory = doctor.doctorCategoryName;
    this.selectedDoctorName = doctor.doctorUser.fullName;
    this.selectedDoctorFee = doctor.fee
    // this.generateTimeslots(doctor.durationInMinutes, doctor.startTime, doctor.endTime)
    this.selectedIndex = index;
    // console.log(index);
    if (this.selected === true) {
      this.selected = false;
    } else if (this.selected === false) {
      this.selected = true;
    }
    this.noOfTimeSlots = doctor.noOfTimeSlots;
    this.generateTimeslots(doctor.durationInMinutes, doctor.startTime, doctor.endTime)
    console.log(doctor.durationInMinutes);
    console.log(doctor.startTime);
    console.log(doctor.endTime);
    console.log();
    this.selectedDoctor = index;
    let appointment = {
      patientName: this.PatientFullName,
      contactNumber: this.contactNumber || '0900798999',
      doctorId: doctor.doctorId,
      doctorName: doctor.doctorUser.fullName,
      appointmentTime: '04:30',
      status: 0,
      id: -1
    }
    console.log(appointment);
    if (appointment.patientName !== '' && appointment.patientName !== undefined && appointment.patientName !== null) {
      this.apiService.appointment.createAppointment(appointment).subscribe((res: any) => {
        // debugger;
        this.showDoctorForm = true;
        console.log(res);
        this.selectedAppointedDoctorId = res.data.id;
        this.apiService.doctorService.getSingleDoctor(this.selectedAppointedDoctorId).subscribe((response: any) => {
          console.log(response);
          this.selectedDoctorName = response.data.applicationUserDoctorName;
          this.selectedDoctorCategory = response.data.doctorCategoryName;
          this.selectDoctorId1 = response.data.doctorId;
          console.log('kya aya' + this.selectDoctorId1);
        })
        this.notification.create('success', 'Appointment registered!', 'Appointment Registered Succesfully');
      })
    } else {
      this.notification.create('error', 'No Patient', 'Please Select patient');
    }
  }
  printSlip() {
    let a = document.getElementById('printClass').innerHTML;
    document.body.innerHTML = a;
    window.print();
    location.reload();
  }
  onInput(value) {
    let self = this;
    this.searchItem = this.patientData.filter(function (patient) {
      console.log(value);
      if (patient.firstName.toLowerCase().includes(value.toLowerCase())) {
        return patient
      } else if (patient.displayId.toLowerCase().includes(value.toLowerCase())) {
        return patient;
      } else if (patient.cellNumber.includes(value)) {
        return patient;
      } else if ((patient.firstName.toLowerCase() + ' ' + patient.lastName.toLowerCase()).includes(value)) {
        return patient;
      } else if (value === '' || value === undefined) {
        self.hide = true;
        console.log(self.hide);
        return self.hide;
      }
    });
  }

  selectSlot(i, slot) {
    console.log(i);
    console.log(slot);
    // if (slot !== '' && this.selectedAppointment.patientName !== '') {
    //   this.viewSaveButton = true;
    // }
    // let slotting = slot.split('-');
    // this.slotObject = {
    //   doctorOPDId: this.selectedOpdDoctor.id,
    //   appointmentDate: moment(this.selectedAppointmentDate).format(),
    //   slotNumber: i,
    //   startTime: slotting[0],
    //   endTime: slotting[1],
    //   appointmentId: 0,
    //   patientId: this.patientId,
    //   status: 1,
    //   id: 0
    // }
    // this.selectedAppointment.doctorOPDId = this.selectedOpdDoctor.id,
    //   this.selectedAppointment.appointmentDate = moment(this.selectedAppointmentDate).format(),
    //   this.selectedAppointment.doctorOPDTimeSlotDto.push(this.slotObject)
    // this.selectedSlot = i;
    // console.log(this.selectedAppointment, 'CREATE');
  }

  registerForOPD() {
    this.print();
    console.log(this.PatientDisplayId);
    if (this.PatientDisplayId === undefined || this.PatientDisplayId === '') {
      this.notification.create('error', 'MR not found', 'MR# not found, Find the Patient or Register!');
    }
    let registerPatientForOpd = {
      displayId: this.PatientDisplayId,
      patientId: this.PatientID,
      patientDto: this.singlePatientObject,
      appointmentId: this.appointmentId,
      appointmentDto: this.singleAppointmentObject,
      doctorId: this.selectedDoctorId,
      doctorName: this.selectedDoctorName || 'Dr Zaheer',
      status: 0,
      id: 0
    }
    console.log(registerPatientForOpd);
    this.apiService.opdRegistrationService.RegisterForOPD(registerPatientForOpd).subscribe(res => {
      console.log(res);
    })
  }

  // showModal(value) {
  //   // console.log(patient);
  //   if (value === 'isVisible') {
  //     this.isVisible = true;
  //   } else if (value === 'isCalendarVisible') {
  //     this.isCalendarVisible = true;
  //   }
  // }

  // handleOk() {
  //   this.isConfirmLoading = true;
  //   setTimeout(() => {
  //     this.isVisible = false;
  //     this.isCalendarVisible = false;
  //     this.isConfirmLoading = false;
  //   }, 3000);
  // }


  // handleCancel(value) {
  //   if (value === 'isCalendarVisible') {
  //     this.slotObject = '';
  //     this.selectedSlot = '';
  //     this.selectedAppointment.doctorOPDTimeSlotDto = [];
  //     this.isCalendarVisible = false;
  //   } else if (value === 'isVisible') {
  //     this.isVisible = false;
  //   }
  // }

  showModal(type) {
    this.ShowERInput = false;
    if (type === 'find') {
      this.isFindPatientVisible = true;
    } else if (type === 'register') {
      this.isRegisterPatientVisible = true;
    } else if (type === 'isCalendarVisible') {
      this.isCalendarVisible = true;
    }
  }

  handleOk(type, patient) {
    this.isConfirmLoading = true;
    console.log(patient);
  }


  handleCancel(type) {
    if (type === 'find') {
      this.isFindPatientVisible = false;
    } else if (type === 'register') {
      this.isRegisterPatientVisible = false;
    } else if (type === 'isCalendarVisible') {
      this.isCalendarVisible = false;
    }
  }





  // =================== PATIENT REGISTRATION ==============
  calculatePatientAge(birthday, event) {
    this.formattedDOB = moment(birthday).format('YYYY/MM/DD');
    this.cardDOB = moment(birthday).format('DD/MMM/YYYY');
    this.patient.dob = birthday;
    console.log(this.formattedDOB);
    console.log(this.cardDOB);
    console.log(this.patient.dob);
    let end = moment(this.formattedDOB);
    this.currentDate = moment();
    console.log(this.currentDate);
    let currentDate = moment(this.currentDate); // new date
    let dob = moment(end); // DOB

    let years = currentDate.diff(dob, 'year');
    dob.add(years, 'years');

    let months = currentDate.diff(dob, 'months');
    dob.add(months, 'months');

    let days = currentDate.diff(dob, 'days');
    if (dob < this.currentDate) {
      this.finalAge = years + 'Y ' + months + 'M ' + days + 'D'
      this.patient.age = this.finalAge;
    } else {
      this.error = true;
      // this.finalAge = 'Date Cannot be higher than the current date';
      // this.patient.age = this.finalAge;
      setTimeout(() => {
        console.log('timeOUT');
        this.finalAge = 'Select Date of Birth';
        this.patient.age = this.finalAge;
      }, 3000);
    }
    console.log(this.finalAge);


  }

  isFieldValid(field: string) {
    // return !this.patientForm.get(field).invalid;
    return !this.patientForm.get(field).valid && this.patientForm.get(field).touched;
  }
  validateAllFormFields(formGroup: FormGroup) {
    console.log(formGroup);        // {1}
    console.log(formGroup.controls);        // {1}
    Object.keys(formGroup.controls).forEach(field => {  // {2}
      const control = formGroup.get(field);             // {3}
      if (control instanceof FormControl) {             // {4}
        control.markAsTouched({ onlySelf: true });
      } else if (control instanceof FormGroup) {        // {5}
        this.validateAllFormFields(control);            // {6}
      }
    });
  }

  onSubmit(patient) {
    console.log(patient);
    if (this.patientForm.valid) {
      this.createPatient(patient);
      this.notification.create('success', 'Saved', 'Saved successfully');
      console.log('form submitted');
    } else {
      Object.keys(this.patientForm.controls).forEach(field => { // {1}
        const control = this.patientForm.get(field);
        console.log(control);        // {2}
        control.markAsTouched({ onlySelf: true });       // {3}
      });
    }
  }

  createPatient(patient) {
    console.log(patient);
    this.apiService.patientService.AddPatient(patient).subscribe((res: any) => {
      console.log(res, 'patientDATA');
      this.PatientDisplayId = res.data.displayId;
      this.PatientFullName = res.data.firstName + ' ' + res.data.lastName;
      this.PatientDOB = res.data.dob;
      this.PatientContactNumber = res.data.cellNumber;
      // PatientDisplayId = res.data.displayId;
      // PatientDisplayId = res.data.displayId;
      this.PatientID = res.data.id;
      // patient.cardExpiry = this.expiryDate;
      // patient.createdOn = this.newDate;
      // localStorage.setItem('patient', JSON.stringify(patient));
      // this.route.navigate(['main/patient/RegisterSummary']);
    })
    // this.patient = {
    //   firstName: patient.firstName,
    //   lastName: patient.lastName,
    //   familyHeadName: patient.familyHeadName,
    //   cellNumber: patient.cellNumber,
    //   landLineNumber: patient.landLineNumber,
    //   emergencyNumber: patient.emergencyNumber,
    //   address: patient.address,
    //   cnic: patient.cnic,
    //   city: patient.city,
    //   dob: patient.dob,
    //   age: patient.age,
    //   gender: patient.gender,
    //   religion: patient.religion,
    //   maritalstatus: patient.maritalstatus,
    //   displayId: patient.displayId,
    //   id: patient.id,
    //   Status: true,
    //   cardExpiry: patient.cardExpiry,
    //   createdOn: patient.createdOn
    // };
    // localStorage.setItem('patient', JSON.stringify(this.patient));
    // this.apiService.patientService.UpdatePatient(this.patient).subscribe(res => {
    //   console.log(res);
    // })
    //  this.route.navigate(['patient/patient-summary']);
  }
}

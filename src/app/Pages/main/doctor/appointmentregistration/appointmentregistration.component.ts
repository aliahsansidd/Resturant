import {
  Component, OnInit, Renderer2, ElementRef, ViewChild, TemplateRef, ViewContainerRef, EmbeddedViewRef, Output,
  EventEmitter
} from '@angular/core';
import { ApiService } from '../../../../Services/common/apiService';
import { toNumber, NzNotificationService } from 'ng-zorro-antd';
import { en_US, zh_CN, NzI18nService } from 'ng-zorro-antd';
import * as moment from 'moment';
import { AppointmentCalendarComponent } from '../../../../CommonComponents/appointment-calendar/appointment-calendar.component';

// import { Patient } from '../../Modals/patient.model';
// import { MaintainpatientService } from '../maintainpatient/maintainpatient.service';
// import {DashboardRoutes } from '../../Routes/Dashboard.routes';

@Component({
  selector: 'app-appointmentregistration',
  templateUrl: './appointmentregistration.component.html',
  styleUrls: ['./appointmentregistration.component.css']
})
export class AppointmentregistrationComponent implements OnInit {
  @ViewChild('ref')
  private ref: TemplateRef<any>

  @ViewChild(AppointmentCalendarComponent) appointmentCalender: AppointmentCalendarComponent;
  //  @Output() sendDates: EventEmitter<any> = new EventEmitter();
  selectedPeople1 = [];
  timeSlot = [];
  patient = [];
  allDoctorsLength: any;
  selectedOpdDoctor: any;
  SelectedIndexOfAnArray: any = [];
  filteredDoctorsFromOpd = [];
  doctorsArray = [];
  rolesArray = [];
  allOpdDoctors = [];
  mrNumber: any;
  opdName: any;
  days: any;
  fullName: any;
  contactNumber: any;
  cellNumber: any;
  isDisabled = false;
  viewSaveButton = false;
  hide = false;
  isVisible = false;
  isCalendarVisible = false;
  isConfirmLoading = false;
  newAppointment = false;
  isEnglish = false;
  selectedDoctor: any;
  filteredOPD = [];
  searchItem = [];
  selectedDates = [];
  backupDates = [];
  current = 0;
  index: any;
  Consultancy = [
    { value: 1, text: 'Select OPD' },
    { value: 2, text: 'Select xyz' },
    { value: 3, text: 'other' }
  ];
  Doctors = [
    { value: 1, text: 'ali' },
    { value: 2, text: 'usama' },
    { value: 3, text: 'ahsan' }
  ];
  Days = [
    { value: 1, text: 'Monday' },
    { value: 2, text: 'Tuesday' },
    { value: 3, text: 'Wednesday' },
    { value: 4, text: 'Thursday' },
    { value: 5, text: 'Friday' },
    { value: 6, text: 'Saturday' },
    { value: 7, text: 'Sunday' },
  ];
  Shift = [
    { value: 1, text: 'Morning' },
    { value: 2, text: 'Evening' },
    { value: 3, text: 'Night' }
  ];
  timeSlots = [
    { value: 1, range: '3:00 - 3:15' },
    { value: 2, range: '3:15 - 3:30' },
    { value: 3, range: '3:30 - 3:45' },
    { value: 4, range: '3:45 - 4:00' }
  ]
  Time = [
    { value: 1, text: '9:00 am to 2:00 pm' },
    { value: 2, text: '12:00 am to 4:00 pm' },

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
  defaultDates = [moment('Wed Nov 07 2018 00:00:00 GMT+0500'),
  moment('Thu Nov 08 2018 00:00:00 GMT+0500'),
  moment('Fri Nov 09 2018 00:00:00 GMT+0500'),
  moment('Sat Nov 10 2018 00:00:00 GMT+0500')
  ];

  // selectedAppointment = {
  //   consultancy: '',
  //   doctor: '',
  //   days: [],
  //   shift: '',
  //   timeSlots: ''
  // }
  selectedAppointment = {
    displayId: '',
    patientName: '',
    contactNumber: '',
    doctorOPDId: '',
    appointmentDate: '',
    status: 0,
    doctorOPDTimeSlotDto: [
      // {
      //   doctorOPDId: ,
      //   slotNumber: 0,
      //   startTime: '',
      //   endTime: '',
      //   appointmentDate: '',
      //   appointmentId: 0,
      //   patientId: '',
      //   status: 0,
      //   id: 0
      // }
    ],
    id: 0
  }

  SelectedOPD = [];
  inputValue: '';
  options = [];
  patientSearch = [];
  // name = [];
  // contactNo = [];
  patientData: any;
  getPatientData: any;
  firstName: any;
  currentDate: any;
  timeNow: string;
  allUsers = [];
  opdTypes = [];
  filteredDoctors = [];
  selectedAppointedDoctorId: any;
  selectedDoctorName: any;
  selectedDoctorCategory: any;
  doctorDays: any;
  getDates: any;
  doctorDates = [];
  noOfTimeSlots: any;
  selectedSlot: any;
  selectedAppointmentDate: any;
  patientId: any;
  slotObject: any;
  disabledSlot: any;
  unavailableSlots = [];
  selectedTimeSlot = [];
  constructor(private apiService: ApiService,
    private renderer: Renderer2, private elementRef: ElementRef,
    private notification: NzNotificationService, private i18n: NzI18nService,
    private viewContainerRef: ViewContainerRef
  ) {
    this.apiService.patientService.$addPatientObservable.subscribe(res => {
      console.log(res);
      this.apiService.patientService.getPatientById(res).subscribe((resp: any) => {
        console.log(resp);
        this.handleCancel('isVisible');
        this.fullName = resp.data.firstName + ' ' + resp.data.lastName;
        this.selectedAppointment.patientName = this.fullName;
        this.mrNumber = resp.data.displayId;
        this.selectedAppointment.displayId = this.mrNumber;
        this.patientId = resp.data.id;
        this.selectedAppointment.contactNumber = resp.data.cellNumber;
      })
    })
  }

  ngOnInit() {
    this.apiService.opdRegistrationService.$doctorDaysObservable.subscribe(res => {
      console.log(res);
    })
    this.changeLanguage();
    this.apiService.doctorService.getAllDoctorOPD().subscribe((res: any) => {
      console.log(res);
      this.allOpdDoctors = res.data;
      this.filteredDoctorsFromOpd = this.allOpdDoctors;
      this.allDoctorsLength = res.data.length;
    })
    // this.getDefaultDates();
    console.log(this.filteredDoctors);
    this.getAllDoctors();
    // this.currentDate = moment().format('Do-MMM-YYYY');
    // this.timeNow = moment().format('hA');
    console.log(this.currentDate);
    console.log(this.timeNow);
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

  public getSelectedDateFromCalender(date) {
    console.log(date);
    this.selectedAppointmentDate = date[0];
    if (date.length > 0) {
      debugger;
      // alert( String(date[0]).toString());
      let obj = {
        doctorOPDId: this.selectedOpdDoctor.id,
        appointmentDate: moment(date[0]).format(),
      }
      console.log(obj);
      this.apiService.appointment.getOpdTimeSlot(obj).subscribe((res: any) => {
        debugger;

        this.selectedTimeSlot = res.data;
        console.log(res, 'GET DOCTOR OPD ID SLOTS');
        // this.unavailableSlots = res.data;
        for (let j = 0; j < this.timeSlot.length; j++) {
          // if (this.timeSlot[j] === res.data[j].slotNumber) {
          //   this.unavailableSlots.push(res.data[j].slotNumber);
          // }
          console.log(this.unavailableSlots);
        }
        // this.unavailableSlots = res.data.filter(x => x.)
        // this.GynoDoctor = res.data.filter(x => x.opdName === 'Gynacologist');
        // for (let i = 0; i < res.data.length; i++) {
        //   if (this.disabledSlot = res[i].slotNumber) {
        //     return this.disabledSlot
        //   }
        // }
        this.generateTimeslots(this.selectedOpdDoctor.durationInMinutes, this.selectedOpdDoctor.startTime, this.selectedOpdDoctor.endTime)
        this.showModal('isCalendarVisible');
      })

      date = [];
    }

  }
  IsDisabledSlot(i) {
    let a = [];
    // tslint:disable-next-line:triple-equals
    a = this.selectedTimeSlot.filter(x => x.slotNumber == i);
    if (a.length > 0) {
      return true;
    } else {
      return false;
    }
  }
  selectSlot(i, slot) {
    console.log(i);
    console.log(slot);
    if (slot !== '' && this.selectedAppointment.patientName !== '') {
      this.viewSaveButton = true;
    }
    let slotting = slot.split('-');
    this.slotObject = {
      doctorOPDId: this.selectedOpdDoctor.id,
      appointmentDate: moment(this.selectedAppointmentDate).format(),
      slotNumber: i,
      startTime: slotting[0],
      endTime: slotting[1],
      appointmentId: 0,
      patientId: this.patientId,
      status: 1,
      id: 0
    }
    this.selectedAppointment.doctorOPDId = this.selectedOpdDoctor.id,
      this.selectedAppointment.appointmentDate = moment(this.selectedAppointmentDate).format(),
      this.selectedAppointment.doctorOPDTimeSlotDto.push(this.slotObject)
    this.selectedSlot = i;
    console.log(this.selectedAppointment, 'CREATE');
  }
  appoint(i, doctor) {
    console.log(doctor);
    this.slotObject = '';
    this.selectedSlot = '';
    this.selectedAppointment.doctorOPDTimeSlotDto = [];
    this.selectedOpdDoctor = doctor;
    this.selectedDates = [];
    this.timeSlot = [];
    this.doctorDates = [];
    this.noOfTimeSlots = doctor.noOfTimeSlots;

    // remember this
    // this.generateTimeslots(doctor.durationInMinutes, doctor.startTime, doctor.endTime)
    for (let d = 0; d < doctor.doctorOpdDateDto.length; d++) {
      // debugger;
      this.doctorDates.push(moment(doctor.doctorOpdDateDto[d].date));
      // this.apiService.opdRegistrationService.sendDoctorDays(this.doctorDates);
    }
    this.appointmentCalender.selectedDates = this.doctorDates;
    this.appointmentCalender.backupDates = this.doctorDates;
    // ngOnchange()
    // this.doctorDays = doctor.days;
    // this.disabledDate(this.doctorDays);
    this.selectedDoctor = i;
    let appointment = {
      patientName: this.fullName,
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
        console.log(res);
        this.selectedAppointedDoctorId = res.data.doctorId;
        this.apiService.doctorService.getSingleDoctor(this.selectedAppointedDoctorId).subscribe((response: any) => {
          console.log(response);
          this.selectedDoctorName = response.data.applicationUserDoctorName;
          this.selectedDoctorCategory = response.data.doctorCategoryName;
        })
        // this.selectedDoctorName = res.data.doctorName;
        this.notification.create('success', 'Appointment registered!', 'Appointment Registered Succesfully');
      })
    } else {
      this.notification.create('error', 'No Patient', 'Please Select patient');
    }
  }
  makeNewAppointment() {
    this.newAppointment = true;
  }

  saveTimeSlot() {
    this.apiService.appointment.createAppointment(this.selectedAppointment).subscribe(res => {
      console.log(res);
      this.notification.create('success', 'Appointment Success', 'Appointment Created Successfully');
      this.handleCancel('isCalendarVisible');
    })
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

  getDefaultDates() {

    this.backupDates = this.defaultDates;
    console.log(this.selectedDates, 'SELECTED DATES');
  }
  // ==================== steps on modal =================

  pre(): void {
    this.current -= 1;
    this.changeContent();
  }

  next(): void {
    this.current += 1;
    this.changeContent();
  }

  done(): void {
    console.log('done');
  }

  changeContent(): void {
    switch (this.current) {
      case 0: {
        this.index = this.viewContainerRef.createEmbeddedView(this.ref);
        // messageDirective.viewContainerRef.createEmbeddedView(this.msgTempRef));
        break;
      }
      case 1: {
        this.index = 'Second-content';
        break;
      }
      case 2: {
        this.index = 'third-content';
        break;
      }
      default: {
        this.index = 'error';
      }
    }
  }

  // ==================== steps on modal =================

  makeExistingPatientAppointment() {
    this.fullName = '';
    this.contactNumber = '';
    this.newAppointment = false;
  }
  getAllDoctors() {
    let count = 0;
    this.apiService.user.getAllUser()
      .subscribe(
        (res: any) => {
          this.filteredDoctors = res.data.result;
          for (let i = 0; i < this.filteredDoctors.length; i++) {
            for (let j = 0; j < this.filteredDoctors[i].roles.length; j++) {
              if (this.filteredDoctors[i].roles[j].name === 'Doctor') {
                this.doctorsArray[count] = this.filteredDoctors[i];
                count++;
              }
            }
          }
          console.log('Filered', this.doctorsArray)
        }
      )

  }

  searchOPD(opd) {
    this.filterByOPD(opd);
  }

  filterByOPD(opd) {
    // console.log(opd);
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
  resetOPDSearch() {
    this.filteredDoctorsFromOpd = this.allOpdDoctors;
    this.allDoctorsLength = this.allOpdDoctors.length;

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
  changeLanguage(): void {
    this.i18n.setLocale(this.isEnglish ? zh_CN : en_US);
    this.isEnglish = !this.isEnglish;
  }
  disabledDate = (current: Date): boolean => {
    // Can not select days before today and today
    // console.log(this.doctorDays);
    // let splitDays = this.doctorDays.split(',');
    // console.log(splitDays);
    // for (let i = 0; i < splitDays.length; i++) {
    //   let threeLetteredDays = splitDays[i].split('').slice(0, 3).join('');
    //   console.log(threeLetteredDays);
    // }
    console.log(current);
    return;
  };
  showModal(value) {
    // console.log(patient);
    if (value === 'isVisible') {
      this.isVisible = true;
    } else if (value === 'isCalendarVisible') {
      this.isCalendarVisible = true;
    }
  }

  handleOk() {
    this.isConfirmLoading = true;
    setTimeout(() => {
      this.isVisible = false;
      this.isCalendarVisible = false;
      this.isConfirmLoading = false;
    }, 3000);
  }


  handleCancel(value) {
    if (value === 'isCalendarVisible') {
      this.slotObject = '';
      this.selectedSlot = '';
      this.timeSlot = [];
      this.selectedAppointment.doctorOPDTimeSlotDto = [];
      this.isCalendarVisible = false;
    } else if (value === 'isVisible') {
      this.isVisible = false;
    }
  }
  getNotification(x) {
    // debugger;
    this.getDates = x;
  }
}

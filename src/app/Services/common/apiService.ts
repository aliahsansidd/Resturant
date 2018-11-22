import { Injectable } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PermissionsService } from '../endpoints/Permissions.service';
import { DateService } from '../endpoints/Date.service';
import { CardService } from '../endpoints/CardService';
import { RoleManagementService } from '../endpoints/roleManagement.service';
import { MaintainPatientService } from '../endpoints/maintainpatient.service';
import { UserService } from '../endpoints/user.service';
import { HttpService } from './HttpService';
import { LocalStorageService } from '../endpoints/localStorage.service';
import { BuildingInfo } from '../endpoints/Buildinginfo.service';
import { OPDService } from '../endpoints/OPDService';
import { WardAndBedService } from '../endpoints/wardAndBed.service';
import { BirthAndDeath } from '../endpoints/BirthAndDeath.service';
import { InsuranceService } from '../endpoints/insurance.service';
import { AppointmentSerive } from '../endpoints/appointment.service';
import { ConsultancyService } from '../endpoints/ConsultancyService';
import { BillingService } from '../endpoints/billing.service';
import { DoctorService } from '../endpoints/doctor.service';
import { RoomService } from '../endpoints/room.service';
import { OpdRegistrationService } from '../endpoints/opd-registration.service';
import { LabService } from '../endpoints/lab.service';
import { AccidentAndEmergencyService } from '../endpoints/AccidentAndEmergency.service';
import { PharmacyModuleService } from '../endpoints/PharmacyModule.service';
import { BedManagementService } from '../endpoints/BedManagement.service';
import { AmbulanceManagementService } from '../endpoints/AmbulanceManagement.service';



@Injectable()
export class ApiService {
  localstorage: LocalStorageService = new LocalStorageService(this.router);
  card: CardService = new CardService(this.httpService);
  date: DateService = new DateService(this.card);
  permissions: PermissionsService = new PermissionsService(this.httpService);
  consultancy: ConsultancyService = new ConsultancyService(this.httpService);
  appointment: AppointmentSerive = new AppointmentSerive(this.httpService);
  birthAndDeath: BirthAndDeath = new BirthAndDeath(this.httpService);
  patientService: MaintainPatientService = new MaintainPatientService(this.httpService);
  BuildingInfo: BuildingInfo = new BuildingInfo(this.httpService);
  user: UserService = new UserService(this.httpService);
  roleService: RoleManagementService = new RoleManagementService(this.httpService);
  OPDService: OPDService = new OPDService(this.httpService);
  wardAndBedService: WardAndBedService = new WardAndBedService(this.httpService);
  doctorService: DoctorService = new DoctorService(this.httpService);
  roomService: RoomService = new RoomService(this.httpService);
  opdRegistrationService: OpdRegistrationService = new OpdRegistrationService(this.httpService);
  insuranceService: InsuranceService = new InsuranceService(this.httpService);
  billingService: BillingService = new BillingService(this.httpService);
  labService: LabService = new LabService(this.httpService);
  pharmacyService: PharmacyModuleService = new PharmacyModuleService(this.httpService);
  bedManagement: BedManagementService = new BedManagementService(this.httpService);
  accidentAndEmergency: AccidentAndEmergencyService = new AccidentAndEmergencyService(this.httpService);
  AmbulanceManagement: AmbulanceManagementService = new AmbulanceManagementService(this.httpService);
  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private httpService: HttpService,
    private localStorage: LocalStorageService
  ) {
    // cons
  }
}

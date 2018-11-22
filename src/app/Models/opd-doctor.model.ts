 export class OpdDoctor {
    doctorId?: 0;
    doctorUser?: {
       firstName?: string;
      middleName?: string;
      lastName?: string;
      fullName?: string;
      email?: string;
      password?: string;
      roles?: [
        {
          userId?: string;
          id?: string;
          name?: string
        }
      ];
      cellNumber?: string;
      createdOn?: string;
      status?: 0;
      picture?: string;
      id?: string
    };
    opdId?: 0;
    opdName?: string;
    doctorCategoryId?: 0;
    doctorCategoryName?: string;
    startTime?: string;
    endTime?: string;
    durationInMinutes?: 0;
    fee?: 0;
    noOfTimeSlots?: 0;
    isRoutineBased?: true;
    weekAndDays?: string;
    startDateRange?: '';
    endDateRange?: '';
    roomId?: 0;
    roomName?: string;
    drAvailability?: 0;
    drAvailabilityReason?: string;
    doctorOpdDateDto?: [
      {
        doctorOPDId?: 0;
        opdId?: 0;
        doctorId?: 0;
        date?: '';
        isSittingOnThisDate: true;
        id?: 0
      }
    ];
    id?: 0
   }

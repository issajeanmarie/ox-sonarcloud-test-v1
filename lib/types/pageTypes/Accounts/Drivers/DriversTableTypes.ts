enum ShiftStatus {
  STARTED = "STARTED"
}

export interface SingleShift {
  id: number;
  startDateTime: string;
  endDateTime: string;
  distance: number;
  coordinates: string;
  uniqueId: string;
  status: ShiftStatus;
}

export type DriversTableTypes = {
  id: number;
  names: string;
  phone: string;
  email: string;
  enabled: boolean;
  role: string;
  ongoingShift: SingleShift | null;
};

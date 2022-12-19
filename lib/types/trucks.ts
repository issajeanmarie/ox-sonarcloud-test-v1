export interface UploadFuelReportResponse {
  message: string;
  payload: [
    {
      allRecords: number;
      addedRecords: number;
      alreadyExisting: number;
      withNonExistingTruck: number;
    }
  ];
}

export interface UploadFuelReportRequest {
  report: FormData;
}

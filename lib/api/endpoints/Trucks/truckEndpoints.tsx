import { baseAPI } from "../../api";
import {
  UploadFuelReportRequest,
  UploadFuelReportResponse
} from "../../../types/trucks";

const truckEndpoints = baseAPI.injectEndpoints({
  endpoints: (builder) => ({
    uploadFuelReport: builder.mutation<
      UploadFuelReportResponse,
      UploadFuelReportRequest
    >({
      query: (DTO) => ({
        url: "trucks/fuel-report/upload",
        method: "POST",
        body: DTO?.report
      })
    })
  })
});

export const { useUploadFuelReportMutation } = truckEndpoints;

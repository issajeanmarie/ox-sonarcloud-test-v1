/**
 * TRUCKS TYPES
 * @author Issa Jean Marie <jeanmarieissa@gmail.com>
 * @since August 2022
 */
export type LoadMoreTrucksResponse = {
  message: string;
  payload: string;
};

export type CreateTruckRequest = {
  depotId: 0;
  model: string;
  plateNumber: string;
  capacity: 0;
  type: string;
  yearManufactured: 0;
  chassisNumber: string;
  engineNumber: string;
  fuelType: string;
  engineOilType: string;
  tireBrand: string;
  tireSize: string;
  trackingUnitSerialNumber: string;
  fuelCardAssigned: string;
};

export type LoadMoreTrucksRequest = {
  page?: number;
  size?: number;
  status?: string;
  sort?: string;
  search?: string;
};

export type CreateTruckResponse = {
  message: string;
  payload: string;
};

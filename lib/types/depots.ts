export interface DepotResponse {
  status: number;
  message: string;
  payload: [
    {
      id: number;
      name: string;
      location: string;
      coordinates: string | null;
    }
  ];
}

export type depotTypes = {
  id: number;
  name: string;
  location: string;
  coordinates: string | null;
};

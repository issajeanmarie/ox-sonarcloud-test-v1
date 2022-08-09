export interface DepotResponse {
  status: number;
  message: string;
  payload: [
    {
      id: string;
      name: string;
      location: string;
      coordinates: string;
    }
  ];
}

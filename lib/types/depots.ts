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
  location?: string;
  coordinates?: string | null;
};

export type CreateDepotRequest = {
  name: string;
  location: string;
  coordinates: string;
};

export type SelectedDepotTypes = {
  depotName: string | undefined;
  depotId: number | undefined;
};

export type DepotAlertModalTypes = {
  isVisible: boolean;
  setIsVisible: React.Dispatch<React.SetStateAction<boolean>>;
};

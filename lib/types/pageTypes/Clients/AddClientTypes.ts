/* eslint-disable @typescript-eslint/no-explicit-any */
import { LatLng } from "use-places-autocomplete";

export type AddClientTypes = {
  onAddClientFinish: (values: any) => void;
  createOffices: () => void;
  offices: [
    {
      id: number;
      names: string | undefined;
      type: string;
      locaction: string;
      coordinates: string;
    }
  ];
  setOffices: any;
  isLoading: boolean;
  setLocation: React.Dispatch<
    React.SetStateAction<
      | {
          name: string;
          coordinates: LatLng;
        }
      | undefined
    >
  >;
  location:
    | {
        name: string;
        coordinates: LatLng;
      }
    | undefined;
  form: any;
  setMainLocation: React.Dispatch<
    React.SetStateAction<
      | {
          name: string;
          coordinates: LatLng;
        }
      | undefined
    >
  >;
  mainLocation:
    | {
        name: string;
        coordinates: LatLng;
      }
    | undefined;

  handleChangeOfficeName: (value: string) => void;
};

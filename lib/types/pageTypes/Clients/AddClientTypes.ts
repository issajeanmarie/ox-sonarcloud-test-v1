/* eslint-disable @typescript-eslint/no-explicit-any */
import { LatLng } from "use-places-autocomplete";

export type AddClientTypes = {
  onAddClientFinish: (values: any) => void;
  createOffices: () => void;
  onOfficeNameChange: (value: string) => void;
  offices: [
    {
      id: number;
      names: string;
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
  officeName: string;
  form: any;
};

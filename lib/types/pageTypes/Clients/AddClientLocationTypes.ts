import { LatLng } from "use-places-autocomplete";

/* eslint-disable @typescript-eslint/no-explicit-any */
export type AddClientLocationTypes = {
  onAddClientLocationFinish: (values: any) => void;
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
  setLocationName: React.Dispatch<
    React.SetStateAction<
      | {
          name: string;
          coordinates: LatLng;
        }
      | undefined
    >
  >;
  locationName:
    | {
        name: string;
        coordinates: LatLng;
      }
    | undefined;
};

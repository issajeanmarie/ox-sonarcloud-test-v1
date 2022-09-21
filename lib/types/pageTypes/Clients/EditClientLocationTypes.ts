import { LatLng } from "use-places-autocomplete";

/* eslint-disable @typescript-eslint/no-explicit-any */
export type EditClientLocationTypes = {
  onEditClientLocationFinish: (values: any) => void;
  isLoading: boolean;
  form: any;
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

/* eslint-disable @typescript-eslint/no-explicit-any */
export type AddClientTypes = {
  onAddClientFinish: (values: any) => void;
  createOffices: () => void;
  onOfficeNameChange: (value: string) => void;
  onOfficeLocationChange: (value: string) => void;
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
};

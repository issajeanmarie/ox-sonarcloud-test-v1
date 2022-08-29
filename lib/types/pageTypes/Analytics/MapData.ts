/* eslint-disable @typescript-eslint/no-explicit-any */
export type MapDataTypes = [
  {
    id: number | never;
    office: {
      coordinates: any;
      location: string;
      id: number;
    };
    category: {
      id: number;
      name: string;
    };
  }
];

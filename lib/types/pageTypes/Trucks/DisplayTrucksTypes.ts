export type DisplayTrucksTypes = {
  id: string;
  content: [];
  totalPages: number;
  data: object;
};

export type FuelRecordsTypes = {
  props: {
    startDate: string;
    endDate: string;
  };

  state: {
    trucks: { displayTrucksFuelRecords: any };
  };
};

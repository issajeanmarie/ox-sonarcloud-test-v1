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

export type TruckIssuesTypes = {
  trucks: {
    displayTruckIssues: {
      content: any;
      empty: boolean;
      first: boolean;
      last: boolean;
      number: number;
      numberOfElements: number;
      pageable: {
        offset: 0;
        pageNumber: number;
        pageSize: number;
        paged: boolean;
        unpaged: boolean;
        sort: { sorted: boolean; unsorted: boolean; empty: boolean };
      };
      size: number;
      totalElements: number;
      totalPages: number;
      sort: { sorted: boolean; unsorted: boolean; empty: boolean };
    };
  };
};

export type TruckRepairLogs = {
  state: {
    trucks: { displayTrucksRepairLogs: any };
  };
};

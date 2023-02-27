export type ClientsTableTypes = {
  id: number;
  names: string;
  phone: string;
  email: string;
  location: string;
  pendingAmount: number | undefined;
  createdAt: Date;
  lastOrderDate: Date;
};

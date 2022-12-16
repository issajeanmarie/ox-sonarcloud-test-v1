export type SettingsCategoriesTableTypes = {
  totalOrders: number;
  parentCategory: null;
  children: any[];
  subCategories: [
    {
      name: string;
      id: number;
    }
  ];
  name: string;
  id: number;
};

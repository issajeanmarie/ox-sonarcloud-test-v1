export type SettingsCategoriesTableTypes = {
  totalOrders: number;
  parentCategory: null;
  subCategories: [
    {
      name: string;
      id: number;
    }
  ];
  name: string;
  id: number;
};

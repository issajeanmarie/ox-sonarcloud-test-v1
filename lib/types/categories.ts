export type CategoryResponse = Category[];

export type Category = {
  id: number;
  name: string;
  parentCategory?: Category;
  subCategories: Category[];
  totalOrders: number;
};

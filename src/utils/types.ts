export type ProductType = {
  name: string;
  description: string;
  price: number;
  stock: number;
};

export type FiltersType = {
  min_price: number;
  max_price: number;
  sortBy: "name" | "price" | "created_at";
  order: "asc" | "desc";
};

export type UserType = {
  name: string;
  email: string;
  profile_picture: string;
  password: string;
};

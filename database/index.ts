// Models (default exports re-exported as named)
export { default as User } from "./user.model";
export { default as Product } from "./product.model";
export { default as Order } from "./order.model";
export { default as Category } from "./category.model";

// User types
export type { IUser } from "./user.model";

// Product types
export type { IProduct, IProductDB, ProductFormData } from "./product.model";

// Order types
export type {
  IOrder,
  IOrderProduct,
  IOrderProductFrontend,
  IUserDetails,
} from "./order.model";

// Category types
export type { ICategory } from "./category.model";

// Image types
export { imageSchema } from "./image.model";
export type { IImage } from "./image.model";

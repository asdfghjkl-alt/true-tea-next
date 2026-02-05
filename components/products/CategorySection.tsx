import { ICategory } from "@/database/category.model";
import { IProductDB } from "@/database/product.model";
import ProductCard from "./ProductCard";

interface CategorySectionProps {
  category: ICategory;
  products: IProductDB[];
}

const CategorySection = ({ category, products }: CategorySectionProps) => {
  if (products.length === 0) return null;

  return (
    <section className="mb-12">
      <div className="mb-6 flex items-baseline gap-3 border-b border-emerald-100 pb-2">
        {/* Category name */}
        <h2 className="text-2xl font-bold text-emerald-800">{category.name}</h2>

        {/* Category name in Chinese */}
        <span className="text-xl font-medium text-emerald-600">
          {category.nameCN}
        </span>
      </div>

      {/* Products grid */}
      <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
        {/* Displays grid of product cards */}
        {products.map((product) => (
          <ProductCard key={product._id} product={product} />
        ))}
      </div>
    </section>
  );
};

export default CategorySection;

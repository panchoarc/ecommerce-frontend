import ProductCard from "@/features/products/components/ProductCard";
import useRecommendations from "@/features/recommendation/hooks/useRecommendation";

const UserHome = () => {
  const { products } = useRecommendations();

  return (
    <section className=" mx-auto max-w-7xl py-8">
      <h2 className="text-2xl font-semibold mb-8 text-center">
        Productos más populares
      </h2>
      {products?.length != 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-4">
          {products?.map((product) => (
            <ProductCard key={product.id} product={product} viewMode="grid" />
          ))}
        </div>
      )}
    </section>
  );
};

export default UserHome;

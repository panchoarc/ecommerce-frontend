import useProduct from "@/features/products/hooks/useProduct";
import useProductImages from "@/features/products/hooks/useProductImages";
import { FC } from "react";
import { useNavigate, useParams } from "react-router";

import ProductImageGallery from "@/features/products/components/ProductImageGallery";
import ProductPurchaseSection from "@/features/products/components/ProductPurchase";
import ProductTitleSection from "@/features/products/components/ProductTitleSection";

import { useCart } from "@/features/cart/hooks/CartContext";
import FullscreenLoader from "@/shared/ui/ScreenLoader";
import useProductReviews from "@/features/products/hooks/useProductReviews";
import ProductReviews from "@/features/products/components/ProductReviews";
import { showCartToast } from "@/features/products/components/addToCartToast";
import ProductDescription from "@/features/products/components/ProductDescription";
import useSimilarProducts from "@/features/recommendation/hooks/useSimilarProducts";
import ProductCard from "@/features/products/components/ProductCard";

const ProductDetail: FC = () => {
  const { id } = useParams<{ id: string }>();
  const { addToCart } = useCart();

  const { products: similarProducts } = useSimilarProducts(Number(id));

  const navigate = useNavigate();
  const {
    product,
    loading: productLoading,
    error: productError,
  } = useProduct(Number(id));

  const {
    images,
    loading: imagesLoading,
    error: imagesError,
  } = useProductImages(Number(id));

  const { reviews } = useProductReviews(Number(id));

  if (productLoading || imagesLoading) return <FullscreenLoader />;

  if (productError || imagesError)
    return (
      <p className="text-center text-red-500">Error al cargar el producto</p>
    );

  if (!product)
    return <p className="text-center text-gray-500">Producto no encontrado</p>;

  const handleAddToCart = () => {
    if (product) {
      addToCart(product, 1);
      showCartToast(navigate);
    }
  };

  return (
    <div className="max-w-7xl overflow-y-auto mx-auto px-4 md:px-6 py-8 md:py-12">
      <div className="flex flex-col md:flex-row gap-8">
        {/* Galería de imágenes */}
        <div className="md:w-3/5 flex">
          <ProductImageGallery images={images} />
        </div>

        {/* Información del producto */}
        <div className="md:w-2/5 flex flex-col w-full px-3">
          <div className="flex flex-col justify-between h-full space-y-4">
            <ProductTitleSection name={product.name} rating={product.rating} />

            <ProductPurchaseSection
              price={product.price}
              stock={product.stock}
              onAddToCart={handleAddToCart}
            />
          </div>
        </div>
      </div>

      <section className="my-8">
        <ProductDescription description={product.description} />
        <ProductReviews reviews={reviews} />

        {similarProducts?.length != 0 && (
          <section className=" mx-auto max-w-7xl py-8">
            <h2 className="text-2xl font-semibold mb-8 text-center">
              Productos Similares
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-4">
              {similarProducts?.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  viewMode="grid"
                />
              ))}
            </div>
          </section>
        )}
      </section>
    </div>
  );
};

export default ProductDetail;

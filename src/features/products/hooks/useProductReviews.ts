import { useQuery } from "@tanstack/react-query";
import ProductService from "@/features/products/services/ProductService";

const useProductReviews = (productId: number) => {
  const { data, isLoading, error } = useQuery({
    queryKey: ["products", productId, "reviews"],
    queryFn: () => ProductService.getProductReviews(productId),
    enabled: !!productId, // Solo hace la petición si hay un ID válido
  });

  return {
    reviews: data ?? null,
    loading: isLoading,
    error,
  };
};

export default useProductReviews;

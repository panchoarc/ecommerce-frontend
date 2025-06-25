import { useQuery } from "@tanstack/react-query";
import ProductService from "@/features/products/services/ProductService";

const useProduct = (productId: number) => {
  const { data, isLoading, error } = useQuery({
    queryKey: ["product", productId],
    queryFn: () => ProductService.getProduct(productId),
    enabled: !!productId, // Solo hace la petición si hay un ID válido
  });

  return {
    product: data || null,
    loading: isLoading,
    error,
  };
};

export default useProduct;

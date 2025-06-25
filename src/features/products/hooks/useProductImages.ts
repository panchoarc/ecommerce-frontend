import { useQuery } from "@tanstack/react-query";
import ProductService from "@/features/products/services/ProductService";

export default function useProductImages(productId: number) {
  const { data, isLoading, error } = useQuery({
    queryKey: ["product-images", productId],
    queryFn: () => ProductService.getProductImages(productId),
    enabled: !!productId, // Solo ejecuta si productId es válido
  });

  return {
    images: data || [],
    loading: isLoading,
    error,
  };
}

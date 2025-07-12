import { useQuery } from "@tanstack/react-query";
import RecommendationService from "@/features/recommendation/services/RecommendationService";

const useSimilarProducts = (productId: number) => {
  const { data, isLoading, error } = useQuery({
    queryKey: ["recommendations", productId],
    queryFn: () => RecommendationService.getSimilarProducts(productId),
  });

  return {
    products: data || null,
    loading: isLoading,
    error,
  };
};

export default useSimilarProducts;

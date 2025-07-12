import { useQuery } from "@tanstack/react-query";
import RecommendationService from "@/features/recommendation/services/RecommendationService";

const useRecommendations = () => {
  const { data, isLoading, error } = useQuery({
    queryKey: ["recommendations"],
    queryFn: () => RecommendationService.getPopularRecommendations(),
  });

  return {
    products: data || null,
    loading: isLoading,
    error,
  };
};

export default useRecommendations;

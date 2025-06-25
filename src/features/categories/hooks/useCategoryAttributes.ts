import { useQuery } from "@tanstack/react-query";
import CategoryService from "../services/CategoryService";

const useCategoryAttributes = (categoryId: number) => {
  const {
    data: attributes,
    isLoading: loading,
    isError: error,
    error: errorData,
  } = useQuery({
    queryKey: ["categoryAttributes", categoryId],
    queryFn: () => CategoryService.getCategoryAttributes(categoryId),
    enabled: !!categoryId, // solo corre si hay categoryId
  });

  return {
    attributes: attributes ?? [],
    loading,
    error,
    errorData,
  };
};

export { useCategoryAttributes };

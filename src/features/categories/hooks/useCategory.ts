import { usePaginatedData } from "@/shared/hooks/usePaginationData";
import CategoryService from "@/features/categories/services/CategoryService";

const useCategories = (initialPageSize = 10) => {
  const { data, pagination, loading, error, setPage, setPageSize, refetch } =
    usePaginatedData({
      queryKey: JSON.stringify(["categories", ]), 
      queryFn: CategoryService.getCategories,
      pageSize: initialPageSize, 
    });

  // Devolver el estado y las funciones
  return {
    categories: data,
    pagination: pagination || {
      currentPage: 1,
      pageSize: initialPageSize,
      totalPages: 1,
    }, // Fallback a un valor por defecto
    loading,
    error,
    setPage,
    setPageSize,
    refetch,
  };
};

export { useCategories };

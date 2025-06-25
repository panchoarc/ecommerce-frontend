import { usePaginatedData } from "@/shared/hooks/usePaginationData"; // asegúrate que la ruta sea correcta
import ProductService from "@/features/products/services/ProductService";
type ProductFilters = {
  name?: string;
  description?: string;
  price?: number;
  categoryId?: number;
  attributes?: Record<string, string[]>;
};

const useProducts = (filters?: ProductFilters) => {
  const {
    data: products,
    pagination,
    loading,
    error,
    setPage,
    setPageSize,
    refetch,
  } = usePaginatedData({
    queryKey: JSON.stringify(["products", filters]), // importante para invalidaciones correctas
    queryFn: (page: number, pageSize: number) =>
      ProductService.getProducts({ filters, page, pageSize }),
    pageSize: 10,
  });

  return {
    products,
    pagination,
    loading,
    error,
    setPage,
    setPageSize,
    refetch,
  };
};

export { useProducts };

import OrderService from "@/features/order/services/OrderService";
import { usePaginatedData } from "@/shared/hooks/usePaginationData"; // asegúrate que la ruta sea correcta

const useMyOrders = () => {
  const { data, pagination, loading, error, setPage, setPageSize, refetch } =
    usePaginatedData({
      queryKey: ["orders"], // importante para invalidaciones correctas
      queryFn: (page: number, pageSize: number) =>
        OrderService.getMyOrders({ page, pageSize }),
    });

  return {
    orders: data ?? [],
    pagination,
    loading,
    error,
    setPage,
    setPageSize,
    refetch,
  };
};

export { useMyOrders };

import { useQuery, useQueryClient } from "@tanstack/react-query";
import AddressService from "@/features/address/services/AddressService";
import { useState, useCallback } from "react";

const useUserAddress = () => {
  const [pagination, setPagination] = useState({
    currentPage: 0,
    pageSize: 10,
  });

  const queryKey = ["addresses", pagination.currentPage, pagination.pageSize];

  const queryClient = useQueryClient();

  const { data, isLoading, error, refetch } = useQuery({
    queryKey,
    queryFn: () =>
      AddressService.getMyAddresses(
        pagination.currentPage,
        pagination.pageSize
      ),
  });

  const setPage = useCallback(
    (newPage: number) => {
      if (pagination.currentPage !== newPage - 1) {
        setPagination((prev) => ({
          ...prev,
          currentPage: newPage - 1,
        }));
      }
    },
    [pagination.currentPage]
  );

  const setPageSize = useCallback(
    (newSize: number) => {
      if (pagination.pageSize !== newSize) {
        setPagination({
          pageSize: newSize,
          currentPage: 0,
        });
      }
    },
    [pagination.pageSize]
  );

  const refetchAddresses = () => {
    queryClient.invalidateQueries({ queryKey: ["addresses"] });
  };

  return {
    addresses: data?.data || [],
    pagination: {
      ...pagination,
      totalPages: data?.pagination?.totalPages || 0,
      totalCount: data?.pagination?.totalCount || 0,
    },
    loading: isLoading,
    error,
    setPage,
    setPageSize,
    refetchAddresses,
    refetch,
  };
};

export { useUserAddress };

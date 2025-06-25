import { useQuery } from "@tanstack/react-query";
import { useState, useCallback } from "react";

interface PaginationResponse<T> {
  data: T[];
  pagination: {
    totalPages: number;
    totalCount: number;
  };
}

interface UsePaginatedDataProps<T> {
  queryKey: string;
  queryFn: (page: number, pageSize: number) => Promise<PaginationResponse<T>>;
  pageSize?: number;
}

const usePaginatedData = <T>({
  queryKey,
  queryFn,
  pageSize = 10,
}: UsePaginatedDataProps<T>) => {
  const [pagination, setPagination] = useState({
    currentPage: 0,
    pageSize: pageSize,
  });

  const { data, isLoading, error, refetch } = useQuery({
    queryKey: [queryKey, pagination.currentPage, pagination.pageSize],
    queryFn: () => queryFn(pagination.currentPage, pagination.pageSize),
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

  return {
    data: data?.data ?? [],
    pagination: {
      ...pagination,
      totalPages: data?.pagination?.totalPages ?? 0,
      totalCount: data?.pagination?.totalCount ?? 0,
    },
    loading: isLoading,
    error,
    setPage,
    setPageSize,
    refetch,
  };
};

export { usePaginatedData };

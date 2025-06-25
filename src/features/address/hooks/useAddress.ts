import { useQuery } from "@tanstack/react-query";
import AddressService from "@/features/address/services/AddressService";

const useAddresses = () => {
  const { data, isLoading, error, refetch, isFetching } = useQuery({
    queryKey: ["addresses"],
    queryFn: () => AddressService.getMyAddresses(),
    staleTime: 1000 * 60 * 5, // 5 min en caché
  });


  return {
    addresses: data?.data ?? [],
    loading: isLoading,
    fetching: isFetching,
    error,
    refetch,
  };
};

export { useAddresses };

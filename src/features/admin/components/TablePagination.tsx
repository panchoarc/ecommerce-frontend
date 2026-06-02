import { Table } from "@tanstack/react-table";
import { Button } from "@/shared/ui/button";

interface TablePaginationProps<T> {
  table: Table<T>;
  pagination: {
    currentPage: number;
    totalPages: number;
    pageIndex: number;
    pageSize: number;
  };
}

const TablePagination = <TData,>({
  table,
  pagination,
}: TablePaginationProps<TData>) => {
  const hasNoData = pagination.totalPages === 0;

  const currentPage = hasNoData ? 1 : pagination.pageIndex + 1;
  const totalPages = hasNoData ? 1 : pagination.totalPages;

  return (
    <div className="space-x-2 flex justify-center items-center">
      <span className="text-sm">
        Página {currentPage} de {totalPages}
      </span>
      <Button
        variant="outline"
        size="sm"
        onClick={() => table.previousPage()}
        disabled={!table.getCanPreviousPage() || hasNoData}
      >
        Previous
      </Button>
      <Button
        variant="outline"
        size="sm"
        onClick={() => table.nextPage()}
        disabled={!table.getCanNextPage() || hasNoData}
      >
        Next
      </Button>
    </div>
  );
};

export default TablePagination;
import { Button } from "@/shared/ui/button";
import { FC } from "react";

import { ReactTable } from "@tanstack/react-table"; // Adjust the import based on your project structure

interface TablePaginationProps {
  table: ReactTable<any>; // Replace with the correct type for your table instance
  pagination: {
    currentPage: number;
    totalPages: number;
  };
}

const TablePagination: FC<TablePaginationProps> = ({ table, pagination }) => {
  const hasNoData = pagination.totalPages === 0;

  const currentPage = hasNoData ? 1 : pagination.currentPage + 1;
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

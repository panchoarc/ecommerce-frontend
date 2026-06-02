import { FC, useMemo } from "react";
import { Link } from "react-router"; // Asegúrate de usar 'react-router-dom'

import { Button } from "@/shared/ui/button";

import { useCategories } from "@/features/categories/hooks/useCategory";

import { createCategoriesColumns } from "@/features/admin/components/CategoriesColumns";
import { DataTable } from "../components/Datatable";

const CategoriesHome: FC = () => {
  const { categories, pagination, setPage, setPageSize, refetch } =
    useCategories();

  const columns = useMemo(() => createCategoriesColumns(refetch), [refetch]);

  return (
    <DataTable
      data={categories}
      columns={columns}
      filterColumn="name"
      pagination={{
        pageIndex: pagination.currentPage,
        pageSize: pagination.pageSize,
        totalPages: pagination.totalPages,
        onPageChange: setPage,
        onPageSizeChange: setPageSize,
      }}
      renderTopActions={
        <Link to="/admin/categories/create">
          <Button className="bg-yellow-400">Add Category</Button>
        </Link>
      }
    />
  );
};

export default CategoriesHome;

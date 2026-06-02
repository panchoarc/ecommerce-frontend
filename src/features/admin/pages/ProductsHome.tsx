"use client";

import { FC, useMemo } from "react";

import { useProducts } from "@/features/products/hooks/useProducts";

import { Button } from "@/shared/ui/button";

import { createProductColumns } from "@/features/admin/components/ProductColumns";
import { Link } from "react-router";
import { DataTable } from "../components/Datatable";

const AdminProductsHome: FC = () => {
  const { products, pagination, setPage, setPageSize, refetch } = useProducts();

  const columns = useMemo(() => createProductColumns(refetch), [refetch]);

  return (
    <DataTable
      data={products}
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
        <Link to="/admin/products/create">
          <Button className="bg-yellow-400">Create Product</Button>
        </Link>
      }
    />
  );
};
export default AdminProductsHome;

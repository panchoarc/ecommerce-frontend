import { Button } from "@/shared/ui/button";
import { Link } from "react-router";
import { DataTable } from "../components/Datatable";
import { createPermissionsColumns } from "../components/PermissionsColumn";
import { useMemo } from "react";
import { useCategories } from "@/features/categories/hooks/useCategory";

const Permissions = () => {

  const { categories, pagination, setPage, setPageSize, refetch } =
      useCategories();
  


  const columns = useMemo(() => createPermissionsColumns(refetch), [refetch]);


  return (
    <div className="w-full flex flex-col flex-1 overflow-hidden">
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
        </div>
  );
};

export default Permissions;

import ProductCard from "@/features/products/components/ProductCard";
import PageSizeSelector from "@/shared/ui/pagesizeselector";
import PaginationControls from "@/shared/ui/PaginationControls";
import { SidebarTrigger } from "@/shared/ui/sidebar";
import { ViewToggle } from "@/shared/ui/viewtoggle";
import { FC, useState } from "react";

interface ProductListProps {
  products: any[];
  pagination: {
    page: number;
    pageSize: number;
    totalPages: number;
    totalItems: number;
  };
  loading: boolean;
  setPage: (page: number) => void;
  setPageSize: (size: number) => void;
}

const ProductList: FC<ProductListProps> = ({
  products,
  pagination,
  loading,
  setPage,
  setPageSize,
}) => {
  const [viewMode, setViewMode] = useState("grid");

  const handlePageSizeChange = (newPageSize: number) => {
    setPageSize(newPageSize);
  };

  if (loading) return <div className="p-4">Cargando...</div>;

  return (
    <div className="flex flex-col w-full max-h-screen">
      <div className="flex flex-col flex-grow">
        <SidebarTrigger className="block md:hidden" />
        <div className="flex flex-row justify-end items-center px-4 py-2">
          <ViewToggle viewMode={viewMode} setViewMode={setViewMode} />
        </div>

        {products.length === 0 ? (
          <div className="flex items-center justify-center px-4 text-center text-muted-foreground flex-grow">
            No hay productos disponibles.
          </div>
        ) : (
          <div
            className={`grid gap-3 pb-4 mx-2 ${
              viewMode === "list"
                ? "grid-cols-1"
                : "grid-cols-[repeat(auto-fill,_minmax(200px,_1fr))]"
            }`}
          >
            {products.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                viewMode={viewMode}
              />
            ))}
          </div>
        )}
      </div>

      {/* Contenedor inferior: paginación */}
      <div className="sticky bottom-40 flex justify-center items-center ">
        <PaginationControls pagination={pagination} setPage={setPage} />
        <PageSizeSelector
          value={pagination.pageSize}
          onChange={handlePageSizeChange}
        />
      </div>
    </div>
  );
};

export default ProductList;

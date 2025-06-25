import { Attribute } from "@/features/admin/validations/categorySchema";
import CategoryService from "@/features/categories/services/CategoryService";
import ProductList from "@/features/products/components/ProductList";
import ProductsSidebar from "@/features/products/components/ProductsSidebar";
import { SidebarProvider } from "@/shared/ui/sidebar";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router";
import { useProducts } from "@/features/products/hooks/useProducts";
import FullscreenLoader from "@/shared/ui/ScreenLoader";

const ProductsHome = () => {
  const [searchParams] = useSearchParams();
  const categoryId = searchParams.get("id");

  const [isLoading, setIsLoading] = useState<boolean>(true);

  const [productAttributes, setProductAttributes] = useState<Attribute>();
  const [filters, setFilters] = useState<Record<string, string | string[]>>({});

  const { products, pagination, loading, setPage, setPageSize } = useProducts({
    ...filters, // Pasa directamente los filtros
    categoryId: categoryId ? Number(categoryId) : undefined,
  });

  useEffect(() => {
    if (!categoryId) return;

    const fetchAttributes = async () => {
      setIsLoading(true);
      try {
        const attributes = await CategoryService.getCategoryAttributes(
          Number(categoryId)
        );
        setProductAttributes(attributes);
      } catch (error) {
        console.error("Error obteniendo atributos de la categoría:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchAttributes();
  }, [categoryId]);

  if (isLoading) {
    return <FullscreenLoader />;
  }

  return (
    <SidebarProvider>
      <ProductsSidebar
        attributes={productAttributes}
        filters={filters}
        onFilterChange={setFilters}
      />

      <ProductList
        products={products}
        pagination={pagination}
        loading={loading}
        setPage={setPage}
        setPageSize={setPageSize}
      />
    </SidebarProvider>
  );
};

export default ProductsHome;

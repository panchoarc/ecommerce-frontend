import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/shared/ui/dropdown-menu";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";

import CategoryService from "@/features/categories/services/CategoryService";

interface Category {
  id: string;
  name: string;
}

const CategoryNavBar = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await CategoryService.getMenuCategories();
        setCategories(response);
      } catch (error) {
        console.error("Error fetching categories:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCategories();
  }, []);

  if (isLoading || categories.length === 0) return null;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="text-gray-700 text-sm px-4 py-2 rounded hover:bg-gray-100">
        Categorías
      </DropdownMenuTrigger>

      <DropdownMenuContent
        className="bg-white rounded-md shadow-md p-4 w-[600px] max-w-[95vw] animate-fade-in"
        side="bottom"
        align="start"
      >
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
          {categories.map((category) => (
            <DropdownMenuItem
              key={category.id}
              className="cursor-pointer text-sm text-gray-700 hover:bg-gray-100 rounded px-2 py-1"
              onSelect={() => navigate(`/products?id=${category.id}`)}
            >
              {category.name}
            </DropdownMenuItem>
          ))}
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default CategoryNavBar;

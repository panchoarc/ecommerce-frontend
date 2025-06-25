import instance from "@/config/axios";
import { Attribute } from "@/features/admin/validations/categorySchema";

interface CreateCategory {
  name: string;
  description: string;
}

export interface UpdateCategory {
  name: string;
  description: string;
  isActive: boolean;
}

interface Category {
  id: number;
  name: string;
  description: string;
  isActive: boolean;
}

interface CategoryResponse {
  data: Category[];
  pagination: {
    currentPage: number;
    pageSize: number;
    totalCount: number;
    totalPages: number;
  };
}

export const getCategories = async (
  page: number,
  size: number
): Promise<CategoryResponse> => {
  try {
    // Usamos params en el objeto de configuración, no en el cuerpo de la solicitud
    const response = await instance.post(
      `/category/search?page=${page}&size=${size}`
    );
    const { data, pagination } = response.data;
    return { data, pagination };
  } catch (error) {
    return Promise.reject(error);
  }
};

export const getCategoryById = async (id: number): Promise<Category> => {
  try {
    const response = await instance.get(`/category/${id}`);
    return response.data.data;
  } catch (error) {
    return Promise.reject(error);
  }
};

export const createCategory = async (
  category: CreateCategory
): Promise<Category> => {
  try {
    const response = await instance.post("/category", category);
    return response.data.data;
  } catch (error) {
    return Promise.reject(error);
  }
};

export const deleteCategory = async (id: number): Promise<void> => {
  try {
    await instance.delete(`/category/${id}`);
  } catch (error) {
    return Promise.reject(error);
  }
};

export const updateCategory = async (
  id: number,
  category: UpdateCategory
): Promise<Category> => {
  const { name, description, isActive } = category;
  const updatedCategory = {
    name,
    description,
    is_active: isActive,
  };

  try {
    const response = await instance.put(`/category/${id}`, updatedCategory);
    return response.data;
  } catch (error) {
    return Promise.reject(error);
  }
};

export const addCategoryAttribute = async (
  categoryId: number,
  attribute: Attribute
): Promise<void> => {
  try {
    const response = await instance.post(
      `/category/${categoryId}/attributes`,
      attribute
    );
    return response.data.data;
  } catch (error) {
    return Promise.reject(error);
  }
};

export const getCategoryAttributes = async (
  categoryId: number
): Promise<Attribute> => {
  try {
    const response = await instance.get(`/category/${categoryId}/attributes`);
    return response.data.data;
  } catch (error) {
    return Promise.reject(error);
  }
};

export const updateCategoryAttributes = async (
  categoryId: number,
  attributes: Attribute
): Promise<void> => {
  try {
    const response = await instance.put(
      `/category/${categoryId}/attributes`,
      attributes
    );
    return response.data;
  } catch (error) {
    return Promise.reject(error);
  }
};

export const getMenuCategories = async () => {
  try {
    const response = await instance.get(`category`);
    return response.data.data;
  } catch (error) {
    return Promise.reject(error);
  }
};

const CategoryService = {
  getCategories,
  getCategoryById,
  createCategory,
  deleteCategory,
  updateCategory,
  addCategoryAttribute,
  getCategoryAttributes,
  updateCategoryAttributes,
  getMenuCategories,
};

export default CategoryService;

import instance from "@/config/axios";
import axios from "axios";

interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
}

interface ProductResponse {
  id: number;
  name: string;
  description: string;
  price: number;
  stock: number;
  category_id: number;
  is_active: boolean;
}

interface ImagesResponse {
  id: number;
  url: string;
  isMainImage: boolean;
}

interface ProductResponse {
  data: Product[];
  pagination: {
    currentPage: number;
    pageSize: number;
    totalCount: number;
    totalPages: number;
  };
}

type GetProductsParams = {
  filters?: any;
  page?: number;
  pageSize?: number;
};

const handleError = (error: unknown): Error => {
  if (axios.isAxiosError(error)) {
    const message =
      error.response?.data?.message ?? error.message ?? "Axios error";
    return new Error(message);
  }

  if (error instanceof Error) return error;

  return new Error(typeof error === "string" ? error : JSON.stringify(error));
};

export const getProducts = async ({
  filters = {},
  page = 0,
  pageSize = 10,
}: GetProductsParams): Promise<ProductResponse> => {
  try {
    console.log("Filters Service", filters);
    const response = await instance.post(
      `/products/search?page=${page}&size=${pageSize}`,
      filters
    );
    const { data, pagination } = response.data;
    return { data, pagination };
  } catch (error) {
    return Promise.reject(handleError(error));
  }
};

export const getProduct = async (id: number): Promise<ProductResponse> => {
  try {
    const response = await instance.get(`/products/${id}`);
    return response.data.data;
  } catch (error) {
    return Promise.reject(handleError(error));
  }
};

export const getProductImages = async (
  id: number
): Promise<ImagesResponse[]> => {
  try {
    const response = await instance.get(`/products/${id}/images`);
    return response.data.data;
  } catch (error) {
    return Promise.reject(handleError(error));
  }
};

export const uploadProductImages = async (
  id: number,
  images: { image: File; isMain: boolean }[]
): Promise<string[]> => {
  const formData = new FormData();

  images.forEach((imgObj, index) => {
    formData.append(`images[${index}].image`, imgObj.image);
    formData.append(`images[${index}].isMain`, String(imgObj.isMain));
  });

  try {
    const response = await instance.post(`/products/${id}/images`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  } catch (error) {
    return Promise.reject(handleError(error));
  }
};

export const createProduct = async (data: any): Promise<Product> => {
  try {
    const response = await instance.post("/products", data);
    return response.data.data;
  } catch (error) {
    return Promise.reject(handleError(error));
  }
};

export const addImagesToProduct = async (
  id: number,
  images: FormData
): Promise<Product> => {
  try {
    const response = await instance.post(`/products/${id}/images`, images, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  } catch (error) {
    return Promise.reject(handleError(error));
  }
};

export const deleteProduct = async (id: number): Promise<void> => {
  try {
    await instance.delete(`/products/${id}`);
  } catch (error) {
    return Promise.reject(handleError(error));
  }
};

export const updateProduct = async (
  id: number,
  data: any
): Promise<Product> => {
  try {
    const response = await instance.put(`/products/${id}`, data);
    return response.data;
  } catch (error) {
    return Promise.reject(handleError(error));
  }
};

export const addAttributesToProduct = async (
  id: number,
  data: any
): Promise<any> => {
  try {
    const response = await instance.post(`/products/${id}/attributes`, data);
    return response.data;
  } catch (error) {
    return Promise.reject(handleError(error));
  }
};

export const getProductAttributes = async (id: number): Promise<any> => {
  try {
    const response = await instance.get(`/products/${id}/attributes`);
    return response.data.data;
  } catch (error) {
    return Promise.reject(handleError(error));
  }
};

export const getProductReviews = async (id: number) => {
  try {
    const response = await instance.get(`/products/${id}/reviews`);
    return response.data.data;
  } catch (error) {
    return Promise.reject(handleError(error));
  }
};

const ProductService = {
  getProducts,
  getProduct,
  getProductImages,
  createProduct,
  deleteProduct,
  uploadProductImages,
  updateProduct,
  addImagesToProduct,
  addAttributesToProduct,
  getProductAttributes,
  getProductReviews
};

export default ProductService;

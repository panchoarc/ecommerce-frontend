import instance from "@/config/axios";

const getMyAddresses = async (page = 0, size = 10) => {
  try {
    const response = await instance.get(
      `/address/search?page=${page}&size=${size}`
    );
    const { data, pagination } = response.data;
    return { data, pagination };
  } catch (error) {
    console.error(error);
    return { data: [], pagination: { totalPages: 0 } };
  }
};

const validateAddress = async (fullAddress: string): Promise<string | null> => {
  const url = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(
    fullAddress
  )}`;
  try {
    const response = await fetch(url, {
      headers: {
        "Accept-Language": "es", // Opcional: para recibir resultados en español
      },
    });
    const data = await response.json();

    if (data && data.length > 0) {
      // Dirección válida
      return data[0].display_name;
    }

    return null; // Dirección no encontrada
  } catch (error) {
    console.error("Error validando dirección:", error);
    return null;
  }
};

export const createNewAddress = async (data) => {
  try {
    const response = await instance.post(`/address`, data);
    return response.data.data;
  } catch (error) {
    console.error("Error: ", error);
  }
};

export const deleteAddress = async (id: number) => {
  try {
    const response = await instance.delete(`/address/${id}`);
    return response.data.data;
  } catch (error) {
    console.error("Error: ", error);
  }
};

export const getOneAddress = async (id: number) => {
  try {
    const response = await instance.get(`/address/${id}`);
    return response.data.data;
  } catch (error) {
    console.error("Error: ", error);
  }
};

export const updateAddress = async (id: number, data: any) => {
  try {
    const response = await instance.put(`/address/${id}`, data);
    return response.data.data;
  } catch (error) {
    console.error("Error: ", error);
  }
};

const AddressService = {
  getMyAddresses,
  validateAddress,
  createNewAddress,
  deleteAddress,
  getOneAddress,
  updateAddress,
};

export default AddressService;

import instance from "@/config/axios";

interface GetOrderParams {
  page?: number;
  pageSize?: number;
}

export const getMyOrders = async ({
  page = 0,
  pageSize = 10,
}: GetOrderParams) => {
  try {
    const response = await instance.get(
      `/orders?page=${page}&size=${pageSize}`
    );
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const getMyOrder = async (id: string) => {
  try {
    const response = await instance.get(`/orders/${id}`);
    return response.data.data;
  } catch (error) {
    console.error(error);
  }
};

export const buyOrder = async (data) => {
  try {
    const response = await instance.post(`/orders`, data);
    return response.data.data;
  } catch (error) {
    console.error(error);
  }
};

export const getOrderVoucher = async (id: string) => {
  try {
    const response = await instance.get(`/orders/${id}/vouchers`, {
      responseType: "blob",
    });
    return response.data;
  } catch (error) {
    console.error(error);
  }
};
const OrderService = {
  buyOrder,
  getOrderVoucher,
  getMyOrders,
  getMyOrder,
};

export default OrderService;
